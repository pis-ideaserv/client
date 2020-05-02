import React from 'react';
import {request} from './StaticMethods';
import Token from "../Token";
import Url from '../ServerUrl';
import {useDispatch} from 'react-redux';
import {error} from 'Redux/Actions';
import withRouterInnerRef from '../WithRouterInnerRef';


interface Supplier{
    id              : any,
    supplier_code   : string,
    supplier_name   : string,
    address         : string,
    tin             : string,
    contact_person  : string,
    contact_number  : string,
    email           : string
}


interface showSupplier{
    page : number,
    per_page : number,
    search  ?: string
}


const Suppliers = (props:any):any =>{
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

        show : async(user?:showSupplier) => {
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
                url     : Url.suppliers,
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
                url     : Url.suppliers+id,
                method  : 'GET',
            })
            return processData(format);
        },


        update : async (supplier:Supplier) => {
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
                url     : Url.suppliers+supplier.id,
                method  : 'PATCH',
                params    : supplier
            })
            return processData(format);
        },

        add : async (supplier:Supplier) => {
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
                url     : Url.suppliers,
                method  : 'POST',
                params    : supplier
            })
            return processData(format);
        },

        search : async(search:string) =>{
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
                url     : Url.suppliers+'?search='+search,
                method  : 'GET',
            })
            return processData(format);
        },


        filter : async (filter:any) => {
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
                url     : Url.suppliers+'?filter=true&'+params,
                method  : 'GET',
            })
            return processData(format);
        }


    }));

    return null
}

export default withRouterInnerRef(Suppliers);