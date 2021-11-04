import { useState } from 'react'
import {useSelector} from 'react-redux'



const TileLogic = (title) => {
   
    const breachEmailData = useSelector(state=>state.breachEmail.data)
    const msSecureData = useSelector(state=>state.msSecure.data);
    const globalAdminData = useSelector(state=>state.globalAdmin.data)
    const mfaData = useSelector(state=>state.mfa.data)
    const dormantData = useSelector(state=>state.dormant.data)
   
    let renderData = {};
    
    const [title1,title2] = title.split(',');
    const [toggleChildTile, setToggleChildTile] = useState(false)
    const handleClose = () => setToggleChildTile(false);
    const handleOpen =()=>setToggleChildTile(true)
     switch(title2) {
        case 'Email Account': {
           
            renderData =breachEmailData;
         
           break;
        }
        case 'Secure Score': {
           renderData = msSecureData;
           break;
        }
        case 'Phone Numbers':{
            renderData = breachEmailData;
            break
        }
        case'Administrator Accounts':{
            renderData = globalAdminData;
            break
        }case'Accounts Using MFA':{
            renderData = mfaData;
            break
        }
        default: {
            renderData = dormantData;
           break;
        }

    }
    return {renderData,handleClose,handleOpen,title1,title2,toggleChildTile}
}

export default TileLogic;
