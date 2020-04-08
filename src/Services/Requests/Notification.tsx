import React from 'react';
import {request,Format} from './StaticMethods';
import Token from "../Token";
import Url from '../ServerUrl';
import {useDispatch} from 'react-redux';
import {error} from 'Redux/Actions';
import withRouterInnerRef from '../WithRouterInnerRef';

interface showMasterCodes{
    page : number,
    per_page ?: number,
}

const Notification = (props:any):any => {

    const dispatch = useDispatch();

    const processData = (data:Format) =>{
        if(data.network_error){
            dispatch(error(true));
            return;
        }else{
            return data;
        }
    }

    React.useImperativeHandle(props.request,()=>({
        
        show    : async(user:showMasterCodes)=>{
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
                url     : Url.notification,
                method  : 'GET',
                params    : user,
            })
            return processData(format);
        },

        get     : async(id:number)=>{
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
                url     : Url.notification+id,
                method  : 'GET',
            })
            return processData(format);
        },

        add     : async(pml:any)=>{
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
                url     : Url.notification,
                method  : 'POST',
                params    : pml
            });
            return processData(format);
        }
    }));

    return null;
}

export default withRouterInnerRef(Notification);