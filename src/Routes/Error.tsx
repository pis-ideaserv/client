import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { Button } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import {error as errorAction} from 'Redux/Actions'
import {useSnackbar} from 'notistack';

const Error = (props:any):any => {

    const dispatch = useDispatch();
    const error = useSelector((state:any)=>state.status.error);
    // const loggedIn = useSelector((state:any)=>state.status.loggedIn);
    const {enqueueSnackbar,closeSnackbar} = useSnackbar();

    const action = (key:any) => (
        <Button variant="text" color="inherit" onClick={ () => closeSnackbar(key)}>
            <Close />
        </Button>
    );

    React.useEffect(()=>{

        if(error){
            enqueueSnackbar('Something went wrong, please try again later!!!',{
                variant:"error",
                anchorOrigin:{
                    vertical:'top', 
                    horizontal:'right'
                },
                action : action
            });
            
            dispatch(errorAction(false));
        }

    },[error]);

    return null;

}

export default Error;