import withRouterInnerRef from '../WithRouterInnerRef';
import Url from '../ServerUrl';
import React from 'react';
import {Format,request} from './StaticMethods';
import {useSnackbar} from 'notistack'
import { Button } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import {error as errorAction} from 'Redux/Actions';
import {useDispatch} from 'react-redux';
import { Token } from 'Services';



interface credential{
    username : string,
    password : string,
}



const Auth = (props:any) => {
    
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const dispatch = useDispatch();


    const action = (key:any) => (
        <Button variant="text" color="inherit" onClick={ () => closeSnackbar(key)}>
            <Close />
        </Button>
    );

    const processData = (data:Format) =>{
        if(data.network_error){
            dispatch(errorAction(true));
            return;
        }else{
            return data;
        }
    }


    React.useImperativeHandle(props.request,()=>({
        
        async login(credential:credential){
           
            let format = {
                network_error : false,
                status : 0,
                data : '',
            }

            format = await request({
                url     : Url.login,
                method  : 'POST',
                headers  : {
                    'Content-Type'  :   'application/json',
                    'Accept'        :   'application/json'
                },
                params  : {
                    username : credential.username,
                    password : credential.password,
                },
            })

            if(format.status !== 200 && format.status !== 401 || format.network_error ){
                enqueueSnackbar(
                    <div 
                        dangerouslySetInnerHTML={{
                            __html: 'Something wrong with the server. Please try again later.<br />'
                    }} />
                    ,{
                    variant:"error",
                    autoHideDuration : 10000,
                    anchorOrigin:{
                        vertical:'top', 
                        horizontal:'right'
                    },
                    action:action
                });
            }

            return format;
        },

        async me(){
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
                url     : Url.me,
                method  : 'GET',
            })
            
            return processData(format);

        }

    }));

    return "";
}

export default withRouterInnerRef(Auth);