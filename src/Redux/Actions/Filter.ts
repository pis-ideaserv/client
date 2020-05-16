import { 
    Suppliers as sp, 
    Products as pr, 
    Users as us,
    Logs,
    MasterCodes as ma, status } from './Types';
import {request} from 'Services/Requests/StaticMethods';
import { Token } from 'Services';
import Url from 'Services/ServerUrl';

type component = "supplier" | "product" | "user" | "master" | "logs";

interface params {
    page        : number,
    per_page    : number
}

export const Filter = (filter:any,component:component,extra_params:params) => {

    let params = '';
    if(filter){
        Object.keys(filter).forEach( (a:any) => {
            if(filter[a].key){
                if(params === ''){
                    params = a+"[filter]="+filter[a].filter+"&"+a+"[key]="+filter[a].key;
                }else{
                    params = params+"&"+a+"[filter]="+filter[a].filter+"&"+a+"[key]="+filter[a].key;
                }
            }
        });
    }
    
    switch(component){
        case "supplier" :
            return async (dispatch:any,getState:any) => {

                let tempData = getState().Suppliers.data;

                dispatch({type    : sp.data,payload : '',});

                const token = Token.get();
                if(token === '' || token === null){
                    dispatch({type    : status.loggedIn,payload : false,})
                    return;
                }

                const a = await request({
                    url     : Url.suppliers,
                    params : {
                        filter  : JSON.stringify(filter),
                        per_page: extra_params.per_page,
                        page    : extra_params.page
                    },
                    method  : 'GET',
                })


                if (a.status === 200) {
                    dispatch({type    : sp.data,payload : a,});
                    return;
                }

                dispatch({type    : status.error,payload : true,});
                dispatch({type    : sp.data,payload : tempData,});
                return;
            }
        case "product" :
            return async (dispatch:any,getState:any) => {

                let tempData = getState().Products.data;
                dispatch({type    : pr.data,payload : '',});
    

                const token = Token.get();
                if(token === '' || token === null){
                    dispatch({type    : status.loggedIn,payload : false,})
                    return;
                }

                const a = await request({
                    url     : Url.products,
                    params : {
                        filter  : JSON.stringify(filter),
                        per_page: extra_params.per_page,
                        page    : extra_params.page
                    },
                    method  : 'GET',
                })

                
                if (a.status === 200) {
                    dispatch({type    : pr.data,payload : a,});
                    return;
                }

                dispatch({type    : status.error,payload : true});
                dispatch({type    : pr.data,payload : tempData,});
                return;
            }
        case "user" :
            return async (dispatch:any,getState:any) => {

                let tempData = getState().Users.data;
                dispatch({type    : us.data,payload : ''});
    

                const token = Token.get();
                if(token === '' || token === null){
                    dispatch({
                        type    : status.loggedIn,
                        payload : false,
                    })
                    return;
                }

                const a = await request({
                    url     : Url.user,
                    params : {
                        filter  : JSON.stringify(filter),
                        per_page: extra_params.per_page,
                        page    : extra_params.page
                    },
                    method  : 'GET',
                })


                if (a.status === 200) {
                    dispatch({type    : us.data,payload : a});
                    return;
                }

                dispatch({type    : status.error,payload : true});
                dispatch({type    : us.data,payload : tempData});

                return;
            }
        case "master" :
            return async (dispatch:any,getState:any) => {

                let tempData = getState().MasterCodes.data;
                dispatch({type    : ma.data,payload : '',});
    

                const token = Token.get();
                if(token === '' || token === null){
                    dispatch({type    : status.loggedIn,payload : false})
                    return;
                }

                const a = await request({
                    url     : Url.productMasterList,
                    params : {
                        filter  : JSON.stringify(filter),
                        per_page: extra_params.per_page,
                        page    : extra_params.page
                    },
                    method  : 'GET',
                })


                if (a.status === 200) {
                    dispatch({type    : ma.data,payload : a,});
                    return;
                }

                dispatch({type    : status.error,payload : true});
                dispatch({type    : ma.data,payload : tempData});
                return;
            }
        case "logs" :
            return async (dispatch:any,getState:any) => {

                let tempData = getState().Logs.data;
                dispatch({type    : Logs.data,payload : '',});
    

                const token = Token.get();
                if(token === '' || token === null){
                    dispatch({type    : status.loggedIn,payload : false})
                    return;
                }

                const a = await request({
                    url     : Url.logs,
                    params : {
                        // filter  : JSON.stringify(filter),
                        per_page: extra_params.per_page,
                        page    : extra_params.page
                    },
                    method  : 'GET',
                })


                if (a.status === 200) {
                    dispatch({type    : Logs.data,payload : a,});
                    return;
                }

                dispatch({type    : status.error,payload : true});
                dispatch({type    : Logs.data,payload : tempData});
                return;
            }
    }   
}
