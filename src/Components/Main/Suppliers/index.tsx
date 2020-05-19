import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { 
    NavigationTitle,
    Suppliers as supplierAction,
    SuppliersFilter,
    SuppliersParams, 
    Filter as Filterer 
} from 'Redux/Actions';
import { useSnackbar } from 'notistack';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, TableFooter, Button, TablePagination, Dialog, DialogContent, CircularProgress, Fab } from '@material-ui/core';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';
import Skeleton from '@material-ui/lab/Skeleton';
import { Close, CloudUpload, FilterList, Cached } from '@material-ui/icons';
import { Requests } from 'Services';
import Filter from './Filter';
import Add from './Add';
import Edit from './Edit';
import Show from './Show';
import Upload from 'Components/Upload';



const Suppliers = (props:any) => {

    const supplierRequest:any = React.useRef();
    const initSupplierError = {
        supplier_code : {error: false, message : ''},
        supplier_name : {error: false, message : ''},
        address       : {error: false, message : ''},
        tin           : {error: false, message : ''},
        contact_person: {error: false, message : ''},
        contact_number: {error: false, message : ''},
        email         : {error: false, message : ''}
    };

    const initSupplier = {
        id            : '',
        supplier_code : '',
        supplier_name : '',
        address       : '',
        tin           : '',
        contact_person: '',
        contact_number: '',
        email         : '',
    };
    
    const [modalShow, setModalShow] = React.useState(false);
    const [modalEdit, setModalEdit] = React.useState(false);
    const [modalAdd, setModalAdd]   = React.useState(false);
    const [submit,setSubmit]        = React.useState(false);
    const [supplier, setSupplier]   = React.useState(null);
    const [ upload,setUpload ] = React.useState(false);

    const [supplierInput, setSupplierInput] = React.useState(initSupplier);
    const [responseMessage, setResponseMessage] = React.useState(initSupplierError);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    //global state
    const supplierState =  useSelector ( (state:any) => state.Suppliers ); 
    const user  = useSelector( (state:any) => state.UserAccount.data);


    //dispatcher
    const dispatch = useDispatch();

    let file:HTMLInputElement;


    React.useEffect(()=>{
        dispatch(NavigationTitle({title : 'Suppliers', control:'suppliers' }));
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


    const skeletonTable = () => {
        let a:any = [];

        const tableCell = <TableCell align="right"><Skeleton variant="rect" width={'100%'} height={20} /></TableCell>;
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

    const togglePointerEvents = (event:boolean) => {
        if(event){
            document.getElementsByTagName("html")[0].style.pointerEvents = "unset";
            document.getElementsByTagName("html")[0].style.cursor = "unset";
        }else{
            document.getElementsByTagName("html")[0].style.pointerEvents = "none";
            document.getElementsByTagName("html")[0].style.cursor = "progress";
        }
        return;
    }

    const actions = (key:any) => (
        <Button onClick={() => { closeSnackbar(key) }}>
            <div style={{color:"white"}}><Close /></div>
        </Button>
    ); 

    // const uploadFile = () => {
    //     togglePointerEvents(false)

    //     if(file.files.length !== 0){
    //         const selectedFile = file.files[0];
    //         let filename = selectedFile.name.split('.').pop();
            
    //         if( !(filename === 'xls' || filename === 'xlsx')) {
    //             enqueueSnackbar('Please select xlsx or xls file only !!!. ',{variant:'error',action:actions});
    //             togglePointerEvents(true);
    //             return;
    //         }else{
    //             uploadSheet(selectedFile);
    //         }
    //     }
        
    // }


    // const uploadSheet = async (file:File) => {

    //     setUpload({
    //         ...upload,
    //         uploading : true,
    //     });

    //     let response = await supplierRequest.current.addFile(file);

    //     switch(response.status){
    //         case 406 :
    //             enqueueSnackbar("Spreadsheet format is invalid",{variant:'error',action:actions});
    //             togglePointerEvents(true);
    //             setUpload({
    //                 ...upload,
    //                 uploading : false,
    //             });
    //             return;
    //         case 200 :

    //             enqueueSnackbar('Sheet successfully imported!!',{variant:'success',action:actions});
    //             togglePointerEvents(true);
    //             dispatch(Filterer(filter,"supplier",params));

    //             setUpload({
    //                 open      : true,
    //                 uploading : false,
    //                 result    : response.data
    //             });

    //             return;
    //         default :
    //             enqueueSnackbar('Something went wrong. Please try again',{variant:'error',action:actions});
    //             togglePointerEvents(true);

    //             setUpload({
    //                 ...upload,
    //                 uploading : false,
    //             });
    //             return;
    //     }
    // }

    // const uploadFileModal = () =>{
    //     if(upload.uploading){
    //         return (
    //             <Dialog
    //                 maxWidth="xs"
    //                 open={upload.uploading}
    //                 disableBackdropClick
    //                 className="uploading-processing"
    //             >
    //                 <DialogContent>
    //                     <div>
    //                         <div className="loading-submit-upload" style={{textAlign:"center"}}>
    //                             <CircularProgress />
    //                         </div>
    //                         <div className="status-submit-upload">
    //                             Uploading
    //                         </div>
    //                     </div>
    //                 </DialogContent>
    //             </Dialog>
    //         );
    //     }else{
    //         return null;
    //     }
    // }

    const resetError = () => {
        setResponseMessage(initSupplierError);
    };
    
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,newPage: number) =>{
        dispatch(SuppliersParams({
            ...supplierState.params,
            page : newPage+1,
        }));
        dispatch(supplierAction());
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(SuppliersParams({
            ...supplierState.params,
            per_page : event.target.value,
            page     : 1 
        }));
        dispatch(supplierAction());
    };

    const updateInput = (event:any) => {
        setSupplierInput({
            ...supplierInput,
            [event.target.name] : event.target.value,
        })
    }

    const initModalShow = (details:any) =>{
        setSupplier(details);
        setModalShow(true);
    };

    const initModalEdit = () =>{
        resetError();
        // setResponseMessage(initSupplierError);    // reset error message state before mounting modal;
        
        setSupplierInput({
            id            : supplier.id,
            supplier_code : supplier.supplier_code,
            supplier_name : supplier.supplier_name,
            address       : supplier.address,
            tin           : supplier.tin,
            contact_person: supplier.contact_person,
            contact_number: supplier.contact_number,
            email         : supplier.email,
        });

        setModalShow(false);
        setModalEdit(true);
    };
    const initModalAdd = () =>{
        setSupplierInput(initSupplier);
        resetError();
        setModalAdd(true);
    };

    
    type action = "edit" | "add-file" | "add";

    const submitForm = async (event:any,action:action) => {
        resetError();
        event.persist();  //to access the event properties in an asynchronous way. https://reactjs.org/docs/events.html#event-pooling
        event.preventDefault();
        document.getElementsByTagName("html")[0].style.pointerEvents = "none";
        document.getElementsByTagName("html")[0].style.cursor = "progress";
        setSubmit(true);

        switch(action){
            case "edit" :

                await supplierRequest.current.update(supplierInput).then( 
                    (response:any) =>{
                        if(response.network_error){
                            enqueueSnackbar('Network error, please contact administrator!!!',{variant:'error',action:actions});
                            setModalEdit(false);
                        }else{
                            if(response.status === 200 && !response.data.hasOwnProperty('status')){
                                enqueueSnackbar('Supplier successfully updated!!!',{variant:'success',action:actions});
                                setModalEdit(false);
                                dispatch(supplierAction());
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

                await supplierRequest.current.add(supplierInput).then( 
                    (response:any) =>{
                        if(response.network_error){
                            enqueueSnackbar('Network error, please contact administrator!!!',{variant:'error',action:actions});
                            setModalAdd(false);
                        }else{
                            if(response.status === 200 && !response.data.hasOwnProperty('status')){
                                enqueueSnackbar('Supplier successfully added!!!',{variant:'success',action:actions});
                                setModalAdd(false);
                                dispatch(supplierAction());
                            }else{
                                enqueueSnackbar('Add new supplier failed',{variant:'error',action:actions});
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
    };

    const updateErrorState = (response:[]) => {
        let holder:any = initSupplierError;
        response.forEach( (value:any) =>{
            holder[value.name] = {error : true,message: value.message};
        });
        setResponseMessage(holder);
    }

    return(
        <React.Fragment>
            <Requests.Suppliers request={supplierRequest} />
            <Show 
                supplier        =   {supplier}
                modalShow       =   {modalShow}
                user            =   {user}
                initModalEdit   =   {initModalEdit}
                setModalShow    =   {setModalShow}
            />
            <Edit
                modalEdit       =   {modalEdit}
                updateInput     =   {updateInput}
                supplierInput   =   {supplierInput}
                submit          =   {submit}
                responseMessage =   {responseMessage}
                setModalEdit    =   {setModalEdit}
                submitForm      =   {submitForm}
            />
            <Add
                modalAdd        =   {modalAdd}
                updateInput     =   {updateInput}
                supplierInput   =   {supplierInput}
                submit          =   {submit}
                responseMessage =   {responseMessage}
                setModalAdd     =   {setModalAdd}
                submitForm      =   {submitForm}
            />
            <Upload
                open      = {upload}
                setOpen   = {setUpload}
                type      = "supplier"
            />

            <Paper className="paper-table main-content">
                <div className="header">
                    <div className="title">Suppliers</div>
                    <div className="controls">
                        <Fab size="small" disabled={supplierState.status!=="done"} className={supplierState.status === "done" ? "rotate pause":"rotate" } onClick={()=>dispatch(supplierAction())} color="primary" >
                            <Cached />
                        </Fab>
                        <Fab size="small" color="primary" onClick={()=>{
                                dispatch(SuppliersFilter(!supplierState.filter));
                            }} >
                            <FilterList />
                        </Fab>
                    </div>
                </div>
                <div className="custom-table">
                    <Table className="product-list" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell className="sticky-header" align="center">Supplier Code</TableCell>
                                <TableCell className="sticky-header" align="center">Name</TableCell>
                                <TableCell className="sticky-header" align="center">Address</TableCell>
                                <TableCell className="sticky-header" align="center">Contact Person</TableCell>
                                <TableCell className="sticky-header" align="center">Contact No.</TableCell>
                                <TableCell className="sticky-header" align="center">Email</TableCell>       
                            </TableRow>
                        </TableHead>
                        
                        <TableBody>
                            <Filter />
                            {
                                supplierState.data ?
                                    supplierState.data.data.data.map((key:any,id:number)=>(
                                        <TableRow key={id}  hover={true} style={{cursor:'pointer'}} onDoubleClick={() => initModalShow(key)} >
                                            <TableCell align="left" title={key.supplier_code}>{key.supplier_code}</TableCell>
                                            <TableCell align="left" title={key.supplier_name}>{key.supplier_name}</TableCell>
                                            <TableCell align="left" title={key.address}>{key.address}</TableCell>
                                            <TableCell align="left" title={key.contact_person}>{key.contact_person}</TableCell>
                                            <TableCell align="left" title={key.contact_number}>{key.contact_number}</TableCell>
                                            <TableCell align="left" title={key.email}>{key.email}</TableCell>                                       
                                        </TableRow>
                                    ))
                                :   skeletonTable()
                            }
                        </TableBody>
                    </Table>
                </div>
                <div className="footer">
                    {
                        user.level !== 3 ?
                            <React.Fragment>
                                <Button onClick={ () =>initModalAdd()} variant="contained" color="primary" className="product-add-new">
                                    ADD NEW
                                </Button>

                                <Button 
                                    color="primary"
                                    variant="contained"
                                    onClick={(event)=>{
                                        setUpload(true);
                                    }}
                                    className="product-add-file"
                                >
                                    <CloudUpload />&nbsp;  
                                    Import file
                                </Button>
                            </React.Fragment>
                        : null
                    }
                    
                    <TablePagination
                        rowsPerPageOptions={[10,25,50,100]}
                        component="div"
                        colSpan={0}
                        count={supplierState.data ? supplierState.data.data.meta.total : 10}
                        rowsPerPage={supplierState.params.per_page}
                        page={supplierState.data ? supplierState.params.page-1 : 0}
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

export default withRouter(Suppliers);