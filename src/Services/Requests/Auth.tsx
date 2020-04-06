import withRouterInnerRef from '../WithRouterInnerRef';
import axios from 'axios';
import Url from '../ServerUrl';
import React from 'react';
import {Format} from './StaticMethods';
import {useSnackbar} from 'notistack'
import { Button } from '@material-ui/core';
import { Close } from '@material-ui/icons';


interface credential{
    username : string,
    password : string,
}



const Auth = (props:any) => {
    
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const action = (key:any) => (
        <Button variant="text" color="inherit" onClick={ () => closeSnackbar(key)}>
            <Close />
        </Button>
    );


    React.useImperativeHandle(props.request,()=>({
        
        async login(credential:credential){
           
            let format:Format = {
                network_error : false,
                status : 0,
                data : '',
            }

            await axios({
                method  :   "POST",
                url     :   Url.login,
                headers :   {
                    'Content-Type' :    'application/json',
                    'Accept'       :    'application/json',
                },
                data    :   {
                    username : credential.username,
                    password : credential.password,
                }
            }).then( response => {
                format = {
                    network_error : false,
                    status        : response.status,
                    data          : response.data,
                }
            }).catch( async (error) =>{
                if(error.response){
                    format = {
                        network_error : false,
                        status        : error.response.status,
                        data          : error.response.data,
                    }
                }else{
                    format.network_error = true;
                }
            });

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
        }

    }));

    return "";
}

export default withRouterInnerRef(Auth);