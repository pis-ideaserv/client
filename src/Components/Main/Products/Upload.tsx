import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Table, TableHead, TableRow, TableCell, TableBody, Paper, Collapse } from '@material-ui/core';

interface Upload{
    upload : any,
    setUpload : any;
}

const Upload = (props:Upload) => {

    const handleClose = () => {
        props.setUpload({
            ...props.upload,
            open    : false
        });
    };


    const skipped = {
        overflow : 'auto',
        maxHeight : '250px',
        maxWidth : '100%'
    }

    const noWrap = {
        whiteSpace : 'nowrap',
    }



    if(props.upload.open){

        return (
            <Dialog
                fullWidth
                maxWidth="md"
                open={props.upload.open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
                disableBackdropClick={true}
            >
                <DialogTitle id="max-width-dialog-title">Result</DialogTitle>
                <DialogContent>
                    <h5>Skipped Rows</h5>
                    <Paper style={skipped}>
                        <Table size="small">
                            <TableHead style={{backgroundColor : '#bdbdda'}}>
                                <TableRow>
                                    <TableCell className="noWrap" align="center">Supplier Code</TableCell>
                                    <TableCell className="noWrap" align="center">Product Code</TableCell>
                                    {/* <TableCell className="noWrap" align="center">Product Name</TableCell> */}
                                    <TableCell className="noWrap" align="center">Delivery Date</TableCell>
                                    <TableCell className="noWrap" align="center">Delivery Doc. </TableCell>
                                    <TableCell className="noWrap" align="center">Serial Number</TableCell>
                                    <TableCell className="noWrap" align="center">Warranty</TableCell>
                                    <TableCell className="noWrap" align="center">Warranty Start</TableCell>   
                                    <TableCell className="noWrap" align="center">Warranty End</TableCell>   
                                    <TableCell className="noWrap" align="center">Status</TableCell>   
                                    <TableCell className="noWrap" align="center">Remarks</TableCell>
                                    <TableCell className="noWrap" align="center">Error Message</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.upload.result.errors.length !== 0 ?
                                        props.upload.result.errors.map((value:any,key:any) => (
                                            <TableRow hover  key={key}>
                                                <TableCell className="noWrap" align="center">{value.data.supplier_code}</TableCell>
                                                <TableCell className="noWrap" align="center">{value.data.product_code}</TableCell>
                                                {/* <TableCell className="noWrap" align="center">{value.data.product_description}</TableCell> */}
                                                <TableCell className="noWrap" align="center">{value.data.delivery_date}</TableCell>
                                                <TableCell className="noWrap" align="center">{value.data.reference_delivery_document}</TableCell>
                                                <TableCell className="noWrap" align="center">{value.data.serial_number} </TableCell>
                                                <TableCell className="noWrap" align="center">{value.data.warranty} </TableCell>
                                                <TableCell className="noWrap" align="center">{value.data.warranty_start} </TableCell>
                                                <TableCell className="noWrap" align="center">{value.data.warranty_end} </TableCell>
                                                <TableCell className="noWrap" align="center">{value.data.status} </TableCell>
                                                <TableCell className="noWrap" align="center">{value.data.remarks} </TableCell>
                                                <TableCell className="noWrap" align="left">{value.message} </TableCell>                                            
                                            </TableRow>
                                        ))
                                    :
                                        <TableRow>
                                            <TableCell className="noWrap" align="center">Empty</TableCell>
                                            <TableCell className="noWrap" align="center">&nbsp;</TableCell>
                                            {/* <TableCell className="noWrap" align="center">&nbsp;</TableCell> */}
                                            <TableCell className="noWrap" align="center">&nbsp;</TableCell>
                                            <TableCell className="noWrap" align="center">&nbsp;</TableCell>
                                            <TableCell className="noWrap" align="center">&nbsp;</TableCell>
                                            <TableCell className="noWrap" align="center">&nbsp;</TableCell>                                            
                                            <TableCell className="noWrap" align="center">&nbsp;</TableCell>                                            
                                            <TableCell className="noWrap" align="center">&nbsp;</TableCell>                                            
                                            <TableCell className="noWrap" align="center">&nbsp;</TableCell>                                            
                                            <TableCell className="noWrap" align="center">&nbsp;</TableCell>                                            
                                            <TableCell className="noWrap" align="center">&nbsp;</TableCell>                                            
                                        </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </Paper>
                    <br />
                    <h5>Successfully Imported</h5>
                    <Paper style={skipped}>
                        <Table size="small">
                            <TableHead style={{backgroundColor:'#ed143d'}}>
                                <TableRow>
                                    <TableCell className="noWrap" align="center">Supplier Code</TableCell>
                                    <TableCell className="noWrap" align="center">Product Code</TableCell>
                                    {/* <TableCell className="noWrap" align="center">Product Name</TableCell> */}
                                    <TableCell className="noWrap" align="center">Delivery Date</TableCell>
                                    <TableCell className="noWrap" align="center">Delivery Doc. </TableCell>
                                    <TableCell className="noWrap" align="center">Serial Number</TableCell>
                                    <TableCell className="noWrap" align="center">Warranty</TableCell>
                                    <TableCell className="noWrap" align="center">Warranty Start</TableCell>   
                                    <TableCell className="noWrap" align="center">Warranty End</TableCell>   
                                    <TableCell className="noWrap" align="center">Status</TableCell>   
                                    <TableCell className="noWrap" align="center">Remarks</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.upload.result.success.length !== 0 ?
                                        props.upload.result.success.map((value:any,key:any) => (
                                            <TableRow key={key} hover>
                                                <TableCell className="noWrap" align="center">{value.supplier_code}</TableCell>
                                                <TableCell className="noWrap" align="center">{value.product_code}</TableCell>
                                                {/* <TableCell className="noWrap" align="center">{value.product_description}</TableCell> */}
                                                <TableCell className="noWrap" align="center">{value.delivery_date}</TableCell>
                                                <TableCell className="noWrap" align="center">{value.reference_delivery_document}</TableCell>
                                                <TableCell className="noWrap" align="center">{value.serial_number} </TableCell>
                                                <TableCell className="noWrap" align="center">{value.warranty} </TableCell>
                                                <TableCell className="noWrap" align="center">{value.warranty_start} </TableCell>
                                                <TableCell className="noWrap" align="center">{value.warranty_end} </TableCell>
                                                <TableCell className="noWrap" align="center">{value.status} </TableCell>
                                                <TableCell className="noWrap" align="center">{value.remarks} </TableCell>                                       
                                            </TableRow>
                                        ))
                                    : 
                                        <TableRow>
                                            <TableCell className="noWrap" align="center">Empty</TableCell>
                                            <TableCell className="noWrap" align="center">&nbsp;</TableCell>
                                            {/* <TableCell className="noWrap" align="center">&nbsp;</TableCell> */}
                                            <TableCell className="noWrap" align="center">&nbsp;</TableCell>
                                            <TableCell className="noWrap" align="center">&nbsp;</TableCell>
                                            <TableCell className="noWrap" align="center">&nbsp;</TableCell>                                            
                                            <TableCell className="noWrap" align="center">&nbsp;</TableCell>                                            
                                            <TableCell className="noWrap" align="center">&nbsp;</TableCell>                                            
                                            <TableCell className="noWrap" align="center">&nbsp;</TableCell>                                            
                                            <TableCell className="noWrap" align="center">&nbsp;</TableCell>                                            
                                            <TableCell className="noWrap" align="center">&nbsp;</TableCell>                                           
                                        </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </Paper>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }else{
        return null;
    }
}


export default Upload;