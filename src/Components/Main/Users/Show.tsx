import React from 'react';
import { Dialog, DialogTitle, DialogContent, Paper, Table, TableBody, TableRow, TableCell, DialogActions, Button } from '@material-ui/core';
import { Edit, Close } from '@material-ui/icons';

interface show{
    users : any,
    initModalEdit:any,
    modalShow : boolean,
    
    setModalShow: any,
}

const Show = (props:show) => {

    return(
        props.modalShow ?
            <Dialog
                fullWidth
                maxWidth="sm"
                open={props.modalShow}
                onClose={ () =>props.setModalShow(false) }
                aria-labelledby="max-width-dialog-title"
                className="dialog show"
            >
                <DialogTitle id="max-width-dialog-title" style={{textAlign:'center'}}>User Details</DialogTitle>
                <DialogContent>

                    <Paper>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Username</TableCell>
                                        <TableCell>{props.users.username}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>{props.users.first_name+" "+props.users.last_name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Company</TableCell>
                                        <TableCell>{props.users.company}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left" variant="head" >Email</TableCell>
                                        <TableCell align="left" >{props.users.email}</TableCell>
                                    </TableRow>
                                    {/* <TableRow>
                                        <TableCell align="left" variant="head" >Last Login</TableCell>
                                        <TableCell align="left"></TableCell>
                                    </TableRow> */}
                                    <TableRow>
                                        <TableCell align="left" variant="head" >Level</TableCell>
                                        <TableCell align="left">{props.users.level === 1 ? 'Admin' : props.users.level == 2 ? 'Encoder' : 'Viewer'}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left" variant="head" >Activated</TableCell>
                                        <TableCell align="left">{props.users.activated? 'Yes' : 'No'}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                    </Paper>

                </DialogContent>
                <DialogActions className="product-modal-footer">
                    
                    <Button 
                        onClick={props.initModalEdit} 
                        color="primary" 
                        variant="contained"
                    >  
                        <Edit />
                        Edit
                    </Button>
                    <Button onClick={() =>props.setModalShow(false)} color="secondary" variant="contained">
                        <Close />   
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        : null
    );
}

export default Show;