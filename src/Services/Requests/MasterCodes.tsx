import React from 'react';
import {request,Format} from './StaticMethods';
import Token from "../Token";
import Url from '../ServerUrl';
import {useDispatch} from 'react-redux';
import {error} from 'Redux/Actions';
import withRouterInnerRef from '../WithRouterInnerRef';

interface showMasterCodes{
    page        ?: number,
    per_page    ?: number,
    search      ?: any,
    snapshot    ?: number,
}

const MasterCodes = (props:any):any => {

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
                url     : Url.productMasterList,
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
                url     : Url.productMasterList+id,
                method  : 'GET',
            })
            return processData(format);
        },

        update  : async(up:any)=>{
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
                url     : Url.productMasterList+up.id,
                method  : 'PATCH',
                params    : up
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
                url     : Url.productMasterList,
                method  : 'POST',
                params    : pml
            });
            return processData(format);
        },
        filter  : async(filter:any)=>{
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
                url     : Url.productMasterList+'?filter=true&'+params,
                method  : 'GET',
            })
        },
    }));    

    return null;
}

export default withRouterInnerRef(MasterCodes);