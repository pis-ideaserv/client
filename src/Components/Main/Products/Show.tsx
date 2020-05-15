import React from 'react';
import { Dialog, DialogTitle, DialogContent, Paper, Table, TableBody, TableRow, TableCell, DialogActions, Button } from '@material-ui/core';
import moment from 'moment';
import { Edit, Close } from '@material-ui/icons';


interface Show{
    product       : any,
    modalShow     : boolean,
    user          : any,



    initModalEdit() : void
    setModalShow(a:boolean) : void,
}

const Show = (props:Show) => {

    if(props.product){
        return(
            <Dialog
                fullWidth
                maxWidth="sm"
                open={props.modalShow}
                onClose={ () => props.setModalShow(false) }
                aria-labelledby="max-width-dialog-title"
                className="dialog show"
            >
                <DialogTitle id="max-width-dialog-title" style={{textAlign:'center'}}>Product Details</DialogTitle>
                <DialogContent>

                    <Paper>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Supplier Code</TableCell>
                                        <TableCell>{props.product.supplier.supplier_code}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Supplier Name</TableCell>
                                        <TableCell>{props.product.supplier.supplier_name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Product Code</TableCell>
                                        <TableCell>{props.product.product.product_code}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Product Name</TableCell>
                                        <TableCell>{props.product.product.product_name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Category</TableCell>
                                        <TableCell>{props.product.product.category.name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Serial Number</TableCell>
                                        <TableCell>{props.product.serial_number}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Delivery Date</TableCell>
                                        <TableCell>{moment(props.product.delivery_date).format("LL")}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Warranty</TableCell>
                                        <TableCell>{props.product.warranty > 1 ? props.product.warranty + ' Months ' : props.product.warranty + " Month"}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Warranty Start</TableCell>
                                        <TableCell>{moment(props.product.warranty_start).format("LL")}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>End Date</TableCell>
                                        <TableCell>{moment(new Date(props.product.warranty_end)).format("LL")}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>Delivery Doc</TableCell>
                                        <TableCell>{props.product.reference_delivery_document}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>Created By</TableCell>
                                        <TableCell>{props.product.created_by.first_name + " " + props.product.created_by.last_name}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>Status</TableCell>
                                        <TableCell>{
                                            props.product.status === 1 ? 'New' :
                                            props.product.status === 2 ? 'Replaced'  :
                                            props.product.status === 3 ? 'Returned' : "Repaired"
                                        }</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>Remarks</TableCell>
                                        <TableCell>{props.product.remarks}</TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                    </Paper>

                </DialogContent>
                <DialogActions className="product-modal-footer">
                    {
                        props.user.level !== 3 ?
                            <Button 
                                onClick={props.initModalEdit} 
                                color="primary" 
                                variant="contained"
                            >  
                                <Edit />
                                Edit
                            </Button>
                        : null
                    }
                   
                    <Button onClick={() => props.setModalShow(false)} color="secondary" variant="contained">
                        <Close />   
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }else{
        return null;
    }
    
}


export default Show;







// import React from 'react';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import Slide from '@material-ui/core/Slide';
// import { TransitionProps } from '@material-ui/core/transitions';
// import { ArrowBack } from '@material-ui/icons';
// import { Paper } from '@material-ui/core';


// const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });


// interface Show{
//     product       : any,
//     modalShow     : boolean,
//     user          : any,

//     initModalEdit() : void
//     setModalShow(a:boolean) : void,
// }

// const Show = (props:Show) => {

//     const [, setOpen] = React.useState(false);


//     const handleClose = () => {
//         props.setModalShow(!props.modalShow);
//     };

//     return (
//         <div>
//             {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
//                 Open full-screen dialog
//             </Button> */}
//             <Dialog className="dialog fullscreen" fullScreen open={props.modalShow} onClose={handleClose} TransitionComponent={Transition}>
//                 <AppBar>
//                     <Toolbar>
//                         <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
//                             <ArrowBack />
//                         </IconButton>
//                         <Typography variant="h6" className="dialog-title">
//                             Product Details
//                         </Typography>
//                         <Button autoFocus color="inherit" onClick={handleClose}>
//                             Save
//                         </Button>
//                     </Toolbar>
//                 </AppBar>
//                 <Paper>

//                 </Paper>
//             </Dialog>
//         </div>
//     );
// }

// export default Show;
