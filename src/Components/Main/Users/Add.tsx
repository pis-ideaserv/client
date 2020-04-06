import React from 'react';
import { Dialog, DialogTitle, DialogContent, Paper, TextField, DialogActions, Button, CircularProgress } from '@material-ui/core';
import { Save, Close } from '@material-ui/icons';
import Select from 'react-select';

interface Add{
    modalAdd : any,
    usersInput : any,
    responseMessage : any,
    submit : boolean,


    updateInput : any,
    submitForm(a:any,b:any) : void,
    setModalAdd(a:boolean) : void,
}

const Add = (props:Add) => {

    let level = [
        {label:'Admin', value : 1,target:{name:'level',value:1}},
        {label:'Encoder', value : 2,target:{name:'level',value:2}},
        {label:'Viewer', value : 3,target:{name:'level',value:3}},
    ];



    let activated = [
        {label:'Yes', value : 1,target:{name:'activated',value:1}},
        {label:'No', value : 0,target:{name:'activated',value:0}},
    ]

    return(
        props.modalAdd ? 
            <Dialog
                fullWidth
                maxWidth="sm"
                open={props.modalAdd}
                onClose={ () =>props.setModalAdd(false) }
                aria-labelledby="max-width-dialog-title"
                className="dialog edit"
            >
                <DialogTitle id="max-width-dialog-title" style={{textAlign:'center'}}>Add User Details</DialogTitle>
                <DialogContent style={{overflow:'visible'}}>

                    <Paper className="text-center">
                        <form className ="form-group" onSubmit={(event:any) => props.submitForm(event,"add")} id="submit-edit-form">
                            <div className="col-md-12">
                                <div className="row align-items-center">
                                    <div className="col-md-4 title-input">
                                        Username
                                    </div>
                                    <div className="col-md-8 input">
                                        <TextField
                                            type="text"
                                            margin="normal"
                                            variant="outlined"
                                            className="text"
                                            name = "username"
                                            onChange = {props.updateInput}
                                            value = {props.usersInput.username}
                                            disabled = {props.submit}
                                            required
                                            error = {props.responseMessage.username.error}
                                            helperText = {props.responseMessage.username.message}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="row align-items-center">
                                    <div className="col-md-4 title-input">
                                        First Name
                                    </div>
                                    <div className="col-md-8 input">
                                        <TextField
                                            margin="normal"
                                            variant="outlined"
                                            className="text"
                                            name = "first_name"
                                            onChange = {props.updateInput}
                                            value = {props.usersInput.first_name}
                                            disabled = {props.submit}
                                            error = {props.responseMessage.first_name.error}
                                            helperText = {props.responseMessage.first_name.message}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="row align-items-center">
                                    <div className="col-md-4 title-input">
                                        Last Name
                                    </div>
                                    <div className="col-md-8 input">
                                        <TextField
                                            margin="normal"
                                            variant="outlined"
                                            className="text"
                                            name = "last_name"
                                            onChange = {props.updateInput}
                                            value = {props.usersInput.last_name}
                                            disabled = {props.submit}
                                            required
                                            error = {props.responseMessage.last_name.error}
                                            helperText = {props.responseMessage.last_name.message}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="row align-items-center">
                                    <div className="col-md-4 title-input">
                                        Company
                                    </div>
                                    <div className="col-md-8 input">
                                        <TextField
                                            margin="normal"
                                            variant="outlined"
                                            className="text"
                                            name = "company"
                                            onChange = {props.updateInput}
                                            value = {props.usersInput.company}
                                            disabled = {props.submit}
                                            required
                                            error = {props.responseMessage.company.error}
                                            helperText = {props.responseMessage.company.message}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="row align-items-center">
                                    <div className="col-md-4 title-input">
                                        Activated
                                    </div>
                                    <div className="col-md-8 input">
                                        <Select
                                            options={activated}
                                            // isClearable
                                            name = 'activated'
                                            defaultValue = {activated[0]}
                                            onChange = {props.updateInput}
                                            isDisabled = {props.submit}
                                            classNamePrefix="select"
                                            className="select-container"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="row align-items-center">
                                    <div className="col-md-4 title-input">
                                        Level
                                    </div>
                                    <div className="col-md-8 input">
                                        <Select
                                            options={level}
                                            // isClearable
                                            name = 'level'
                                            defaultValue = {level[0]}
                                            onChange = {props.updateInput}
                                            isDisabled = {props.submit}
                                            classNamePrefix="select"
                                            className="select-container"
                                            required
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
                                            value = {props.usersInput.email}
                                            disabled = {props.submit}
                                            required
                                            error = {props.responseMessage.email.error}
                                            helperText = {props.responseMessage.email.message}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="row align-items-center">
                                    <div className="col-md-4 title-input">
                                        Password
                                    </div>
                                    <div className="col-md-8 input">
                                        <TextField
                                            type="password"
                                            margin="normal"
                                            variant="outlined"
                                            className="text"
                                            name = "password"
                                            onChange = {props.updateInput}
                                            value = {props.usersInput.password}
                                            disabled = {props.submit}
                                            error = {props.responseMessage.password.error}
                                            helperText = {props.responseMessage.password.message}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="row align-items-center">
                                    <div className="col-md-4 title-input">
                                        Confirm Password
                                    </div>
                                    <div className="col-md-8 input">
                                        <TextField
                                            type="password"
                                            margin="normal"
                                            variant="outlined"
                                            className="text"
                                            name = "confirm_password"
                                            onChange = {props.updateInput}
                                            value = {props.usersInput.confirm_password}
                                            disabled = {props.submit}
                                            error = {props.responseMessage.confirm_password.error}
                                            helperText = {props.responseMessage.confirm_password.message}
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
                        onClick={(event:any) => props.submitForm(event,"add")} 
                        color="primary" 
                        variant="contained"
                        disabled={props.submit}
                        form="submit-edit-form"
                    >  
                        <Save />
                        Submit
                        <CircularProgress style={{display: !props.submit ? 'none' : 'unset' }} className="product-circular-progress"/>
                    </Button>
                    <Button onClick={() =>props.setModalAdd(false)} color="secondary" variant="contained">
                        <Close />   
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        : null
    );
}

export default Add;