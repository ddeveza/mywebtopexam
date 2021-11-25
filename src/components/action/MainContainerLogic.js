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
import Swal from "sweetalert2";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";

//API request functions
import { __checkBreach, getUsers, getSecurityAPI, getDormantAcct, getUserProfile, getMemberPhoto, blobToBase64, imgPlaceHolder, getUserAvatar } from "../../graph";
//End of API request functions

const MainContainerLogic = (isAuthenticated) => {
  const { instance, accounts } = useMsal();
  const dispatch = useDispatch();
  const [profile, setProfile] = useState("");
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
    if (isMounted.current && isAuthenticated) {
      getUserProfile()
        .then((res) => setProfile(res.displayName))
        .catch((err) => console.log("Unable to get the User Profile"));
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isMounted.current && isAuthenticated) __getAllUsers();
  }, [profile]);

  useEffect(() => {
    if (isMounted.current && users.length > 0) {
      const lastChecked = localStorage.getItem("lastBreachCheck");
      const timePastLastCheck = lastChecked ? timePast(lastChecked) : 1440;
      console.log("Time Past: ", timePastLastCheck);
      setTimeout(() => {
        __checkBreaches(timePastLastCheck);
      }, 300);
    }
  }, [users]);

  useEffect(() => {
    if (isMounted.current && isAuthenticated) {
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
  }, [profile, dispatch, isAuthenticated]);

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
          resultPhone = [
            ...resultPhone,
            {
              name: user.displayName,
              phone: user.mobilePhone.split(" ").join(""),
              breached: result2 ? true : false,
              data: result2,
            },
          ];
          await wait(1500); //For revert back
        }
      }
    } else {
      resultMail = localStorage.getItem("resultMail") ? JSON.parse(localStorage.getItem("resultMail")) : [];
      resultPhone = localStorage.getItem("resultPhone") ? JSON.parse(localStorage.getItem("resultPhone")) : [];
    }
    setInProgress(false);

    //Export these breach email/phone data
    const breachedResult = resultMail.filter((eachMail) => eachMail.breached);
    const breachedResultPhone = resultPhone.filter((eachPhone) => eachPhone.breached);
    //End export

    //locally Store Breach Check results
    localStorage.setItem("lastBreachCheck", new Date());
    localStorage.setItem("resultMail", JSON.stringify(resultMail));
    localStorage.setItem("resultPhone", JSON.stringify(resultPhone));

    //Count brechc email/phone
    setMailBreaches(breachedResult.length);
    setPhoneBreaches(breachedResultPhone.length);
    ///end

    await Swal.fire("Welcome to BeCloudSafe!", "a product by mywebtop", "success");

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
