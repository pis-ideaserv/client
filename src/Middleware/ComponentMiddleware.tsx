import React, { useEffect } from 'react';
import {Token, Requests} from 'Services';
import { Redirect } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux'; // for connecting redux;
import { UserAccount as User,loggedIn } from 'Redux/Actions';
import jwt_decode from 'jwt-decode';

const ComponentMiddleware =(props:any) =>{


    const userRequest:any = React.useRef();
    const [ finish, setFinish ] = React.useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state:any) => state.UserAccount.data);
    
    useEffect(()=>{
        check();
    },[Token.exist()]);

    const check = async () => {
        if(Token.exist()){
            if(Object.keys(user).length === 0){
                const token:any = jwt_decode(Token.get());
                const useraccount = await userRequest.current.get(token.sub);

                if(useraccount.status === 200){
                    dispatch(User(useraccount.data.data));
                    dispatch(loggedIn(true));
                    // setInitialized(true);
                }else{
                    Token.remove();
                }
            }
        }else{
            dispatch(loggedIn(false));
        }
        setFinish(true);
    }


    if(!finish){
        return <Requests.User request={userRequest} />;
    }

    if(Token.exist()){
        return <props.component {...props}  />;
        // return null;
    }
    
    return <Redirect to={{pathname:'/login', state: { from : props.location.pathname}}} />;
}



export default ComponentMiddleware;