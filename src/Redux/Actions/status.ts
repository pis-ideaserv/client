import { status as stat } from './Types';
import {Token } from '../../Services';
import { request } from 'Services/Requests/StaticMethods';
import Url from 'Services/ServerUrl';

export const loggedIn = (a:boolean) => {
    return (dispatch:any) => {
        dispatch({
            type    : stat.loggedIn,
            payload : a
        });
    }
}

export const error = (a:boolean) => {
    return (dispatch:any) => {
        dispatch({
            type    : stat.loggedIn,
            payload : a
        });
    }
}

export const caller = (a:boolean) => {
    return (dispatch:any) => {
        dispatch({
            type    : stat.caller,
            payload : a
        });
    }
}


export const graph = () => {
    return async (dispatch:any,getState:any) => {
        let tempGraph = getState().status.graph;   
        const token = Token.get();
        
        if(token === '' || token === null){
            dispatch({type    : stat.loggedIn,payload : false});
            return;
        }

        const a = await request({
            url     : Url.status,
            method  : 'GET',
        })

        if (a.status === 200) {
            dispatch({type    : stat.graph,payload : a,});
            return;
        }

        dispatch({type    : stat.error,payload : true,});
        dispatch({type    : stat.graph,payload : tempGraph});
        return;
    }
}