import React from 'react';
import { NavigationTitle,Users as user,Filter as Filterer,UsersFilter, UsersParams } from 'Redux/Actions';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Requests } from 'Services';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, TablePagination, Fab} from '@material-ui/core';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';
import Skeleton from '@material-ui/lab/Skeleton';
import {Close, FilterList } from '@material-ui/icons';
import Filter from './Filter';
import Show from './Show';
import Edit from './Edit';
import Add from './Add';

const Users = (props:any) =>{

    const userRequest:any = React.useRef();
    const [filter, setFilter] = React.useState({
        username        : {filter:'iet',key:''},
        name            : {filter:'iet',key:''},
        company         : {filter:'iet',key:''},
        email           : {filter:'iet',key:''},
        level           : {filter:'iet',key:0},
        activated       : {filter:'iet',key:0},
    });

    const initUsers:any = {
        id                  : '',
        first_name          : '',
        last_name           : '',
        username            : '',
        company             : '',
        email               : '',
        activated           : 1,
        level               : 1,
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


    //states
    const [modalShow, setModalShow] = React.useState(false);
    const [modalEdit, setModalEdit] = React.useState(false);
    const [modalAdd, setModalAdd]   = React.useState(false);
    const [submit,setSubmit]        = React.useState(false);
    const [users, setUsers]   = React.useState(null);
    const [usersInput, setUsersInput] = React.useState(initUsers);
    const [responseMessage, setResponseMessage] = React.useState(initUsersError);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar(); //snackbar

    //global state
    const usersState =  useSelector ( (state:any) => state.Users );
    const dispatch = useDispatch();

    React.useEffect(()=>{
        dispatch(NavigationTitle({control:'users'}));

        window.addEventListener('scroll', scroll, true);
        return () =>{
            window.removeEventListener('scroll', scroll);
        }
    },[props]);


    const scroll = () => {
        let scrollY = window.scrollY;
        let selector:any = window.document.getElementsByClassName('sticky-header');
        const changeAll = (style:string) => {
            for(var i = 0;i<selector.length;i++){
                
                if(style !== '0px'){
                    selector[i].style.background = '#3f50b5';
                    selector[i].style.color = 'white';
                }else{
                    selector[i].style.background = 'white';
                    selector[i].style.color = 'unset';
                }

                selector[i].style.top = style;
            }
        }
        if(scrollY > 92){
            changeAll(scrollY - 92 + 'px');
        }else{
            changeAll('0px');
        }
    }

    const resetError = () => {
        setResponseMessage({
            first_name : {error: false, message : ''},
            last_name  : {error: false, message : ''},
            username   : {error: false, message : ''},
            company    : {error: false, message : ''},
            email      : {error: false, message : ''},
            activated  : {error: false, message : ''},
            level      : {error: false, message : ''},
            password            : {error: false, message : ''},
            confirm_password    : {error: false, message : ''},
        });
    }

    const updateInput = (event:any) => {
        if(event)
            setUsersInput({
                ...usersInput,
                [event.target.name] : event.target.value,
            })
    }

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,newPage: number,) =>{
        // setPage(newPage);

        let pams:any = usersState.params;
        pams.page=newPage+1;
        dispatch(UsersParams(pams));
        dispatch(Filterer(filter,"user",pams));
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val:any = event.target.value;
        let paran = {page:1,per_page:val};
        dispatch(UsersParams(paran));
        dispatch(Filterer(filter,"user",paran));
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

                await userRequest.current.update(usersInput).then( 
                    (response:any) =>{
                        if(response.network_error){
                            enqueueSnackbar('Network error, please contact administrator!!!',{variant:'error',action:actions});
                            setModalEdit(false);
                        }else{
                            if(response.status === 200){
                                enqueueSnackbar('Supplier successfully updated!!!',{variant:'success',action:actions});
                                setModalEdit(false);
                                dispatch(user());
                            }
                            else{
                                
                                enqueueSnackbar('Update failed',{variant:'error',action:actions});
                                updateErrorState(response.data.errors);
                            }
                        }
                    }
                ).catch(()=>{
                    enqueueSnackbar('Something went wrong. Please try again!!!',{variant:'error',action:actions});
                    setModalEdit(false);
                });
                break;
        
        
                
            case "add" :

                await userRequest.current.add(usersInput).then( 
                    (response:any) =>{
                        if(response.network_error){
                            enqueueSnackbar('Network error, please contact administrator!!!',{variant:'error',action:actions});
                            setModalAdd(false);
                        }else{
                            if(response.status === 200){
                                enqueueSnackbar('Supplier successfully updated!!!',{variant:'success',action:actions});
                                setModalAdd(false);
                                dispatch(user());
                            }
                            else{
                                
                                enqueueSnackbar('Update failed',{variant:'error',action:actions});
                                updateErrorState(response.data.errors);
                            }
                        }
                    }
                ).catch((e:any)=>{
                    enqueueSnackbar('Something went wrong. Please try again!!!. '+ e ,{variant:'error',action:actions});
                    setModalAdd(false);
                });
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
    
    
    return(
        <React.Fragment>
            <Requests.User request={userRequest} />
            <Show users = {users} initModalEdit = {initModalEdit} modalShow = {modalShow} setModalShow = {setModalShow} />
            <Edit 
                modalEdit = {modalEdit}
                usersInput = {usersInput}
                responseMessage = {responseMessage}
                submit = {submit}
                updateInput = {updateInput}
                submitForm = {submitForm}
                setModalEdit = {setModalEdit}
            />
            <Add 
                modalAdd = {modalAdd}
                usersInput = {usersInput}
                responseMessage = {responseMessage}
                submit = {submit}
                updateInput = {updateInput}
                submitForm = {submitForm}
                setModalAdd = {setModalAdd}
            />
            <Paper className="paper-table">
                <div className="header">
                    <div className="title">Users</div>
                    <div className="controls">
                        <Fab size="small" color="primary" onClick={()=>{
                                dispatch(UsersFilter(!usersState.filter));
                            }} >
                            <FilterList />
                        </Fab>
                        {/* <Fab size="small" color="primary" onClick={(event:any)=>{
                            setTableAnchor(event.currentTarget);
                            setTableOpen(!tableOpen);
                        }}>
                            <ViewColumn />
                        </Fab> */}
                    </div>
                </div>
                <div className="custom-table">
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell className="sticky-header"  align="center">Username</TableCell>
                                <TableCell className="sticky-header"  align="center">Name</TableCell>
                                <TableCell className="sticky-header"  align="center">Company</TableCell>
                                <TableCell className="sticky-header"  align="center">Email</TableCell>
                                <TableCell className="sticky-header"  align="center">Level</TableCell>
                                <TableCell className="sticky-header"  align="center">Activated</TableCell>       
                            </TableRow>
                        </TableHead>
                        
                        <TableBody>
                            <Filter filter={filter} setFilter={setFilter} />
                            {
                                usersState.data ?
                                    usersState.data.data.data.map((key:any,id:number)=>(
                                        <TableRow key={id}  hover={true} style={{cursor:'pointer'}} onDoubleClick={() => initModalShow(key)} >
                                            <TableCell align="left" title={key.username}>{key.username}</TableCell>
                                            <TableCell align="left" title={key.first_name+" "+key.last_name}>{key.first_name+" "+key.last_name}</TableCell>
                                            <TableCell align="left" title={key.company}>{key.company}</TableCell>
                                            <TableCell align="left" title={key.email}>{key.email}</TableCell>
                                            <TableCell align="left" title={key.level === 1 ? 'Admin' : key.level == 2 ? 'Encoder' : 'Viewer'}>{key.level === 1 ? 'Admin' : key.level == 2 ? 'Encoder' : 'Viewer'}</TableCell>
                                            <TableCell align="left" title={key.activated ? 'Yes' :'No'}>{key.activated ? 'Yes' :'No'}</TableCell>                                       
                                        </TableRow>
                                    ))
                                :   skeletonTable()
                            }
                        </TableBody>
                    </Table>
                </div>
                <div className="footer">
                    <Button onClick={ () =>initModalAdd()} variant="contained" color="primary" className="product-add-new">
                        ADD NEW
                    </Button>
                    <TablePagination
                        rowsPerPageOptions={[10,25,50,100]}
                        colSpan={0}
                        component="div"
                        count={usersState.data ? usersState.data.data.meta.total : 10}
                        rowsPerPage={usersState.params.per_page}
                        page={usersState.data ? usersState.params.page-1 : 0}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                        className="custom-pagination"
                    />
                </div>
            </Paper>
        </React.Fragment>
    );
}

export default withRouter(Users);