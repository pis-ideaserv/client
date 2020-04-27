import React, { useEffect } from 'react';
import { Redirect, withRouter } from 'react-router'
import {Token} from 'Services';
import {Login} from 'Components';

const LoginMiddleware=(props:any) => {

    const [ finish, setFinish ] = React.useState(false);
    const [ token, setToken ] = React.useState(false);
    
    async function check(){
        if (await Token.exist()){
            setToken(true);
        }
        setFinish(true);
    }
    
    useEffect(() => {
        check();
    },[]);

    if(!finish){
        return null;
    }
    
    if(token){
        return <Redirect to={{ pathname : '/'}} />;
    }

    return <Login {...props} />;

}

export default withRouter(LoginMiddleware);