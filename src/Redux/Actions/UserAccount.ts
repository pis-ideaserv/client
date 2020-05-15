import { UserAccount as UA,status } from './Types';
import { Token } from 'Services';
import { request } from 'Services/Requests/StaticMethods';
import Url from 'Services/ServerUrl';


export const UserAccount = () => {
    return async (dispatch:any,getState:any) => {

        let tempProduct = getState().UserAccount.data;

        const token = Token.get();
        if(token === '' || token === null){
            dispatch({type    : status.loggedIn,payload : false})
            return;
        }
        
        const a = await request({url     : Url.me,method  : 'GET',})
        if(a.status === 200){
            dispatch({type    : UA,payload : a.data});   
            return;
        }
     
        dispatch({type    : status.error,payload : true,});
        dispatch({type    : UA,payload : tempProduct});
        return;
    }
}
