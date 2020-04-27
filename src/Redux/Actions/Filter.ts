import { Suppliers as sp, Products as pr, Users as us, MasterCodes as ma, status } from './Types';
// import { Requests } from '../../Services';
import {request} from 'Services/Requests/StaticMethods';
import { Token } from 'Services';
import Url from 'Services/ServerUrl';

type component = "supplier" | "product" | "user" | "master";

interface params {
    page        : number,
    per_page    : number
}

export const Filter = (filter:any,component:component,extra_params:params) => {

    let params = '';
    Object.keys(filter).forEach( (a:any) => {
        if(filter[a].key){
            if(params === ''){
                params = a+"[filter]="+filter[a].filter+"&"+a+"[key]="+filter[a].key;
            }else{
                params = params+"&"+a+"[filter]="+filter[a].filter+"&"+a+"[key]="+filter[a].key;
            }
        }
    });

    params = params+"&page="+extra_params.page+"&per_page="+extra_params.per_page;

    switch(component){
        case "supplier" :
            return async (dispatch:any) => {

                dispatch({
                    type    : sp.data,
                    payload : '',
                });

                const token = Token.get();
                if(token === '' || token === null){
                    dispatch({
                        type    : status.loggedIn,
                        payload : false,
                    })
                    return;
                }

                const a = await request({
                    url     : Url.suppliers+'?filter='+JSON.stringify(filter),
                    method  : 'GET',
                })


                if (a.status === 200) {
                    dispatch({
                        type    : sp.data,
                        payload : a,
                    });
                    return;
                }

                if(a.network_error){
                    dispatch({
                        type    : status.error,
                        payload : true,
                    });

                    return
                }
    

                
            }
        case "product" :
            return async (dispatch:any) => {

                dispatch({
                    type    : pr.data,
                    payload : '',
                });
    

                const token = Token.get();
                if(token === '' || token === null){
                    dispatch({
                        type    : status.loggedIn,
                        payload : false,
                    })
                    return;
                }

                const a = await request({
                    url     : Url.products+'?filter='+JSON.stringify(filter),
                    method  : 'GET',
                })

                
                if (a.status === 200) {
                    dispatch({
                        type    : pr.data,
                        payload : a,
                    });
                    return;
                }

                if(a.network_error){
                    dispatch({
                        type    : status.error,
                        payload : true,
                    });

                    return
                }
            }
        case "user" :
            return async (dispatch:any) => {

                dispatch({
                    type    : us.data,
                    payload : '',
                });
    

                const token = Token.get();
                if(token === '' || token === null){
                    dispatch({
                        type    : status.loggedIn,
                        payload : false,
                    })
                    return;
                }

                const a = await request({
                    url     : Url.user+'?filter=true&'+params,
                    method  : 'GET',
                })


                if (a.status === 200) {
                    dispatch({
                        type    : us.data,
                        payload : a,
                    });
                    return;
                }

                if(a.network_error){
                    dispatch({
                        type    : status.error,
                        payload : true,
                    });

                    return
                }
            }
        case "master" :
            return async (dispatch:any) => {

                dispatch({
                    type    : ma,
                    payload : '',
                });
    

                const token = Token.get();
                if(token === '' || token === null){
                    dispatch({
                        type    : status.loggedIn,
                        payload : false,
                    })
                    return;
                }

                const a = await request({
                    url     : Url.productMasterList+'?filter=true&'+params,
                    method  : 'GET',
                })


                if (a.status === 200) {
                    dispatch({
                        type    : ma,
                        payload : a,
                    });
                    return;
                }

                if(a.network_error){
                    dispatch({
                        type    : status.error,
                        payload : true,
                    });

                    return
                }
            }
    }

        
}
