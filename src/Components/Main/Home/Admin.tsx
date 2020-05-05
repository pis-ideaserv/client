import React from 'react';
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { Dropbox, VanUtility, Account } from 'mdi-material-ui';
import { ArrowForward } from '@material-ui/icons';
import {withRouter} from 'react-router-dom';
import { Requests } from 'Services';
import Skeleton from '@material-ui/lab/Skeleton';
import moment from 'moment';
import {useDispatch, useSelector} from "react-redux";
import Chart from 'react-google-charts';

const Admin = ( props :any ) => {

    const logsRequest:any = React.useRef();
    const statusRequest:any = React.useRef();

    const users = useSelector((state:any) => state.Users.data); 
    const products = useSelector((state:any) => state.Products.data); 
    const suppliers = useSelector((state:any) => state.Suppliers.data);
    const graph = useSelector((state:any) => state.Products.graph.data);
    const data = useSelector((state:any) => state.Logs.data);
    const [open, setOpen] = React.useState(false);
    const [modal,setModal] = React.useState();
    const [target,setTarget] = React.useState();
    
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

            <Requests.Logs request={logsRequest} />
            <Requests.Status request ={statusRequest} />

            {dataModal()}
            <div className="justify-content-center row" style={{marginTop:'90px'}}>
                <div className="col-lg text-center iconButton">
                    <Paper className="wrapper-box">
                        <Paper className="icon-wrapper-box">
                            <div className="col"><Dropbox className="home-icon" /></div>
                        </Paper>
                        <div className="title-box"> Total Products</div>
                        <div className="amount-box">{products  ? products.data.meta.total : 0 }</div>
                        {/* <div className="info-box">more info <ArrowForward /> </div> */}
                        <Button size="small" className="info-box" variant="contained" color="primary" onClick={ () => props.history.push('/products')}>More Info <ArrowForward /></Button>
                    </Paper>
                </div>
                <div className="col-lg text-center iconButton">
                    <Paper className="wrapper-box">
                        <Paper className="icon-wrapper-box">
                            <div className="col"><VanUtility className="home-icon" /></div>
                        </Paper>
                        <div className="title-box">Total Suppliers</div>
                        <div className="amount-box">{suppliers  ? suppliers.data.meta.total : 0 }</div>
                        {/* <div className="info-box">more info <ArrowForward /> </div> */}
                        <Button size="small" className="info-box" variant="contained" color="primary" onClick={ () => props.history.push('/suppliers')} >More Info <ArrowForward /></Button>
                    </Paper>
                </div>
                <div className="col-lg text-center iconButton" >
                    <Paper className="wrapper-box">
                        <Paper className="icon-wrapper-box">
                            <div className="col"><Account className="home-icon" /></div>
                        </Paper>
                        <div className="title-box"> Total User</div>
                        <div className="amount-box">{users  ? users.data.meta.total : 0 }</div>
                        {/* <div className="info-box"> more info <ArrowForward /> </div> */}
                        <Button size="small" className="info-box" variant="contained" color="primary" onClick={ () => props.history.push('/users')}>More Info <ArrowForward /></Button>
                    </Paper>
                </div>
            </div>
            <Paper className="admin-pie-graph col-6 offset-3">
                {
                    graph !== undefined ?
                        <Chart
                            width={'100%'}
                            height={'100%'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Task','Products Status'],
                                ['New',graph.status.New],
                                ['Replaced',graph.status.Replaced],
                                ['Returned',graph.status.Returned],
                                ['Repaired', graph.status.Repaired],
                            ]}
                            options={{
                                title: 'Products Status',
                                // Just add this option
                                is3D: true,
                            }}
                            rootProps={{ 'data-testid': '2' }}
                        />
                    : ''
                }
               
            </Paper>

            <Paper style={{whiteSpace:'nowrap'}} className="paper">
                <Typography variant="subtitle1" component="h6" style={{padding:'10px',fontWeight:'bolder',textTransform:'uppercase'}}>
                    User Activities
                </Typography>
                <div style={{overflow:'auto'}}>
                    <Table size="small">
                        <TableHead className="user-logs-table-head">
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Action</TableCell>
                                <TableCell>Target</TableCell>
                                <TableCell>Previous</TableCell>
                                <TableCell>Update</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                data ?
                                data.data.data.slice(0,10).map( (value:any,key:any) =>
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
                <Button onClick={()=>props.history.push('/reports')} size="small" variant="contained" color="primary" className="footer-button">
                    More info <ArrowForward />
                </Button>
            </Paper>
        </div>
    );
} 

export default withRouter(Admin);