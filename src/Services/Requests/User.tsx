import React from 'react';
import {request,Format} from './StaticMethods';
import Token from "../Token";
import Url from '../ServerUrl';
import {useDispatch} from 'react-redux';
import {error} from 'Redux/Actions';
import withRouterInnerRef from '../WithRouterInnerRef';



interface Show{
    page        ?: number,
    per_page    ?: number,
    snapshot    ?: number,
}

interface Users{
    id         : any,
    first_name : string,
    last_name  : string,
    username   : string,
    company    : string,
    email      : string,
    activated  : any,
    level      : any,
}


const User = (props:any):any => {
    const dispatch = useDispatch();

    const processData = (data:Format) => {
        if(data.network_error){
            dispatch(error(true));
            return;
        }else{
            return data;
        }
    }

    React.useImperativeHandle(props.request,()=>({

        show : async(user?:Show) => {
            const token = Token.get();
            let format:Format = {
                network_error : false,
                status        : 0,
                data          : '',
            }
            if(token === '' || token === null){
                props.history.push('/login');
                return;
            }
            format = await request({
                url     : Url.user+'?page='+user.page+'&per_page='+user.per_page,
                method  : 'GET',
            })
            return processData(format);
        },


        get : async(id:number) => {
            const token = Token.get();

            let format:Format = {
                network_error : false,
                status        : 0,
                data          : '',
            }
            if(token === '' || token === null){
                props.history.push('/login');
                return;
            }
            format = await request({
                url     : Url.user+id,
                method  : 'GET',
            })
            return processData(format);
        },


        update : async (user:Users) => {
            const token = Token.get();
            let format:Format = {
                network_error : false,
                status        : 0,
                data          : '',
            }
            if(token === '' || token === null){
                props.history.push('/login');
                return;
            }
            format = await request({
                url     : Url.user+user.id,
                method  : 'PATCH',
                params    : user
            })
            return processData(format);
        },

        add : async (user:Users) => {
            const token = Token.get();
            let format:Format = {
                network_error : false,
                status        : 0,
                data          : '',
            }
            if(token === '' || token === null){
                props.history.push('/login');
                return;
            }
            format = await request({
                url     : Url.user,
                method  : 'POST',
                params    : user
            })
            return processData(format);
        },

        search : async(search:string) =>{
            const token = Token.get();
            let format:Format = {
                network_error : false,
                status        : 0,
                data          : '',
            }
            if(token === '' || token === null){
                props.history.push('/login');
                return;
            }
            format = await request({
                url     : Url.user+'?search='+search,
                method  : 'GET',
            })
        },

        filter : async (filter:any) => {
            const token = Token.get();
            let params = new URLSearchParams(filter).toString();
            let format:Format = {
                network_error : false,
                status        : 0,
                data          : '',
            }
            if(token === '' || token === null){
                props.history.push('/login');
                return;
            }
            format = await request({
                url     : Url.user+'?filter=true&'+params,
                method  : 'GET',
            })
        }

    }));
    return null;
}

export default withRouterInnerRef(User);