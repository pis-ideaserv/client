import React from 'react';
import withRouterInnerRef from '../WithRouterInnerRef';
import Token from "../Token";
import Url from '../ServerUrl';
import {request,Format} from './StaticMethods';
import {error as errorAction} from 'Redux/Actions';
import {useDispatch} from 'react-redux';


interface show{page : number,per_page : number,search?:string};
interface add{name : string}


const Category = (props:any):any => {
    
    const dispatch = useDispatch();

    const processData = (data:Format) =>{
        if(data.network_error){
            dispatch(errorAction(true));
            return;
        }else{
            return data;
        }
    }

    React.useImperativeHandle(props.request,()=>({
        show : async(user:show) => {
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
                url     : Url.category,
                method  : 'GET',
                params    : user,
            })
            return processData(format);
        },

        get : async(user:number) => {
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
                url     : Url.category+user,
                method  : 'GET',
            })
            return processData(format);
        },

        add : async(pml:add) => {
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
                url     : Url.category,
                method  : 'POST',
                params    : pml,
            })
            return processData(format);
        },
    }));

    return null;

}


export default withRouterInnerRef(Category);