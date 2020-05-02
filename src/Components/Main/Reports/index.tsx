import React from 'react';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, TablePagination, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { Requests } from 'Services';
import Skeleton from '@material-ui/lab/Skeleton';
import moment from 'moment';
import {NavigationTitle,LogsParams,Filter as Filterer} from "Redux/Actions"
import {useDispatch, useSelector} from "react-redux";

const Reports = ( ) => {

    const logs = useSelector((state:any)=>state.Logs);
    const dispatch = useDispatch();

    React.useEffect(()=>{
        dispatch(NavigationTitle({control:'reports'}));
        window.addEventListener('scroll', scroll, true);
        return () =>{
            window.removeEventListener('scroll', scroll);
        }
    },[]);

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

    const [open, setOpen] = React.useState(false);
    const [modal,setModal] = React.useState(null);
    const [target,setTarget] = React.useState(null);


    const handleChangePage = (event:any, newPage:any) => {
        let pams:any = logs.params;
        pams.page=newPage+1;
        dispatch(LogsParams(pams));
        dispatch(Filterer(null,"logs",pams));

    };
    
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val:any = event.target.value;
        let paran = {page:1,per_page:val};
        dispatch(LogsParams(paran));
        dispatch(Filterer(null,"logs",paran))
    };

    
    const skeletonTable = () => {
        let a:any = [];

        const tableCell = <TableCell align="right"><Skeleton variant="rect" /></TableCell>;
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


    const initModal = (data:any,target:any) => {
        setModal(data);
        setOpen(true);
        setTarget(target);
    }

    const dataModal = () => {

        const ProductMasterList = (data:any) => {
            return(
                <React.Fragment>
                    <TableRow>
                        <TableCell component="th" scope="row">Product Code</TableCell>
                        <TableCell >{data.product_code}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">Product Name</TableCell>
                        <TableCell >{data.product_name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">Category</TableCell>
                        <TableCell >{data.category.name}</TableCell>
                    </TableRow>
                </React.Fragment>
            )
        }
        
        const user = (data:any) => {
            return(
                <React.Fragment>
                    <TableRow>
                        <TableCell component="th" scope="row">User Name</TableCell>
                        <TableCell >{data.username}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">Name</TableCell>
                        <TableCell >{data.first_name+" "+data.last_name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">Company</TableCell>
                        <TableCell >{data.company}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">Email</TableCell>
                        <TableCell >{data.email}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">Level</TableCell>
                        <TableCell >{data.level.name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">Activated</TableCell>
                        <TableCell >{parseInt(data.activated) === 1 ? "Yes" : "No"}</TableCell>
                    </TableRow>
                </React.Fragment>
            )
        }

        const supplier = (data:any) => {
            return(
                <React.Fragment>
                    <TableRow>
                        <TableCell component="th" scope="row">Supplier Code</TableCell>
                        <TableCell >{data.supplier_code}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">Supplier Name</TableCell>
                        <TableCell >{data.supplier_name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">TIN</TableCell>
                        <TableCell >{data.tin}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">Address</TableCell>
                        <TableCell >{data.address}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">Contact Person</TableCell>
                        <TableCell >{data.contact_person}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">Contact No.</TableCell>
                        <TableCell >{data.contact_number}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">Email</TableCell>
                        <TableCell >{data.email}</TableCell>
                    </TableRow>
                </React.Fragment>
            )
        }

        const product = (data:any) => {
            return(
                <React.Fragment>
                    <TableRow>
                        <TableCell component="th" scope="row">Supplier Code</TableCell>
                        <TableCell >{data.supplier.supplier_code}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">Product Code</TableCell>
                        <TableCell >{data.product.product_code}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">Product Name</TableCell>
                        <TableCell >{data.product.product_name}</TableCell>
                    </TableRow>
                    {/* <TableRow>
                        <TableCell component="th" scope="row">Category</TableCell>
                        <TableCell >{data.address}</TableCell>
                    </TableRow> */}
                    <TableRow>
                        <TableCell component="th" scope="row">Serial Number</TableCell>
                        <TableCell >{data.serial_number}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">Delivery Date</TableCell>
                        <TableCell >{moment(data.delivery_date).format('ll')}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">Warranty</TableCell>
                        <TableCell >{data.warranty+" Month(s)"}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">Warranty Start</TableCell>
                        <TableCell >{moment(data.warranty_start).format('ll')}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">End Date</TableCell>
                        <TableCell >{moment(data.warranty_end).format('ll')}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">Delivery Doc</TableCell>
                        <TableCell >{data.reference_delivery_document}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">Status</TableCell>
                        <TableCell >{data.status.name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">Remarks</TableCell>
                        <TableCell >{data.remarks}</TableCell>
                    </TableRow>
                </React.Fragment>
            )
        }


        return (
            <React.Fragment>
            {
                modal ?
                    <Dialog
                        // fullWidth={fullWidth}
                        // maxWidth="sm"
                        open={open}
                        onClose={() => setOpen(false)}
                        aria-labelledby="max-width-dialog-title"
                        className="modal-history"
                        disablePortal = {true}
                    >
                        <DialogTitle>History</DialogTitle>
                        <DialogContent>
                            <Table size="small">
                                <TableBody>
                                    {
                                        target === "Product"  ? product(modal)    :
                                        target === "Supplier" ? supplier(modal)   : 
                                        target === "User"     ? user(modal)       : 
                                        target === "ProductMasterList" ? ProductMasterList(modal) : ""
                                    }
                                </TableBody>
                            </Table>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" color="primary" onClick={ () => setOpen(false)}>
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog> 
                :

                ''
            }
            </React.Fragment>

            
        );
    }


    

    



    return(
        <div>
            {dataModal()}
            <Paper style={{whiteSpace:'nowrap'}} className="paper-table">
                <div className="header">
                    <div className="title">User Activities</div>
                </div>
                <div className="custom-table">
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell className="sticky-header">Date</TableCell>
                                <TableCell className="sticky-header">Name</TableCell>
                                <TableCell className="sticky-header">Action</TableCell>
                                <TableCell className="sticky-header">Target</TableCell>
                                <TableCell className="sticky-header">Previous</TableCell>
                                <TableCell className="sticky-header">Update</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                logs.data ?
                                logs.data.data.data.map( (value:any) =>
                                    <TableRow key={value.id} hover>
                                        <TableCell>{moment(value.updated_at).format('ll, h:mm a')}</TableCell>
                                        <TableCell style={{textTransform:'uppercase'}}>{value.user.first_name+" "+value.user.last_name}</TableCell>
                                        <TableCell  style={{textTransform:'uppercase'}}>{value.action}</TableCell>
                                        <TableCell  style={{textTransform:'uppercase'}}>{value.target}</TableCell>
                                        <TableCell>
                                            {
                                                value.previous ?
                                                    <Button variant="contained" size="small" color="primary" onClick={() => initModal(value.previous,value.target)}>
                                                        View
                                                    </Button>
                                                :    
                                                ''
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {
                                                value.update ?
                                                    <Button variant="contained" size="small" color="primary" onClick={() => initModal(value.update,value.target)}>
                                                        View
                                                    </Button>
                                                :    
                                                ''
                                            }
                                        </TableCell>
                                    </TableRow>
                                )
                                
                                :
                                skeletonTable()
                            }
                            
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[10,25,50,100]}
                    component="div"
                    count={logs.data ? logs.data.data.meta.total : 10}
                    rowsPerPage={logs.params.per_page}
                    page={logs.data ? logs.params.page-1 : 0}
                    backIconButtonProps={{
                        'aria-label': 'previous page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'next page',
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
} 

export default Reports;