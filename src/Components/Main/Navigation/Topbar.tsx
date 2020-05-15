import React from 'react';
import {InputBase, IconButton, Typography,CssBaseline, Toolbar, AppBar, Button, Avatar, Popover, Checkbox, FormGroup, FormControlLabel, Paper, Dialog, DialogTitle, DialogContent, TextField, DialogActions, CircularProgress } from '@material-ui/core';
import {Assignment, Search, ArrowDropDown,AssignmentReturned, Edit, ExitToApp, Close, Save} from '@material-ui/icons';
// import './NavigationStyle.scss';
import {useDispatch,useSelector} from 'react-redux';
import {Search as SearchControl} from 'Redux/Actions';
import { useSnackbar } from 'notistack';
import { Requests, Token } from 'Services';
import {UserAccount,Users} from 'Redux/Actions';
import jwt_decode from 'jwt-decode';

interface Props{
    
    state           :   {
        width       :   number,
        sidebar     :   boolean,
        user        :   any,
        search      :   boolean
    },
    logo            :   string,
    menu_title      :   string,
    user            :   any,
    location        :   string,

    navigate(a:string)      : void,
    toggleSidebar() :   void,
    toggleSearch(a:boolean)  :   void,
    toggleUser(event:React.MouseEvent<HTMLElement>)             :   void,
    swipeDrawer(event: React.KeyboardEvent | React.MouseEvent)   :   void,
    logout()         :   void, 
}


const Topbar = (props:Props) => {
    const userRequest:any = React.useRef();
    const initUsers:any = {
        id                  : '',
        first_name          : '',
        last_name           : '',
        username            : '',
        company             : '',
        email               : '',
        password            : '',
        confirm_password    : ''
    };

    const initUsersError = {
        first_name          : {error: false, message : ''},
        last_name           : {error: false, message : ''},
        username            : {error: false, message : ''},
        company             : {error: false, message : ''},
        email               : {error: false, message : ''},
        password            : {error: false, message : ''},
        confirm_password    : {error: false, message : ''},
    };

    const [usersInput, setUsersInput] = React.useState(initUsers);
    const [submit,setSubmit]        = React.useState(false);
    const [modalEdit, setModalEdit] = React.useState(false);
    const [responseMessage, setResponseMessage] = React.useState(initUsersError);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar(); //snackbar

    const search = useSelector((state:any)=>state.Search);
    const dispatch = useDispatch();

    const submitSearch = (event:any) => {
        event.preventDefault();
        
        if(search.value !== ''){
            props.navigate('/'+search.target+'?search='+search.value);
            props.toggleSearch(false);
        }
    }

    const actions = (key:any) => (
        <Button onClick={() => { closeSnackbar(key) }}>
            <div style={{color:"white"}}><Close /></div>
        </Button>
    );


    const close = () => {

        if(props.state.search){
            dispatch(SearchControl.value(''));
            props.navigate(props.location);
        }else{ 
            props.toggleSearch(false);
            dispatch(SearchControl.value(''));
            props.navigate(props.location);
        }
    }

    const updateInput = (event:any, value?:any) => {
        if(event)
            setUsersInput({
                ...usersInput,
                [event.target.name] : event.target.value,
            })
    }

    const initModalEdit = () =>{
        resetError();
        setUsersInput({
            id         : props.user.id,
            first_name : props.user.first_name,
            last_name  : props.user.last_name,
            username   : props.user.username,
            company    : props.user.company,
            email      : props.user.email,
        });

        setModalEdit(true);
    };

    const resetError = () => {
        setResponseMessage({
            first_name : {error: false, message : ''},
            last_name  : {error: false, message : ''},
            username   : {error: false, message : ''},
            company    : {error: false, message : ''},
            email      : {error: false, message : ''},
            password            : {error: false, message : ''},
            confirm_password    : {error: false, message : ''},
        });
    }

    const submitForm = async (event:any) => {
        resetError(); // reset error message state before submiting;
        event.persist();  //to access the event properties in an asynchronous way. https://reactjs.org/docs/events.html#event-pooling
        event.preventDefault();
        document.getElementsByTagName("html")[0].style.pointerEvents = "none";
        document.getElementsByTagName("html")[0].style.cursor = "progress";
        setSubmit(true);

        if(usersInput.password !== usersInput.confirm_password){
            
            setSubmit(false);
            document.getElementsByTagName("html")[0].style.pointerEvents = "unset";
            document.getElementsByTagName("html")[0].style.cursor = "unset";
            
            setResponseMessage({
                ...responseMessage,
                confirm_password : {error:true,message:'Confirmed password incorrect!!'} 
            })
            
            enqueueSnackbar('Please confirm password correctly!!!',{variant:'error',action:actions});
            return;
        }
        await userRequest.current.update(usersInput).then( 
            async (response:any) =>{
                if(response.status === 200){
                    enqueueSnackbar('Supplier successfully updated!!!',{variant:'success',action:actions});
                    setModalEdit(false);
                    dispatch(UserAccount());
                }
            }
        );

        
              
        setSubmit(false);
        document.getElementsByTagName("html")[0].style.pointerEvents = "unset";
        document.getElementsByTagName("html")[0].style.cursor = "unset";
        return;
    }

    const updateErrorState = (response:[]) => {
        let holder:any = initUsersError;
        response.forEach( (value:any) =>{
            holder[value.name] = {error : true,message: value.message};
        });
        setResponseMessage(holder);
    }


    const modaledit = ()=>{
        if(modalEdit){
            return(
                <Dialog
                    fullWidth
                    maxWidth="xs"
                    open={modalEdit}
                    onClose={ () =>setModalEdit(false) }
                    aria-labelledby="max-width-dialog-title"
                >
                    <DialogTitle id="max-width-dialog-title" style={{textAlign:'center'}}>Update Profile</DialogTitle>
                    <DialogContent style={{overflow:'visible'}}>
                            <form className ="form-group edit-profile" onSubmit={submitForm} id="submit-edit-form">
                                <div className="custom-col col-12">
                                    <div className="row align-items-center">
                                        <div className="col-md-4 font-bolder title-profile">
                                            Username
                                        </div>
                                        <div className="col-md-8 input-profile">
                                            <TextField
                                                type="text"
                                                margin="normal"
                                                variant="outlined"
                                                className="full-width product-reduce-margin-text"
                                                name = "username"
                                                onChange = {updateInput}
                                                value = {usersInput.username}
                                                disabled = {submit}
                                                required
                                                error = {responseMessage.username.error}
                                                helperText = {responseMessage.username.message}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="custom-col col-12">
                                    <div className="row align-items-center">
                                        <div className="col-md-4 font-bolder title-profile">
                                            First Name
                                        </div>
                                        <div className="col-md-8 input-profile">
                                            <TextField
                                                margin="normal"
                                                variant="outlined"
                                                className="full-width product-reduce-margin-text"
                                                name = "first_name"
                                                onChange = {updateInput}
                                                value = {usersInput.first_name}
                                                disabled = {submit}
                                                error = {responseMessage.first_name.error}
                                                helperText = {responseMessage.first_name.message}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="custom-col col-12">
                                    <div className="row align-items-center">
                                        <div className="col-md-4 font-bolder title-profile">
                                            Last Name
                                        </div>
                                        <div className="col-md-8 input-profile">
                                            <TextField
                                                margin="normal"
                                                variant="outlined"
                                                className="full-width product-reduce-margin-text"
                                                name = "last_name"
                                                onChange = {updateInput}
                                                value = {usersInput.last_name}
                                                disabled = {submit}
                                                required
                                                error = {responseMessage.last_name.error}
                                                helperText = {responseMessage.last_name.message}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="custom-col col-12">
                                    <div className="row align-items-center">
                                        <div className="col-md-4 font-bolder title-profile">
                                            Company
                                        </div>
                                        <div className="col-md-8 input-profile">
                                            <TextField
                                                margin="normal"
                                                variant="outlined"
                                                className="full-width product-reduce-margin-text"
                                                name = "company"
                                                onChange = {updateInput}
                                                value = {usersInput.company}
                                                disabled = {submit}
                                                required
                                                error = {responseMessage.company.error}
                                                helperText = {responseMessage.company.message}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="custom-col col-12">
                                    <div className="row align-items-center">
                                        <div className="col-md-4 font-bolder title-profile">
                                            Email
                                        </div>
                                        <div className="col-md-8 input-profile">
                                            <TextField
                                                type="email"
                                                margin="normal"
                                                variant="outlined"
                                                className="full-width product-reduce-margin-text"
                                                name = "email"
                                                onChange = {updateInput}
                                                value = {usersInput.email}
                                                disabled = {submit}
                                                required
                                                error = {responseMessage.email.error}
                                                helperText = {responseMessage.email.message}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="custom-col col-12">
                                    <div className="row align-items-center">
                                        <div className="col-md-4 font-bolder title-profile">
                                            Password
                                        </div>
                                        <div className="col-md-8 input-profile">
                                            <TextField
                                                type="password"
                                                margin="normal"
                                                variant="outlined"
                                                className="full-width product-reduce-margin-text"
                                                name = "password"
                                                onChange = {updateInput}
                                                value = {usersInput.password}
                                                disabled = {submit}
                                                error = {responseMessage.password.error}
                                                helperText = {responseMessage.password.message}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="custom-col col-12">
                                    <div className="row align-items-center">
                                        <div className="col-md-4 font-bolder title-profile">
                                            Confirm Password
                                        </div>
                                        <div className="col-md-8 input-profile">
                                            <TextField
                                                type="password"
                                                margin="normal"
                                                variant="outlined"
                                                className="full-width product-reduce-margin-text"
                                                name = "confirm_password"
                                                onChange = {updateInput}
                                                value = {usersInput.confirm_password}
                                                disabled = {submit}
                                                error = {responseMessage.confirm_password.error}
                                                helperText = {responseMessage.confirm_password.message}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <input type="submit" style={{display:'none'}} />
                            </form>

                    </DialogContent>
                    <DialogActions className="product-modal-footer">
                        
                        <Button 
                            onClick={submitForm} 
                            color="primary" 
                            variant="contained"
                            disabled={submit}
                            form="submit-edit-form"
                        >  
                            <Save />
                            Submit
                            <CircularProgress style={{display: !submit ? 'none' : 'unset' }} className="product-circular-progress"/>
                        </Button>
                        <Button onClick={() =>setModalEdit(false)} color="secondary" variant="contained">
                            <Close />   
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            );
        }else{
            return null;
        }
    };



    return(
        <React.Fragment>
            <Requests.User request={userRequest} />
            {modaledit()}
            <CssBaseline />
            <AppBar
                position="fixed"
                className="appbar"
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        className={ props.state.width < 600  ? 
                            "hamburger" 
                            :
                            props.state.sidebar ? "hamburger hamburger--squeeze is-active" : "hamburger"
                        } 
                        onClick={props.state.width > 600 ? props.toggleSidebar : props.swipeDrawer}
                    >	
                        <span className="hamburger-box">
                            <span className="hamburger-inner"></span>
                        </span>
                    </IconButton>
                    <Typography className="nav-title" variant="h6" noWrap style={{textTransform : "uppercase"}}>
                        {/* {props.menu_title} */}

                        <img src="/img/ideaserv.png" alt="Ideaserv System Inc" />
                        <div className="nav-desc">Product Inquiry System</div>
                    </Typography>
                        <div className="user-account">
                            <Button
                                color = "inherit"
                                onClick = {props.toggleUser}
                            >
                                <Avatar 
                                    alt="Jobel Racines" 
                                    src="/img/user.png"
                                    className = "user-avatar"
                                />
                                <div className="user-name">
                                    {props.user.first_name}
                                </div>

                                <ArrowDropDown />
                            </Button>
                        </div>



                        <div className="search-choices" style={{display:!props.state.search ? 'none' : 'unset'}}>
                                <Paper>
                                    <FormGroup row>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    color="primary"
                                                    checked = {search.target === 'users' ? true : false}
                                                    onChange = {()=>dispatch(SearchControl.target('users'))}
                                                />
                                            }
                                            label="User"
                                            style={{marginLeft:0}}
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    color="primary"
                                                    checked = {search.target === 'products' ? true : false}
                                                    onChange = {()=>dispatch(SearchControl.target('products'))}
                                                />
                                            }
                                            label="Product"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    color="primary"
                                                    checked = {search.target === 'suppliers' ? true : false}
                                                    onChange = {()=>dispatch(SearchControl.target('suppliers'))}
                                                />
                                            }
                                            label="Supplier"
                                        />
                                    </FormGroup>
                                </Paper>
                            </div>


                        <Popover 
                            open={Boolean(props.state.user)} 
                            anchorEl={props.state.user}
                            onClose={props.toggleUser}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            className="user-menu"
                            // anchorPosition={
                            // 	{
                            // 		top : 200,
                            // 		left: 400
                            // 	}
                            // }
                            
                        >	
                            <div className="user-menu-profile">
                                <div className="header-user-profile">
                                    <Avatar 
                                        alt="User Image" 
                                        src="/img/user.png"
                                        className="header-user-profile-avatar"
                                    />

                                    <div className="header-user-profile-name" onClick={initModalEdit}>
                                        
                                        {props.user.first_name && props.user.last_name ? props.user.first_name+" "+props.user.last_name : ''}
                                        <Edit className="edit-icon" />
                                    </div>
                                    <div className="header-user-profile-description">
                                        {
                                            props.user.email !== null || props.user.email !== undefined ?
                                                props.user.email
                                            : ""
                                        }
                                    </div>
                                </div>

                                <div className="body-user-profile">
                                    <ul>
{/* 
                                        <li>
                                            <div>Assigned</div>
                                            <div><AssignmentReturned /></div>
                                        </li>

                                        <li>
                                            <div>Requested</div>
                                            <div><Assignment /></div>
                                        </li>

                                        <li>
                                            <div>Edit Profile</div>
                                            <div><Edit /></div>
                                        </li> */}

                                    </ul>
                                </div>

                                <div className="footer-user-profile">
                                    <Button
                                        variant ="outlined"
                                        color   ="primary"
                                        onClick = {props.logout}
                                    >
                                        <ExitToApp />
                                        {props.user.first_name && props.user.last_name ? " Logout" : " Login" }
                                    </Button>
                                </div>
                            </div>
                                
                            
                        </Popover>




                        {/* <div className="mobile-search" style={{display: !props.state.search ? 'none' : ''}}>
                            <div className="mobile-search-icon">
                                <Search />
                            </div>
                            <InputBase
                                name="searchBox"
                                id ="searchBox"
                                className="mobile-search-input"
                                placeholder="Search…"
                                autoFocus={props.state.search}
                                inputProps={{ 'aria-label': 'search' }}
                            />

                        </div>


                        <IconButton
                            color="inherit"
                            aria-haspopup="true"
                            edge="end"
                            className="search-toggle"
                            onClick={ () => props.toggleSearch(true)}
                        >
                            <Search />
                        </IconButton> */}
                </Toolbar>
                
            </AppBar>
        </React.Fragment>
    )
}

export default Topbar;