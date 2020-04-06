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
                                    <TableCell className="noWrap" align="center">Name</TableCell>
                                    <TableCell className="noWrap" align="center">Address</TableCell>
                                    <TableCell className="noWrap" align="center">Contact Person</TableCell>
                                    <TableCell className="noWrap" align="center">Contact No.</TableCell>
                                    <TableCell className="noWrap" align="center">Email</TableCell>
                                    <TableCell className="noWrap" align="center">Remarks</TableCell>   
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.upload.result.errors.length !== 0 ?
                                        props.upload.result.errors.map((value:any,key:any) => (
                                            <TableRow hover  key={key}>
                                                <TableCell className="noWrap" align="center">{value.data.supplier_code}</TableCell>
                                                <TableCell className="noWrap" align="center">{value.data.supplier_name}</TableCell>
                                                <TableCell className="noWrap" align="center">{value.data.address}</TableCell>
                                                <TableCell className="noWrap" align="center">{value.data.contact_person}</TableCell>
                                                <TableCell className="noWrap" align="center">{value.data.contact_number}</TableCell>
                                                <TableCell className="noWrap" align="center">{value.data.email} </TableCell>   
                                                <TableCell className="noWrap" align="left">{value.message} </TableCell>                                            
                                            </TableRow>
                                        ))
                                    :
                                        <TableRow>
                                            <TableCell className="noWrap" align="center">Empty</TableCell>
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
                                    <TableCell className="noWrap" align="center">Name</TableCell>
                                    <TableCell className="noWrap" align="center">Address</TableCell>
                                    <TableCell className="noWrap" align="center">Contact Person</TableCell>
                                    <TableCell className="noWrap" align="center">Contact No.</TableCell>
                                    <TableCell className="noWrap" align="center">Email</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.upload.result.success.length !== 0 ?
                                        props.upload.result.success.map((value:any,key:any) => (
                                            <TableRow key={key} hover>
                                                <TableCell className="noWrap" align="center">{value.supplier_code}</TableCell>
                                                <TableCell className="noWrap" align="center">{value.supplier_name}</TableCell>
                                                <TableCell className="noWrap" align="center">{value.address}</TableCell>
                                                <TableCell className="noWrap" align="center">{value.contact_person}</TableCell>
                                                <TableCell className="noWrap" align="center">{value.contact_number}</TableCell>
                                                <TableCell className="noWrap" align="center">{value.email}</TableCell>                                            
                                            </TableRow>
                                        ))
                                    : 
                                        <TableRow>
                                            <TableCell className="noWrap" align="center">Empty</TableCell>
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