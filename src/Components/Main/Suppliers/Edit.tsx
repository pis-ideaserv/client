import React from 'react';
import { Dialog, DialogTitle, DialogContent, Paper, TextField, DialogActions, Button, CircularProgress } from '@material-ui/core';
import { Save, Close } from '@material-ui/icons';


interface Edit{
    modalEdit                   :   boolean,
    updateInput                 :   any,
    supplierInput               :   any,
    submit                      :   boolean,
    responseMessage             :   any,



    setModalEdit(a:boolean)     :   void,
    submitForm(a:any,b:string)  :   void,
}

const Edit = (props:Edit) =>{
    return(
        <Dialog
            fullWidth
            maxWidth="sm"
            open={props.modalEdit}
            onClose={ () =>props.setModalEdit(false) }
            aria-labelledby="max-width-dialog-title"
            className="dialog edit"
        >
            <DialogTitle id="max-width-dialog-title" style={{textAlign:'center'}}>Edit Supplier Details</DialogTitle>
            <DialogContent>

                <Paper className="text-center">
                    <form className ="form-group" onSubmit={(event:any) => props.submitForm(event,"edit")} id="submit-edit-form">
                        <div className="col-md-12">
                            <div className="row align-items-center">
                                <div className="col-md-4 title-input">
                                    Supplier Code
                                </div>
                                <div className="col-md-8 input">
                                    <TextField
                                        type="text"
                                        margin="normal"
                                        variant="outlined"
                                        className="text"
                                        name = "supplier_code"
                                        onChange = {props.updateInput}
                                        value = {props.supplierInput.supplier_code}
                                        disabled = {props.submit}
                                        required
                                        error = {props.responseMessage.supplier_code.error}
                                        helperText = {props.responseMessage.supplier_code.message}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="row align-items-center">
                                <div className="col-md-4 title-input">
                                    Supplier Name
                                </div>
                                <div className="col-md-8 input">
                                    <TextField
                                        margin="normal"
                                        variant="outlined"
                                        className="text"
                                        name = "supplier_name"
                                        onChange = {props.updateInput}
                                        value = {props.supplierInput.supplier_name}
                                        disabled = {props.submit}
                                        error = {props.responseMessage.supplier_name.error}
                                        helperText = {props.responseMessage.supplier_name.message}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="row align-items-center">
                                <div className="col-md-4 title-input">
                                    Address
                                </div>
                                <div className="col-md-8 input">
                                    <TextField
                                        margin="normal"
                                        variant="outlined"
                                        className="text"
                                        name = "address"
                                        onChange = {props.updateInput}
                                        value = {props.supplierInput.address}
                                        disabled = {props.submit}
                                        required
                                        error = {props.responseMessage.address.error}
                                        helperText = {props.responseMessage.address.message}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="row align-items-center">
                                <div className="col-md-4 title-input">
                                    TIN
                                </div>
                                <div className="col-md-8 input">
                                    <TextField
                                        margin="normal"
                                        variant="outlined"
                                        className="text"
                                        name = "tin"
                                        onChange = {props.updateInput}
                                        value = {props.supplierInput.tin}
                                        disabled = {props.submit}
                                        required
                                        error = {props.responseMessage.tin.error}
                                        helperText = {props.responseMessage.tin.message}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="row align-items-center">
                                <div className="col-md-4 title-input">
                                    Contact Person
                                </div>
                                <div className="col-md-8 input">
                                    <TextField
                                        type="text"
                                        margin="normal"
                                        variant="outlined"
                                        className="text"
                                        name = "contact_person"
                                        onChange = {props.updateInput}
                                        value = {props.supplierInput.contact_person}
                                        disabled = {props.submit}
                                        required
                                        error = {props.responseMessage.contact_person.error}
                                        helperText = {props.responseMessage.contact_person.message}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="row align-items-center">
                                <div className="col-md-4 title-input">
                                    Contact Person
                                </div>
                                <div className="col-md-8 input">
                                    <TextField
                                        type="text"
                                        margin="normal"
                                        variant="outlined"
                                        className="text"
                                        name = "contact_number"
                                        onChange = {props.updateInput}
                                        value = {props.supplierInput.contact_number}
                                        disabled = {props.submit}
                                        required
                                        error = {props.responseMessage.contact_number.error}
                                        helperText = {props.responseMessage.contact_number.message}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="row align-items-center">
                                <div className="col-md-4 title-input">
                                    Email
                                </div>
                                <div className="col-md-8 input">
                                    <TextField
                                        type="email"
                                        margin="normal"
                                        variant="outlined"
                                        className="text"
                                        name = "email"
                                        onChange = {props.updateInput}
                                        value = {props.supplierInput.email}
                                        disabled = {props.submit}
                                        required
                                        error = {props.responseMessage.email.error}
                                        helperText = {props.responseMessage.email.message}
                                    />
                                </div>
                            </div>
                        </div>
                        <input type="submit" style={{display:'none'}} />
                    </form>
                </Paper>

            </DialogContent>
            <DialogActions className="product-modal-footer">
                
                <Button 
                    onClick={(event:any) => props.submitForm(event,"edit")} 
                    color="primary" 
                    variant="contained"
                    disabled={props.submit}
                    form="submit-edit-form"
                >  
                    <Save />
                    Submit
                    <CircularProgress style={{display: !props.submit ? 'none' : 'unset' }} className="submit-progress"/>
                </Button>
                <Button onClick={() =>props.setModalEdit(false)} color="secondary" variant="contained">
                    <Close />   
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Edit;