import React from 'react';
import { Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button, Table, TableHead, TableRow, TableBody, TableCell, TablePagination } from '@material-ui/core';
import './notification.style.scss';
import Skeleton from '@material-ui/lab/Skeleton';
import Chip from '@material-ui/core/Chip';
import moment from 'moment';
import {useSnackbar} from 'notistack';
import { Close } from '@material-ui/icons';
import Product from 'Components/Main/Products/Upload';
import Supplier from 'Components/Main/Suppliers/Upload';
import MasterFile from 'Components/Main/Summary/Upload';
import {useSelector, useDispatch} from 'react-redux';
import {NotificationsParams,Notifications} from 'Redux/Actions';


const Notification = () => {

    const [open,setOpen] = React.useState(false);
    const {enqueueSnackbar,closeSnackbar} = useSnackbar();
    const [product,setProduct] = React.useState({open : false,result : {}});
    const [masterfile,setMasterFile] = React.useState({open : false,result : {}});
    const [supplier,setSupplier] = React.useState({open : false,result : {}});
    const notification = useSelector((state:any)=>state.Notifications);

    const dispatch = useDispatch();


    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,newPage: number) => {
        let pams:any = notification.params;
        pams.page=newPage+1;
        dispatch(NotificationsParams(pams));
        dispatch(Notifications(pams));
    }

    const skeletonTable = () => {
        let a:any = [];
        const tableCell:any = <TableCell align="right"><Skeleton variant="rect" width={'100%'} height={20}  /></TableCell>;
        
        for(let i = 0;i < 10;i++ ){
            a.push(
                <TableRow key={i}>
                    {tableCell}
                    {tableCell}
                    {tableCell}
                    {tableCell}
                </TableRow>
            );
        }

        return a;
    }

    const setErrorMessage = (value:any) => {
        if(value.status === "failed") {
            enqueueSnackbar(value.result.errors.message,{
                variant:"error",
                anchorOrigin:{
                    vertical:'top', 
                    horizontal:'right'
                },
                action : action
            });

            return;
        }

        if(value.status === 'done'){
            switch(value.type){
                case "product" :
                    setProduct({
                        ...product,
                        open : true,
                        result : value.result
                    })
                    return;
                case "masterfile":
                    setMasterFile({
                        ...masterfile,
                        open    :   true,
                        result  :   value.result
                    });
                    return;
                case "supplier" :
                    setSupplier({
                        ...supplier,
                        open    : true,
                        result  : value.result
                    })
                    return;
            }
        }
    }


    const action = (key:any) => (
        <Button variant="text" color="inherit" onClick={ () => closeSnackbar(key)}>
            <Close />
        </Button>
    );

    return(
        <React.Fragment>

            <Product upload={product} setUpload={setProduct} />
            <MasterFile upload={masterfile} setUpload={setMasterFile} />
            <Supplier upload={supplier} setUpload={setSupplier} />

            <Paper className="notification" onClick={()=>setOpen(true)}>
                Upload Status
            </Paper>
            
            <Dialog
                fullWidth={true}
                open={open}
                onClose={()=>setOpen(false)}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">Upload Status</DialogTitle>
                
                <DialogContent>
                    <Paper className="notfication-table">
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>id</TableCell>
                                    <TableCell>Target</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Date</TableCell>
                                </TableRow>
                                
                            </TableHead>
                            <TableBody>
                                {
                                    notification.data ?
                                        notification.data.data.data.map((value:any,key:number) =>(
                                            <TableRow hover key={key} className="pointer" onDoubleClick={()=>setErrorMessage(value)}>
                                                <TableCell>{value.id}</TableCell>
                                                <TableCell>{value.type}</TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={value.status} 
                                                        color={
                                                            value.status === "done" ? "default" :
                                                            value.status === "processing" ? "primary" :"secondary"
                                                        }
                                                        style={{
                                                            textTransform   : "uppercase",
                                                            fontWeight      : "bolder",
                                                            cursor          : "pointer",
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>{moment(value.created_at).format('lll')}</TableCell>
                                            </TableRow>
                                        ))
                                    : 
                                    skeletonTable()
                                }
                                
                            </TableBody>
                        </Table>    
                        <TablePagination
                            rowsPerPageOptions={[]}
                            component="div"
                            count={notification.data ? notification.data.data.meta.total : 10}
                            rowsPerPage={10}
                            page={notification.data ? notification.params.page-1 : 0}
                            backIconButtonProps={{
                                'aria-label': 'previous page',
                            }}
                            nextIconButtonProps={{
                                'aria-label': 'next page',
                            }}
                            onChangePage={handleChangePage}
                            // onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </Paper>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={()=>setOpen(false)} >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default Notification;