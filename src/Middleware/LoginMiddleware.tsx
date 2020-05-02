import React, { useEffect } from 'react';
import { Redirect, withRouter } from 'react-router'
import {Token} from 'Services';
import {Login} from 'Components';

const LoginMiddleware=(props:any) => {

    if(Token.exist()){
        return <Redirect to={{ pathname : '/'}} />;
    }

    return <Login {...props} />;
}

export default withRouter(LoginMiddleware);