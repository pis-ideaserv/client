import { MasterCodes as MC,status } from './Types';
import { Token } from 'Services';
import { request } from 'Services/Requests/StaticMethods';
import Url from 'Services/ServerUrl';


export const MasterCodes = () => {
    return async (dispatch:any,getState:any) => {
        
        let tempMasterCode = getState().MasterCodes.data;
        let params = getState().MasterCodes.params;

        dispatch({type    : MC.data,payload : '',});
        dispatch({type    : MC.status,payload : 'pending',});
        
    
        const token = Token.get();
        if(token === '' || token === null){
            dispatch({type    : status.loggedIn,payload : false,});
            dispatch({type    : MC.status,payload : 'done',});
            return;
        }

        const a = await request({url     : Url.productMasterList,method  : 'GET',params    : params})

        if (a.status === 200) {
            dispatch({type    : MC.data,payload : a});
            dispatch({type    : MC.status,payload : 'done',});
            return;
        }

        if(a.network_error){
            dispatch({type    : status.error,payload : true,});
            dispatch({type    : MC.data,payload:tempMasterCode});
            dispatch({type    : MC.status,payload : 'done',});
            return
        }
    }
}

export const MasterCodeParams = (data:any) => {
    return async (dispatch:any) => {    
        dispatch({type:MC.params,payload:data});
    }
}