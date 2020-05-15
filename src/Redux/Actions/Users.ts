import { Users as pr, status } from './Types';
import { Token } from '../../Services';
import { request } from 'Services/Requests/StaticMethods';
import Url from 'Services/ServerUrl';

export const Users = () => {
        return async (dispatch:any,getState:any) => {

            let tempData = getState().Users.data;
            let params   = getState().Users.params;


            dispatch({type    : pr.data,payload : '',});
            dispatch({type    : pr.status,payload : "pending",});


            const token = Token.get();
            if(token === '' || token === null){
                dispatch({type    : status.loggedIn,payload : false,})
                dispatch({type    : pr.status,payload : "done",})
                return;
            }

            const a = await request({url     : Url.user,method  : 'GET',params    : params})

            if (a.status === 200) {
                dispatch({type    : pr.data,payload : a,});
                dispatch({type    : pr.status,payload : "done",});
                return;
            }
            
            dispatch({type    : status.error,payload : true});
            dispatch({type    : pr.status,payload : "done",});
            dispatch({type    : pr.data,payload : tempData,});
            return;

        }
}

export const UsersFilter = (filter:boolean) => {
    return async (dispatch:any) => {    
        dispatch({type:pr.filter,payload:filter});
    }
}

export const UsersParams = (data:any) => {
    return async (dispatch:any) => {    
        dispatch({type:pr.params,payload:data});
    }
}