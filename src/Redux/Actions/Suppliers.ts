import { Suppliers as sp,status } from './Types';
import { Token } from '../../Services';
import { request } from 'Services/Requests/StaticMethods';
import Url from 'Services/ServerUrl';



export const Suppliers = () => {
        return async (dispatch:any,getState:any) => {
            
            let tempSupplier = getState().Suppliers.data;
            let params = getState().Suppliers.params;


            dispatch({type  : sp.data,payload : ''});
            dispatch({type  : sp.status,payload : 'pending'});


            const token = Token.get();
            if(token === '' || token === null){
                dispatch({type    : status.loggedIn,payload : false})
                dispatch({type  : sp.status,payload : 'done'});
                return;
            }

            const a = await request({url     : Url.suppliers,method  : 'GET',params    : params,})

            if (a.status === 200) {
                dispatch({type    : sp.data,payload : a,});
                dispatch({type  : sp.status,payload : 'done'});
                return;
            }

            dispatch({type    : status.error,payload : true,});
            dispatch({type  : sp.status,payload : 'done'});
            dispatch({type  : sp.data,payload : tempSupplier});
            return
        }
}

export const SuppliersTable = (data:{}) => {
    return async (dispatch:any) => {
        dispatch({type    : sp.table,payload : data});
    }
}

export const SuppliersFilter = (filter:boolean) => {
    return async (dispatch:any) => {    
        dispatch({type:sp.filter,payload:filter});
    }
}

export const SuppliersParams = (data:any) => {
    return async (dispatch:any) => {    
        dispatch({type:sp.params,payload:data});
    }
}