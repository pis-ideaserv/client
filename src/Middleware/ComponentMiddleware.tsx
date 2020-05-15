import React, { useEffect } from 'react';
import {Token, Requests} from 'Services';
import { Redirect } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux'; // for connecting redux;
import {loggedIn } from 'Redux/Actions';
import Sync from 'Components/Sync';

const ComponentMiddleware =(props:any) =>{


    const userRequest:any = React.useRef();
    const [ finish, setFinish ] = React.useState(false);
    const user = useSelector((state:any) => state.UserAccount.data);
    const log = useSelector((state:any) => state.status);
    const dispatch = useDispatch();

    useEffect(()=>{
        check();
    },[user]);



    const check = () => {
        if(!log.loggedIn && Token.exist()){
            dispatch(loggedIn(true));
        }
    }


    if(!log.caller && Token.exist()){
        return <Sync />;
    }

    if(Token.exist()){
        return <props.component {...props}  />;
    }
    
    return <Redirect to={{pathname:'/login', state: { from : props.location.pathname}}} />;
}



export default ComponentMiddleware;