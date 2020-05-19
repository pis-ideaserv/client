import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
// import {Products,Suppliers,Users,MasterCodes,Activities,Notifications,UserAccount,ProductsGraph,Logs} from 'Redux/Actions';
import Token from './Token';
import { request } from 'Services/Requests/StaticMethods';
import { 
    UserAccount as UAType,
    Products    as PType,
    Suppliers   as SType,
    Users       as UType,
    MasterCodes as MCType,
    Logs        as LType,
    Notifications as NType,
    status 
} from 'Redux/Actions/Types';
import Url from './ServerUrl';


const Caller = ():any => {

    const dispatch = useDispatch();
    const state = useSelector((state:any)=>state);
    const [ids,setIds] = React.useState(null);

    let list:any = {
        me      : {type:UAType,params:{url: Url.me,method  : 'GET'}},
        graph   : {type:status.graph,params:{url: Url.status,method  : 'GET',}},
        products: {type:PType.data,params:{url:Url.products,method:"GET",params:state.Products.params}},
        suppliers:{type:SType.data,params:{url: Url.suppliers,method  : 'GET',params    : state.Suppliers.params,}},
        users   : {type:UType.data,params:{url:Url.user,method:"GET",params:state.Users.params}},
        masterCodes : {type:MCType.data,params:{url:Url.productMasterList,method:"GET",params:state.MasterCodes.params}},
        logs    : {type:LType.data,params:{url:Url.logs,method:"GET",params:state.Logs.params}},
        notification : {type:NType.data,params:{url:Url.notification,method:"GET",params:state.Notifications.params}},
    }

    

    React.useEffect(()=>{
        caller();
        // console.log(ids,state.status.loggedIn,Token.exist());
    },[state.status.loggedIn]);


    const caller = async() => {
        if(state.status.loggedIn && Token.exist()){
            if(ids === null){
                let a = await actionCaller();
                if(a){
                    dispatch({type:status.caller,payload:true})
                    let b = setInterval(actionCaller,300000);
                    setIds(b);
                }
            }
        }else{
            clearInterval(ids);
            setIds(null);
        }
    }

    const actionCaller = async() =>{
        for(var i = 0;i < Object.keys(list).length;i++){
            const token = Token.get();
            if(token === '' || token === null){
                dispatch({type    : status.loggedIn,payload : false,});
                return false;
            }
            let name =  Object.keys(list)[i];

            let a = await request(list[name].params);
            if (a.status === 200){
                if(name==="me"){
                    dispatch({type:list[name].type,payload:a.data})
                    if(a.data.level === 3){
                        delete list['users'];
                        delete list['notification'];
                    }
                    if(a.data.level === 2){
                        delete list['users'];
                    }
                }else{
                    dispatch({type:list[name].type,payload:a})
                }
            }
            if(a.status === 401){
                dispatch({type    : status.loggedIn,payload : false,});
                clearInterval(ids);
                return false;
            }else{
                dispatch({type    : status.error,payload : true,});
            }
        }
        return true;
    }

    return null;
}

export default Caller;