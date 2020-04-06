import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Products,Suppliers,Users,MasterCodes,Activities,Notifications} from 'Redux/Actions';

const Caller = ():any => {

    let id:any = {
        products    : 0,
        suppliers   : 0,
        users       : 0,
        masterCodes : 0,
        reports     : 0,
        notification: 0,
    };


    

    const dispatch = useDispatch();
    const status = useSelector((state:any)=>state.status.loggedIn);
    const [ids,setIds] = React.useState(id);

    React.useEffect(()=>{
        if(status){
            
            if(ids.products === 0){
                dispatch(Products());
                let a:any = setInterval(()=>dispatch(Products()),300000);
                setIds({...ids,products : a,})
            }
            if(ids.suppliers === 0){
                dispatch(Suppliers());
                let a:any = setInterval(()=>dispatch(Suppliers()),300000);
                setIds({...ids,suppliers : a,})
            }
            if(ids.users === 0){
                dispatch(Users());
                let a:any = setInterval(()=>dispatch(Users()),300000);
                setIds({...ids,users : a,});
            }
            if(ids.masterCodes === 0){
                dispatch(MasterCodes());
                let a:any = setInterval(()=>dispatch(MasterCodes()),300000);
                setIds({...ids,masterCodes : a,})
            }
            if(ids.reports === 0){
                dispatch(Activities());
                let a:any = setInterval(()=>dispatch(Activities()),300000);
                setIds({...ids,reports : a,});
            }
            if(ids.notification === 0){
                dispatch(Notifications());
                let a:any = setInterval(()=>dispatch(Notifications()),300000);
                setIds({...ids,notification : a,});
            }
        }else{
            Object.keys(ids).forEach((value:any)=>{
                clearInterval(ids[value]);
            })
        }

    },[status]);

    return null;
}

export default Caller;