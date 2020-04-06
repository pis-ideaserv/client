import React from 'react';
import {Card, CardHeader, CardContent, Avatar, TextField, Button, CircularProgress, Container} from '@material-ui/core'
import {AccountCircle} from '@material-ui/icons';
import './LoginStyle.scss';
import {Requests,Token} from 'Services';
import { withRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useDispatch} from 'react-redux';
import { UserAccount as User,loggedIn } from 'Redux/Actions';

const title = 'Product Inquiry System';
const logo  = '/img/ideaserv.png'; 

const Login = (props:any) => {
    const request:any = React.useRef();
    const userRef:any = React.useRef();

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
                        message: "Credentials does not exist!!"
                    });
                    break;
                case 200 :
                    Token.save(a.data.token);
                    const jwt:any = jwt_decode(Token.get()); // get id of current user using JWT payload

                    const users =await userRef.current.get(jwt.sub);
                    checkUser(users);
                    break;
                default :
                    setCredentials({
                        ...credentials,
                        password : "",
                    });
                    setSubmit(false);
                    // setError({
                    //     status : true,
                    //     message: "Something wrong with the server, please try again later!!!!"
                    // });
                    console.log(a);
                    break;
            }
        }else{
            setSubmit(false);
            setCredentials({
                ...credentials,
                password : "",
            });
            // setError({
            //     status : true,
            //     message : "Something wrong with the server. <br /> Please contact Administrator!!!!"
            // });
        }

        return;
    }


    const checkUser = async (user:Requests.Format) => {

        if(user.status === 200){
            if(!user.data.data.activated){
                setSubmit(false);
                setCredentials({
                    ...credentials,
                    password : "",
                });
                setError({
                    status : true,
                    message : "The account is not authorized to log in. <br /> Please contact Administator"
                });
                Token.remove();
                return;
            }

            
            const id:any = jwt_decode(Token.get());
            
            // const users:Requests.Format = await Requests.User.get(id.sub);
            const users:any = await userRef.current.get(id.sub);
        

            if(users.status === 200){
                dispatch(User(users.data.data));
                dispatch(loggedIn(true));
            }


            const returnUrl = props.location.state;

            
            
            if(returnUrl === undefined || returnUrl === null ){
                props.history.push('/');
                return;
            }
            
            props.history.push(returnUrl.from);

            return;
        }

        setSubmit(false);
        setCredentials({
            ...credentials,
            password : "",
        });
        setError({
            status : true,
            message : "Something went wrong.!!!<br /> Please contact Administator!!!"
        });

        Token.remove();
        return;

    }

    return(
        <Container maxWidth="lg">
            
            <Requests.Auth request={request} />
            <Requests.User request={userRef} />
            
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
        </Container>
    );
}

export default withRouter(Login);