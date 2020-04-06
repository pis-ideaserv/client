import React from 'react';
import { Dialog, DialogTitle, DialogContent, Paper, Table, TableBody, TableRow, TableCell, DialogActions, Button } from '@material-ui/core';
import { Edit, Close } from '@material-ui/icons';

interface Show{
    supplier                : any,
    modalShow               : boolean,
    user                    : any,
    
    initModalEdit()         : void,
    setModalShow(a:boolean) : void,
}

const Show = (props:Show) =>{

    if(props.supplier){
        return(
            <Dialog
                fullWidth
                maxWidth="sm"
                open={props.modalShow}
                onClose={ () =>props.setModalShow(false) }
                aria-labelledby="max-width-dialog-title"
                className="dialog show"
            >
                <DialogTitle id="max-width-dialog-title" style={{textAlign:'center'}}>Supplier Details</DialogTitle>
                <DialogContent>

                    <Paper>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Supplier Code</TableCell>
                                        <TableCell>{props.supplier.supplier_code}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Supplier Name</TableCell>
                                        <TableCell>{props.supplier.supplier_name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>TIN</TableCell>
                                        <TableCell>{props.supplier.tin}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Address</TableCell>
                                        <TableCell title={props.supplier.address}>{props.supplier.address}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Contact Person</TableCell>
                                        <TableCell>{props.supplier.contact_person}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Contact No.</TableCell>
                                        <TableCell>{props.supplier.contact_number}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Email</TableCell>
                                        <TableCell>{props.supplier.email}</TableCell>
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
                   
                    <Button onClick={() =>props.setModalShow(false)} color="secondary" variant="contained">
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


export default Show;