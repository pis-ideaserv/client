import React from 'react';
import {request,Format} from './StaticMethods';
import Token from "../Token";
import Url from '../ServerUrl';
import {useDispatch} from 'react-redux';
import {error} from 'Redux/Actions';
import withRouterInnerRef from '../WithRouterInnerRef';

interface Product{
    id                          : any,
    supplier                    : any,
    product                     : string,
    // product_description         : string,
    delivery_date               : string,
    reference_delivery_document : string,
    serial_number               : string,
    warranty                    : any,
    warranty_start              : string,
    created_by                  ?: any,
    updated_by                  ?: any,
    created_at                  ?: any,
    updated_at                  ?: any
}

interface Products extends Product{
    created_by                  ?: never,
    updated_by                  ?: never,
    created_at                  ?: never,
    updated_at                  ?: never
}

interface showProduct{
    page : number,
    per_page : number,
    search ?: string,
}


const Products = (props:any):any => {

    const dispatch = useDispatch();

    const processData = (data:any) =>{
        if(data.network_error){
            dispatch(error(true));
            return;
        }else{
            return data;
        }
    }

    React.useImperativeHandle(props.request,()=>({

        show    : async(user?:showProduct)=>{
            const token = Token.get();
            let format = {
                network_error : false,
                status        : 0,
                data          : '',
            }
            if(token === '' || token === null){
                props.history.push('/login');
                return;
            }
            format = await request({
                url     : Url.products,
                method  : 'GET',
                params    : user,
            })
            return processData(format);
        },

        get     : async(id:number)=>{
            const token = Token.get();
            let format = {
                network_error : false,
                status        : 0,
                data          : '',
            }
            if(token === '' || token === null){
                props.history.push('/login');
                return;
            }
            format = await request({
                url     :  Url.user+id,
                method  : 'GET',
            })
            return processData(format);
        },

        update  : async(product:Products) =>{
            const token = Token.get();
            let format = {
                network_error : false,
                status        : 0,
                data          : '',
            }
            if(token === '' || token === null){
                props.history.push('/login');
                return;
            }
            format = await request({
                url     :  Url.products+product.id,
                method  : 'PATCH',
                params    : product
            })
            return processData(format);
        },

        add  : async(product:Products) =>{
            const token = Token.get();
            let format = {
                network_error : false,
                status        : 0,
                data          : '',
            }
            if(token === '' || token === null){
                props.history.push('/login');
                return;
            }
            format = await request({
                url     :  Url.products,
                method  : 'POST',
                params    : product
            })
            return processData(format);
        },

        search  : async(search:string) =>{
            const token = Token.get();
            let format = {
                network_error : false,
                status        : 0,
                data          : '',
            }
            if(token === '' || token === null){
                props.history.push('/login');
                return;
            }
            format = await request({
                url     :  Url.products+'?search='+search,
                method  : 'GET',
            })
            return processData(format);
        },


        filter  : async(filter:any)=>{
            const token = Token.get();
            let params = new URLSearchParams(filter).toString();

            let format = {
                network_error : false,
                status        : 0,
                data          : '',
            }
            if(token === '' || token === null){
                props.history.push('/login');
                return;
            }
            format = await request({
                url     : Url.products+'?filter=true&'+params,
                method  : 'GET',
            })
            return processData(format);
        },

    }));
    
    return null;
    
}

export default withRouterInnerRef(Products);