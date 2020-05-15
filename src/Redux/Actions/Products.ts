import { Products as pr,status } from './Types';
import {Token } from '../../Services';
import { request } from 'Services/Requests/StaticMethods';
import Url from 'Services/ServerUrl';

interface params{
    page        :  number,
    per_page    :  number,
}
export const Products = () => {
        return async (dispatch:any,getState:any) => {

            let tempProduct = getState().Products.data;
            let params = getState().Products.params;

            dispatch({type    : pr.data,payload : '',});
            dispatch({type    : pr.status,payload : "pending",});


            const token = Token.get();
            if(token === '' || token === null){
                dispatch({type    : status.loggedIn,payload : false})
                dispatch({type    : pr.status,payload : "done",});

                return;
            }

            const a = await request({
                url     : Url.products,
                method  : 'GET',
                params    : params
            })


            if (a.status === 200) {
                dispatch({type    : pr.data,payload : a,});
                dispatch({type    : pr.status,payload : "done",});
                return;
            }

            dispatch({type    : status.error,payload : true,});
            dispatch({type    : pr.status,payload : "pending",});
            dispatch({type    : pr.data,payload : tempProduct});
            return;
        }
}

export const ProductsTable = (data:{}) => {
    return async (dispatch:any) => {
        dispatch({type    : pr.table,payload : data});
    }
}

export const ProductsFilter = (filter:boolean) => {
    return async (dispatch:any) => {    
        dispatch({type:pr.filter,payload:filter});
    }
}

export const ProductsParams = (data:any) => {
    return async (dispatch:any) => {    
        dispatch({type:pr.params,payload:data});
    }
}

export const ProductsGraph = () => {
    return async (dispatch:any,getState:any) => {    
        let tempGraph = getState().Products.graph;


        const token = Token.get();
        if(token === '' || token === null){
            dispatch({type    : status.loggedIn,payload : false});
            return;
        }

        const a = await request({
            url     : Url.status,
            method  : 'GET',
        })

        if (a.status === 200) {
            dispatch({type    : pr.graph,payload : a,});
            return;
        }

        dispatch({type    : status.error,payload : true,});
        dispatch({type    : pr.graph,payload : tempGraph});
        return;
    }
}