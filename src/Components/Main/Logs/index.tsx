import React from 'react';
import { NavigationTitle,Users as user, Search} from 'Redux/Actions';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Requests } from 'Services';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, TableFooter, Button, TablePagination, Dialog, DialogTitle, DialogContent, DialogActions, TextField, CircularProgress} from '@material-ui/core';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';
import Skeleton from '@material-ui/lab/Skeleton';
import { Edit, Close, Save } from '@material-ui/icons';
import Select from 'react-select';
import Filter from './Filter';
import {Filter as Filterer} from "Redux/Actions";


const Logs = (props:any) =>{


    // const params = {page:1,per_page:10};
    const userRequest:any = React.useRef();
    const [ params, setParams ] = React.useState({
        page:1,
        per_page:10
    });
    
    const initUsers:any = {
        id                  : '',
        first_name          : '',
        last_name           : '',
        username            : '',
        company             : '',
        email               : '',
        activated           : null ,
        level               : '',
        password            : '',
        confirm_password    : ''
    };

    const initUsersError = {
        first_name          : {error: false, message : ''},
        last_name           : {error: false, message : ''},
        username            : {error: false, message : ''},
        company             : {error: false, message : ''},
        email               : {error: false, message : ''},
        activated           : {error: false, message : ''},
        level               : {error: false, message : ''},
        password            : {error: false, message : ''},
        confirm_password    : {error: false, message : ''},
    };

    const [filter, setFilter] = React.useState({
        username        : {filter:'iet',key:''},
        name            : {filter:'iet',key:''},
        company         : {filter:'iet',key:''},
        email           : {filter:'iet',key:''},
        level           : {filter:'iet',key:''},
        activated       : {filter:'iet',key:''},
    });


    //states
    const [modalShow, setModalShow] = React.useState(false);
    const [modalEdit, setModalEdit] = React.useState(false);
    const [modalAdd, setModalAdd]   = React.useState(false);
    const [submit,setSubmit]        = React.useState(false);
    const [users, setUsers]   = React.useState();
    const [usersInput, setUsersInput] = React.useState(initUsers);
    const [responseMessage, setResponseMessage] = React.useState(initUsersError);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar(); //snackbar
    // const [ page, setPage ] = React.useState(0);
    

    //global state
    const usersState =  useSelector ( (state:any) => state.Users.data );

    const dispatch = useDispatch();

    React.useEffect(()=>{
        
        // dispatch(NavigationTitle('Users'));
        dispatch(Filterer(filter,"product",params));

        // return () => {
        //     dispatch(NavigationTitle(''));
        // }
    },[props]);



    const resetError = () => {
        setResponseMessage({
            first_name          : {error: false, message : ''},
            last_name           : {error: false, message : ''},
            username            : {error: false, message : ''},
            company             : {error: false, message : ''},
            email               : {error: false, message : ''},
            activated           : {error: false, message : ''},
            level           : {error: false, message : ''},
            password            : {error: false, message : ''},
            confirm_password    : {error: false, message : ''},
        });
    }

    const updateInput = (event:any, value?:any) => {
        if(event)
            setUsersInput({
                ...usersInput,
                [event.target.name] : event.target.value,
            })
    }

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,newPage: number,) =>{
        // setPage(newPage);

        setParams({
            ...params,
            page : newPage +1,
        })

        dispatch(Filterer(filter,"user",params));
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val:any = event.target.value;
        setParams({
            ...params,
            per_page : val,
        });
        dispatch(Filterer(filter,"user",params));
    };

    const skeletonTable = () => {
        let a:any = [];

        const tableCell = <TableCell align="right"><Skeleton variant="rect" width={118} height={20} /></TableCell>;
        for(let i = 0;i < 10;i++ ){
            a.push(
                <TableRow key={i}>
                    {tableCell}
                    {tableCell}
                    {tableCell}
                    {tableCell}
                    {tableCell}
                    {tableCell}
                </TableRow>
            );
        }
        return a;
    }


    const initModalShow = (key:any) =>{
        setUsers(key);
        setModalShow(true);
    };

    const initModalAdd  = () =>{
        const add = initUsers;
        setUsersInput(initUsers);
        resetError();
        setModalAdd(true);
    };

    const actions = (key:any) => (
        <Button onClick={() => { closeSnackbar(key) }}>
            <div style={{color:"white"}}><Close /></div>
        </Button>
    );

    const initModalEdit = () =>{
        resetError();
        setUsersInput({
            id         : users.id,
            first_name : users.first_name,
            last_name  : users.last_name,
            username   : users.username,
            company    : users.company,
            email      : users.email, 
            activated  : Boolean(users.activated) ? 1 : 0,
            level      : users.level,
        });

        setModalShow(false);
        setModalEdit(true);
    };

    type action = "edit" | "add-file" | "add";
    const submitForm = async (event:any,action:action) => {
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

        switch(action){
            case "edit" :

                await userRequest.current.update(usersInput).then((response:any) =>{
                        // if(response.network_error){
                        //     enqueueSnackbar('Network error, please contact administrator!!!',{variant:'error',action:actions});
                        //     setModalEdit(false);
                        // }else{
                    if(response.status === 200){
                        enqueueSnackbar('Supplier successfully updated!!!',{variant:'success',action:actions});
                        setModalEdit(false);
                        dispatch(user());
                    }
                            // else{
                                
                            //     enqueueSnackbar('Update failed',{variant:'error',action:actions});
                            //     updateErrorState(response.data.errors);
                            // }
                        // }
                    }
                )
                // .catch(()=>{
                //     enqueueSnackbar('Something went wrong. Please try again!!!',{variant:'error',action:actions});
                //     setModalEdit(false);
                // });





                break;
        
        
                
            case "add" :

                await userRequest.current.add(usersInput).then((response:any) =>{
                        // if(response.network_error){
                        //     enqueueSnackbar('Network error, please contact administrator!!!',{variant:'error',action:actions});
                        //     setModalAdd(false);
                        // }else{
                    if(response.status === 200){
                        enqueueSnackbar('Supplier successfully updated!!!',{variant:'success',action:actions});
                        setModalAdd(false);
                        dispatch(user());
                    }
                        //     else{
                                
                        //         enqueueSnackbar('Update failed',{variant:'error',action:actions});
                        //         updateErrorState(response.data.errors);
                        //     }
                        // }
                    }
                )
                // .catch((e:any)=>{
                //     enqueueSnackbar('Something went wrong. Please try again!!!. '+ e ,{variant:'error',action:actions});
                //     setModalAdd(false);
                // });
                break;
        }
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
    

    const modalshow = ()=>{
        if(users){
            return(
                <Dialog
                    fullWidth
                    maxWidth="sm"
                    open={modalShow}
                    onClose={ () =>setModalShow(false) }
                    aria-labelledby="max-width-dialog-title"
                >
                    <DialogTitle id="max-width-dialog-title" style={{textAlign:'center'}}>User Details</DialogTitle>
                    <DialogContent>
    
                        <Paper className="product-modal-table">
                                <Table className="product-modal-list">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="left" variant="head">Username</TableCell>
                                            <TableCell align="left">{users.username}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left" variant="head" >Name</TableCell>
                                            <TableCell align="left">{users.username}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left" variant="head" >Company</TableCell>
                                            <TableCell align="left">{users.company}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left" variant="head" >Email</TableCell>
                                            <TableCell align="left" >{users.email}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left" variant="head" >Last Login</TableCell>
                                            <TableCell align="left"></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left" variant="head" >Level</TableCell>
                                            <TableCell align="left">{users.level === 1 ? 'Admin' : 'Encoder'}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left" variant="head" >Activated</TableCell>
                                            <TableCell align="left">{users.activated? 'Yes' : 'No'}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                        </Paper>
    
                    </DialogContent>
                    <DialogActions className="product-modal-footer">
                        
                        <Button 
                            onClick={initModalEdit} 
                            color="primary" 
                            variant="contained"
                        >  
                            <Edit />
                            Edit
                        </Button>
                        <Button onClick={() =>setModalShow(false)} color="secondary" variant="contained">
                            <Close />   
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            );
        }else{
            return null;
        }
    };
    const modaledit = ()=>{
        if(modalEdit){
            let level = [
                {label:'Admin', value : 1,target:{name:'level',value:1}},
                {label:'Encoder', value : 2,target:{name:'level',value:2}}
            ];

            let activated = [
                {label:'Yes', value : 1,target:{name:'activated',value:1}},
                {label:'No', value : 0,target:{name:'activated',value:0}},
            ]

            return(
                <Dialog
                    fullWidth
                    maxWidth="sm"
                    open={modalEdit}
                    onClose={ () =>setModalEdit(false) }
                    aria-labelledby="max-width-dialog-title"
                >
                    <DialogTitle id="max-width-dialog-title" style={{textAlign:'center'}}>Edit User Details</DialogTitle>
                    <DialogContent style={{overflow:'visible'}}>

                        <Paper className="text-center">
                            <form className ="form-group" onSubmit={(event:any) => submitForm(event,"edit")} id="submit-edit-form">
                                <div className="col-md-12">
                                    <div className="row align-items-center">
                                        <div className="col-md-4 font-bolder">
                                            Username
                                        </div>
                                        <div className="col-md-8">
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
                                <div className="col-md-12">
                                    <div className="row align-items-center">
                                        <div className="col-md-4 font-bolder">
                                            First Name
                                        </div>
                                        <div className="col-md-8">
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
                                <div className="col-md-12">
                                    <div className="row align-items-center">
                                        <div className="col-md-4 font-bolder">
                                            Last Name
                                        </div>
                                        <div className="col-md-8">
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
                                <div className="col-md-12">
                                    <div className="row align-items-center">
                                        <div className="col-md-4 font-bolder">
                                            Company
                                        </div>
                                        <div className="col-md-8">
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
                                <div className="col-md-12">
                                    <div className="row align-items-center">
                                        <div className="col-md-4 font-bolder">
                                            Level
                                        </div>
                                        <div className="col-md-8">
                                            <Select
                                                options={level}
                                                // isClearable
                                                name = 'level'
                                                defaultValue = {level.find((element:any) => element.value === usersInput.level)}
                                                onChange = {updateInput}
                                                isDisabled = {submit}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="row align-items-center">
                                        <div className="col-md-4 font-bolder">
                                            Activated
                                        </div>
                                        <div className="col-md-8">
                                            <Select
                                                options={activated}
                                                // isClearable
                                                name = 'activated'
                                                defaultValue = {activated.find((element:any) => 
                                                    element.value === usersInput.activated
                                                )}
                                                onChange = {updateInput}
                                                isDisabled = {submit}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="row align-items-center">
                                        <div className="col-md-4 font-bolder">
                                            Email
                                        </div>
                                        <div className="col-md-8">
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
                                <div className="col-md-12">
                                    <div className="row align-items-center">
                                        <div className="col-md-4 font-bolder">
                                            Password
                                        </div>
                                        <div className="col-md-8">
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
                                <div className="col-md-12">
                                    <div className="row align-items-center">
                                        <div className="col-md-4 font-bolder">
                                            Confirm Password
                                        </div>
                                        <div className="col-md-8">
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
                        </Paper>

                    </DialogContent>
                    <DialogActions className="product-modal-footer">
                        
                        <Button 
                            onClick={(event:any) => submitForm(event,"edit")} 
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
    const modaladd  = ()=>{
        if(modalAdd){
            let level = [
                {label:'Admin', value : 1,target:{name:'level',value:1}},
                {label:'Encoder', value : 2,target:{name:'level',value:2}}
            ];

            let activated = [
                {label:'Yes', value : 1,target:{name:'activated',value:1}},
                {label:'No', value : 0,target:{name:'activated',value:0}},
            ]

            return(
                <Dialog
                    fullWidth
                    maxWidth="sm"
                    open={modalAdd}
                    onClose={ () =>setModalAdd(false) }
                    aria-labelledby="max-width-dialog-title"
                >
                    <DialogTitle id="max-width-dialog-title" style={{textAlign:'center'}}>Add New User</DialogTitle>
                    <DialogContent style={{overflow:'visible'}}>

                        <Paper className="text-center">
                            <form className ="form-group" onSubmit={(event:any) => submitForm(event,"add")} id="submit-edit-form">
                                <div className="col-md-12">
                                    <div className="row align-items-center">
                                        <div className="col-md-4 font-bolder">
                                            Username
                                        </div>
                                        <div className="col-md-8">
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
                                <div className="col-md-12">
                                    <div className="row align-items-center">
                                        <div className="col-md-4 font-bolder">
                                            First Name
                                        </div>
                                        <div className="col-md-8">
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
                                <div className="col-md-12">
                                    <div className="row align-items-center">
                                        <div className="col-md-4 font-bolder">
                                            Last Name
                                        </div>
                                        <div className="col-md-8">
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
                                <div className="col-md-12">
                                    <div className="row align-items-center">
                                        <div className="col-md-4 font-bolder">
                                            Company
                                        </div>
                                        <div className="col-md-8">
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
                                <div className="col-md-12">
                                    <div className="row align-items-center">
                                        <div className="col-md-4 font-bolder">
                                            Level
                                        </div>
                                        <div className="col-md-8">
                                            <Select
                                                options={level}
                                                // isClearable
                                                name = 'level'
                                                defaultValue = {level[0]}
                                                onChange = {updateInput}
                                                isDisabled = {submit}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="row align-items-center">
                                        <div className="col-md-4 font-bolder">
                                            Activated
                                        </div>
                                        <div className="col-md-8">
                                            <Select
                                                options={activated}
                                                // isClearable
                                                name = 'activated'
                                                defaultValue = {activated[0]}
                                                onChange = {updateInput}
                                                isDisabled = {submit}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="row align-items-center">
                                        <div className="col-md-4 font-bolder">
                                            Email
                                        </div>
                                        <div className="col-md-8">
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
                                <div className="col-md-12">
                                    <div className="row align-items-center">
                                        <div className="col-md-4 font-bolder">
                                            Password
                                        </div>
                                        <div className="col-md-8">
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
                                <div className="col-md-12">
                                    <div className="row align-items-center">
                                        <div className="col-md-4 font-bolder">
                                            Confirm Password
                                        </div>
                                        <div className="col-md-8">
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
                        </Paper>

                    </DialogContent>
                    <DialogActions className="product-modal-footer">
                        
                        <Button 
                            onClick={(event:any) => submitForm(event,"add")} 
                            color="primary" 
                            variant="contained"
                            disabled={submit}
                            form="submit-edit-form"
                        >  
                            <Save />
                            Submit
                            <CircularProgress style={{display: !submit ? 'none' : 'unset' }} className="product-circular-progress"/>
                        </Button>
                        <Button onClick={() =>setModalAdd(false)} color="secondary" variant="contained">
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
            {modalshow()}
            {modaledit()}
            {modaladd()}
            <Paper className="productPaperTable">
                <Table className="product-list">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Username</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Company</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Level</TableCell>
                            <TableCell align="center">Activated</TableCell>       
                        </TableRow>
                    </TableHead>
                    
                    <TableBody>

                        <Filter filter={filter} setFilter={setFilter} params={params} />

                        {
                            usersState ?
                                usersState.data.data.map((key:any,id:number)=>(
                                    <TableRow key={id}  hover={true} style={{cursor:'pointer'}} onDoubleClick={() => initModalShow(key)} >
                                        <TableCell align="left" title={key.username}>{key.username}</TableCell>
                                        <TableCell align="left" title={key.first_name+" "+key.last_name}>{key.first_name+" "+key.last_name}</TableCell>
                                        <TableCell align="left" title={key.company}>{key.company}</TableCell>
                                        <TableCell align="left" title={key.email}>{key.email}</TableCell>
                                        <TableCell align="left" title={key.level === 1 ? 'Admin' : 'Encoder'}>{key.level === 1 ? 'Admin' : 'Encoder'}</TableCell>
                                        <TableCell align="left" title={key.activated ? 'Yes' :'No'}>{key.activated ? 'Yes' :'No'}</TableCell>                                       
                                    </TableRow>
                                ))
                            :   skeletonTable()
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow className="product-footer-table">
                            <td>
                                <Button onClick={ () =>initModalAdd()} variant="contained" color="primary" className="product-add-new">
                                    ADD NEW
                                </Button>
                            </td>

                            <TablePagination
                                rowsPerPageOptions={[]}
                                colSpan={0}
                                count={usersState ? usersState.data.meta.total : 10}
                                rowsPerPage={10}
                                page={usersState ? params.page : 0}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                                className="product-pagination"
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </Paper>
        </React.Fragment>
    );
}

export default withRouter(Logs);