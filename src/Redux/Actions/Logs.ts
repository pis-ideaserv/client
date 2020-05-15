import { Logs as log,status } from './Types';
import {Token } from '../../Services';
import { request } from 'Services/Requests/StaticMethods';
import Url from 'Services/ServerUrl';



export const Logs = () => {
        return async (dispatch:any,getState:any) => {
            
            let tempSupplier = getState().Logs.data;
            let params = getState().Logs.params;

            dispatch({type  : log.data,payload : ''});
            dispatch({type    : log.status,payload : "pending",});

            const token = Token.get();
            if(token === '' || token === null){
                dispatch({type    : status.loggedIn,payload : false})
                dispatch({type    : log.status,payload : "done",});
                return;
            }

            const a = await request({url     : Url.logs,method  : 'GET',params    : params,})

            if (a.status === 200) {
                dispatch({type    : log.data,payload : a,});
                dispatch({type    : log.status,payload : "done",});
                return;
            }

            dispatch({type    : status.error,payload : true,});
            dispatch({type    : log.status,payload : "pending",});
            dispatch({type  : log.data,payload : tempSupplier});
            return
        }
}


export const LogsParams = (data:any) => {
    return async (dispatch:any) => {    
        dispatch({type:log.params,payload:data});
    }
}