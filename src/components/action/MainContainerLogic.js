/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { timePast } from "../../utility/reusableFunctions";
import { useDispatch } from "react-redux";
import { setBreachEmailData } from "../../features/breachedemail";
import { setMFA } from "../../features/mfa";
import { setMSSecureScore } from "../../features/mssecurescore";
import { setGlobalAdminAcct } from "../../features/globaladminacct";
import { setDormant } from "../../features/dormant";
import { setBreachPhoneData } from "../../features/breachedphone";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
import { _backend } from "../../utility/api";

//API request functions
import { __checkBreach, getUsers, getSecurityAPI, getDormantAcct, getMemberPhoto, blobToBase64, imgPlaceHolder, getUserAvatar } from "../../graph";
//End of API request functions

const MainContainerLogic = (isAuthenticated, tenant, profile) => {
  const { instance, accounts } = useMsal();
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [numOfGlbalAccts, setNumOfGlbalAccts] = useState(0);
  const [percentMFA, setPercentMFA] = useState(0);
  const [numOfDormantAccount, setNumOfDormantAccount] = useState(0);
  const [mailBreaches, setMailBreaches] = useState([]);
  const [phoneBreaches, setPhoneBreaches] = useState([]);
  const [inProgress, setInProgress] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (isMounted.current && isAuthenticated && profile) __getAllUsers();
  }, [profile]);

  useEffect(() => {
    if (isMounted.current && users.length > 0 && tenant) {
      if (!tenant?.keyValid) return;
      const lastChecked = tenant?.last_check;
      const timePastLastCheck = lastChecked ? timePast(lastChecked) : 1440;
      console.log("Time Past: ", timePastLastCheck);
      setTimeout(() => {
        __checkBreaches(timePastLastCheck);
      }, 300);
    }
  }, [users, tenant]);

  useEffect(() => {
    if (isMounted.current && isAuthenticated && profile) {
      if (!tenant?.keyValid) return;
      console.log("Getting MS Secure Score");
      getSecurityAPI().then(async (res) => {
        //const {count : numGlobalAcct} = await res[0];
        const controlScores = res.controlScores;

        const { count: numGlobalAcct, controlName: controlNameGlobalAcct, description: descriptionGlobalAcct } = await controlScores.filter((data) => data.controlCategory === "Identity" && data.controlName === "OneAdmin")[0];

        const {
          scoreInPercentage: percentAcctMFA,
          controlName: controlNameMFA,
          description: descriptionMFA,
          count: countMFA,
          total: totalMFA,
        } = await controlScores.filter((data) => data.controlCategory === "Identity" && data.controlName === "MFARegistrationV2")[0];

        let dataMFA = {
          value: `${Math.trunc(percentAcctMFA)}%`,
          securityControl: controlNameMFA,
          description: descriptionMFA,
          status: `You have ${countMFA} out of ${totalMFA} users registered and protected with MFA`,
        };
        let dataMSSecureScore = {
          value: `${Math.trunc(res.MSSecureScore)}%`,
          securityControl: res.controlScores,
        };
        let dataGlobalAdminAcct = {
          value: numGlobalAcct,
          securityControl: controlNameGlobalAcct,
          description: descriptionGlobalAcct,
          status: `You currently have ${numGlobalAcct} golbal admins`,
        };

        dispatch(setMFA(dataMFA));
        dispatch(setMSSecureScore(dataMSSecureScore));
        dispatch(setGlobalAdminAcct(dataGlobalAdminAcct));

        setNumOfGlbalAccts(numGlobalAcct);
        setCurrentScore(Math.trunc(res.MSSecureScore));
        setPercentMFA(Math.trunc(percentAcctMFA));
      });

      getDormantAcct().then(async (res) => {
        //let newData = res.map(eachData=>{eachData.displayName,eachData.noOfDaysFromLastSignIn,eachData.signInActivity.lastSignInDateTime})
        const newData = await res.map((data) => {
          let daysLastSignIn = data.noOfDaysFromLastSignIn;
          let mail = data.mail;
          let lastSignIn = data.signInActivity.lastSignInDateTime;

          return { mail, lastSignIn, daysLastSignIn };
        });
        let dataDormant = {
          value: res.length,
          details: newData,
        };
        dispatch(setDormant(dataDormant));
        setNumOfDormantAccount(res.length);
      });
    }
  }, [profile, dispatch, isAuthenticated, tenant]);

  const __getAllUsers = async () => {
    console.log("getting users...");
    const request = {
      ...loginRequest,
      account: accounts[0],
    };

    instance
      .acquireTokenSilent(request)
      .then((response) => {
        getUsers(response.accessToken).then(({ data }) => {
          setUsers(data.value);
        });
      })
      .catch((e) => {
        instance.acquireTokenPopup(request).then((response) => {
          getUsers(response.accessToken).then(({ data }) => {
            setUsers(data.value);
          });
        });
      });
  };

  //
  const memberPhoto = async (user) => {
    const photo = await getMemberPhoto(user.id);
    if (photo && !photo?.error) {
      const avatarData = await blobToBase64(photo);
      return avatarData;
    } else {
      const name = user.displayName ? user.displayName : user.userPrincipalName;
      const avatar = await getUserAvatar(name);
      if (avatar?.error) {
        return imgPlaceHolder;
      } else {
        const avatarData = await blobToBase64(avatar);
        return avatarData;
      }
    }
  };

  const wait = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms));

  const __checkBreaches = async (timePastLastCheck) => {
    setInProgress(true);
    let resultMail = [];
    let resultPhone = [];
    if (timePastLastCheck >= 1440) {
      for (const user of users) {
        let phone = user.mobilePhone && user.mobilePhone.split(" ").join("");
        if (await user.mail) {
          const result = await __checkBreach(user.mail);
          console.log(user.mail, result ? true : false);
          const photo = result && (await memberPhoto(user));
          resultMail = [
            ...resultMail,
            {
              name: user.displayName,
              email: user.mail,
              phone: phone,
              breached: result ? true : false,
              data: result,
              photo: await photo,
            },
          ];
          await wait(1500); //For revert back
        }

        if (user.mobilePhone) {
          const result2 = await __checkBreach(user.mobilePhone.split(" ").join(""));
          console.log(user.displayName, user.mobilePhone.split(" ").join(""), result2 ? true : false);
          const photo = result2 && (await memberPhoto(user));
          resultPhone = [
            ...resultPhone,
            {
              name: user.displayName,
              phone: user.mobilePhone.split(" ").join(""),
              breached: result2 ? true : false,
              data: result2,
              photo: await photo,
            },
          ];
          await wait(1500); //For revert back
        }
      }
      //locally Store Breach Check results
      const tenantData = {};
      tenantData.data_emails = JSON.stringify(resultMail);
      tenantData.data_phones = JSON.stringify(resultPhone);
      tenantData.last_check = new Date();
      await _backend.update("Tenant", profile.tenantid, tenantData);
    } else {
      const existingTenant = await _backend.get("Tenant", profile.tenantid);
      if (!existingTenant || existingTenant?.error) {
        console.log("Error getting backend data for Tenant");
      } else {
        resultMail = existingTenant.data_emails ? JSON.parse(existingTenant.data_emails) : [];
        resultPhone = existingTenant.data_phones ? JSON.parse(existingTenant.data_phones) : [];
      }
    }

    //Export these breach email/phone data
    const breachedResult = resultMail.filter((eachMail) => eachMail.breached);
    const breachedResultPhone = resultPhone.filter((eachPhone) => eachPhone.breached);
    //End export

    //Count brechc email/phone
    setMailBreaches(breachedResult.length);
    setPhoneBreaches(breachedResultPhone.length);
    ///end

    let data = {
      value: breachedResult.length,
      emails: [breachedResult],
    };
    let dataPhone = {
      value: breachedResultPhone.length,
      phones: [breachedResultPhone],
    };
    dispatch(setBreachPhoneData(dataPhone));
    dispatch(setBreachEmailData(data));
    setInProgress(false);
  };

  return {
    profile,
    currentScore,
    numOfGlbalAccts,
    percentMFA,
    mailBreaches,
    numOfDormantAccount,
    phoneBreaches,
    inProgress,
  };
};
export default MainContainerLogic;
