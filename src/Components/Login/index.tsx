import React from 'react';
import {Card, CardHeader, CardContent, Avatar, TextField, Button, CircularProgress, Container} from '@material-ui/core'
import {AccountCircle} from '@material-ui/icons';
import './LoginStyle.scss';
import {Requests,Token} from 'Services';
import { withRouter } from 'react-router-dom';
import {loggedIn} from 'Redux/Actions';
import {useDispatch} from 'react-redux';

const title = 'Product Inquiry System';
const logo  = '/img/ideaserv.png'; 

const Login = (props:any) => {
    const request:any = React.useRef();
    const [ submit, setSubmit ] = React.useState(false);
    const [ credentials, setCredentials ] = React.useState({username : '',password : ''});
    const [ error, setError ] = React.useState({status : false,message: ''});
    const dispatch = useDispatch();


    const update_input_text = (event:any) => {
        setCredentials({
            ...credentials,
            [event.target.name] : event.target.value,
        })
    }

    const submitForm = async (event:any) => {
        event.preventDefault();
        setSubmit(true);
        setError({
            status : true,
            message: ''
        });

        const a:any = await request.current.login({
            username : credentials.username,
            password : credentials.password,
        });

        if(!a.network_error){
            switch(a.status){
                case 401 : 
                    setCredentials({
                        ...credentials,
                        password : "",
                    });
                    setSubmit(false);
                    setError({
                        status : true,
                        message: a.data.message
                    });
                    break;
                case 200 :
                    Token.save(a.data.token);
                    dispatch(loggedIn(true));
                    props.history.push(props.location.state === undefined ? '/' : props.location.state);
                    break;
                default :
                    setCredentials({
                        ...credentials,
                        password : "",
                    });
                    setSubmit(false);
                    break;
            }
        }else{
            setSubmit(false);
            setCredentials({
                ...credentials,
                password : "",
            });
        }
        return;
    }

    return(
        <div className="login">
            <Requests.Auth request={request} />
            
            <div className="logo-login">
                <img src={logo} alt="logo" />
                <div className="logo-title">
                    {title}  
                </div>
            </div>
            <Card className="card-login">
                <CardHeader
                    className = "header-login"
                    avatar = {
                        <div className="wrap-user-icon">
                            <Avatar className="user-icon-login">
                                <AccountCircle className="user-icon-login1"/>
                            </Avatar>
                        </div>
                    }
                />
                            
                <CardContent className="card-content-login">
                    <form onSubmit={submitForm}>
                        <TextField
                            className="username-login"
                            label="Username"
                            type="text"
                            name="username"
                            autoComplete="username"
                            margin="normal"
                            variant="outlined"
                            disabled={submit}
                            onChange={update_input_text}
                            value={credentials.username}
                            error = {error.status}
                            required
                        />
        
                        <TextField
                            className="password-login"
                            label="Password"
                            type="password"
                            name="password"
                            margin="normal"
                            variant="outlined"
                            disabled={submit}
                            onChange={update_input_text}
                            value={credentials.password}
                            error = {error.status}
                            helperText = { error.status ? <b dangerouslySetInnerHTML={{__html:error.message}}></b> : '' }
                            required
                        />
                        
                        <div className="submit-login">
                            <Button variant="contained" color="primary" disabled={submit} type="submit">
                                Submit
                                { 
                                    submit ? <CircularProgress /> : ''
                                }
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default withRouter(Login);