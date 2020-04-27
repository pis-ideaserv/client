import React, { useEffect, Component } from 'react';
import {Token, Requests} from 'Services';
import { Redirect } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux'; // for connecting redux;
import { UserAccount as User,loggedIn } from 'Redux/Actions';
import jwt_decode from 'jwt-decode';
import Sync from 'Components/Sync';

const ComponentMiddleware =(props:any) =>{


    const userRequest:any = React.useRef();
    const [ finish, setFinish ] = React.useState(false);
    const [redirectToSync, setRedirectToSync] = React.useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state:any) => state.UserAccount.data);
    
    useEffect(()=>{
        check();
    },[]);

    const check = async () => {
        if( Object.keys(user).length === 0 && Token.exist()){
            setRedirectToSync(true);
        }
        setFinish(true);
    }

    if(!finish){
        return <Requests.User request={userRequest} />;
    }

    if(redirectToSync){
        return <Sync {...props}  />;
    }

    if(Token.exist()){
        return <props.component {...props}  />;
    }
    
    return <Redirect to={{pathname:'/login', state: { from : props.location.pathname}}} />;
}



export default ComponentMiddleware;