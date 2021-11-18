import { useEffect, useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { useRef } from 'react';







const TileLogic = (title) => {
    const _isMounted = useRef(false);
    
    const breachEmailData = useSelector(state=>state.breachEmail.data)
    const breachPhoneData = useSelector(state=>state.breachPhone.data);
    const msSecureData = useSelector(state=>state.msSecure.data);
    const globalAdminData = useSelector(state=>state.globalAdmin.data)
    const mfaData = useSelector(state=>state.mfa.data)
    const dormantData = useSelector(state=>state.dormant.data)
    //const toggleChildTile = useSelector(state=>state.modalTile)
    const [toggleChildTile, setToggleChildTile] = useState(false)
    const [renderData, setRenderData] = useState({});
    
    const [title1,title2] = title.split(',');
   
    const handleClose = () => {
       //dispatch(closeModal())
      setToggleChildTile(false)
    }
    const handleOpen =()=>{
        
     //dispatch(openModal());
     
      setToggleChildTile(true)
       
    
    }

    

useEffect(()=>{
    _isMounted.current = true
    return (
        _isMounted.current = false
    )
},[])
    
useEffect(() => {
    if (_isMounted) {
      
        
        switch(title2) {
                case 'Email Account': {
                
                    setRenderData(breachEmailData);
                
                break;
                }
                case 'Secure Score': {
                    setRenderData(msSecureData);
                break;
                }
                case 'Phone Numbers':{
                    setRenderData(breachPhoneData);
                    break
                }
                case'Administrator Accounts':{
                    setRenderData(globalAdminData);
                    break
                }case'Accounts Using MFA':{
                    setRenderData(mfaData);
                    break
                }
                default: {
                    setRenderData(dormantData);
                break;
                }


        }
    
    } 
    
}, [toggleChildTile])

return {renderData,handleClose,handleOpen,title1,title2,toggleChildTile}
    
   
}

export default TileLogic;
