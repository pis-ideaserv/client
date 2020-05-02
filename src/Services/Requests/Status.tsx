import React from 'react';
import {request,Format} from './StaticMethods';
import Token from "../Token";
import Url from '../ServerUrl';
import {useDispatch} from 'react-redux';
import {error} from 'Redux/Actions';
import withRouterInnerRef from '../WithRouterInnerRef';


const Status = (props:any):any => {
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

        show : async() => {
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
                url     : Url.status,
                method  : 'GET',
            })
            return processData(format);
        }

    }));

    return null;
}

export default withRouterInnerRef(Status);


