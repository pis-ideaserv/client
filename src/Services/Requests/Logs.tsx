import React from 'react';
import {request,Format} from './StaticMethods';
import Token from "../Token";
import Url from '../ServerUrl';
import {useDispatch} from 'react-redux';
import {error} from 'Redux/Actions';
import withRouterInnerRef from '../WithRouterInnerRef';

interface show{
    page        ?: number,
    per_page    ?: number,
    snapshot    ?: number,
}

const Logs = (props:any):any => {

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
        show: async(logs:show) => {
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
                url     : Url.logs,
                method  : 'GET',
                params  : logs,
            })
            return processData(format);
        },
    }));

    return null;


}


export default withRouterInnerRef(Logs);