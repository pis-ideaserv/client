import React from 'react';
import { Dialog, DialogTitle, DialogContent, Paper, TextField, DialogActions, Button, CircularProgress } from '@material-ui/core';
import { DatePicker } from "@material-ui/pickers";
import { Close, Save, Today } from '@material-ui/icons';
import Select from 'react-select';
import {default as ProductCode} from '../Summary/Add';
import {Requests} from 'Services';
import AsyncCreatableSelect from 'react-select/async-creatable'
import AsyncSelect from 'react-select/async'



interface Add{
    modalAdd                    :   boolean,
    updateInput                 :   any,
    productInput                :   any,
    submit                      :   boolean,
    responseMessage             :   any,
    supplierState               :   any,
    setProductInput             :   any,
    params                      :   any,


    setModalAdd(a:boolean)      :   void,
    submitForm(a:any,b:string)  :   void,
}

type inputAsync = "product" | "supplier";

const Add = (props:Add) => {

    let status = [{
                    label : 'New',
                    value : 1,
                    target: {
                        name : 'status',
                        value : 1,
                    }
                },{
                    label : 'Replaced',
                    value : 2,
                    target: {
                        name : 'status',
                        value : 2,
                    }
                },{
                    label : 'Returned',
                    value : 3,
                    target: {
                        name : 'status',
                        value : 3,
                    }
                },{
                    label : 'Repaired',
                    value : 4,
                    target: {
                        name : 'status',
                        value : 4,
                    }
                }
            ];

    const productCodeRequest:any = React.useRef();
    const supplierRequest:any = React.useRef();
    const statusRequest:any = React.useRef();
    const [openAddProduct, setOpenAddProduct] = React.useState(false);

    React.useEffect( () => {
        if(props.modalAdd){
        }
    },[props.modalAdd]);

    const loadOptions = async (inputValue:any,inputAsync:inputAsync) => {
        
        switch(inputAsync){
            case "product" :
                let company = await productCodeRequest.current.show({search:inputValue});

                return company.data.data.map((value:any)=>{
                    return{
                        value : value.id,
                        label : value.product_code,
                        target:{
                            value : value.id,
                            name : "product"
                        }
                    }
                });
            case "supplier" : 
                let model = await supplierRequest.current.show({search:inputValue});
                
                return model.data.data.map((value:any)=>{

                    return{
                        value : value.id,
                        label : value.supplier_code+" ("+value.supplier_name+")",
                        target:{
                            value : value.id,
                            name : "supplier"
                        }
                    }
                });
        }

        
    };


    const handleProductAdd = () => {
        setOpenAddProduct(!openAddProduct);
    }
    
    return(
        props.modalAdd ?
            <React.Fragment>
                <Requests.Suppliers request={supplierRequest} />
                <Requests.MasterCodes request={productCodeRequest} />
                <Requests.Status request={statusRequest} />
                <ProductCode open={openAddProduct} handleClose={handleProductAdd} />

                <Dialog
                    fullWidth
                    maxWidth="sm"
                    open={props.modalAdd}
                    onClose={ () =>props.setModalAdd(false) }
                    aria-labelledby="max-width-dialog-title"
                    className="dialog edit"
                >
                    <DialogTitle style={{textAlign:'center'}}>Add New Product</DialogTitle>
                    <DialogContent>

                        <Paper className="text-center">
                            <form className ="form-group" onSubmit={(event:any) => props.submitForm(event,"add")} id="submit-edit-form">
                                <div className="col-md-12">
                                    <div className="row align-items-center">
                                        <div className="col-md-4 title-input">
                                            Supplier
                                        </div>
                                        <div className="col-md-8 input">
                                            <AsyncSelect
                                                cacheOptions
                                                defaultOptions
                                                loadOptions={(inputValue)=>loadOptions(inputValue,"supplier")}
                                                classNamePrefix="select"
                                                className="select-container"
                                                onChange = {props.updateInput}
                                            />
                                            <div hidden={!props.responseMessage.supplier.error} className="select-error-message">{props.responseMessage.supplier.message}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="row align-items-center">
                                        <div className="col-md-4 title-input">
                                            Product Code
                                        </div>
                                        <div className="col-md-8 input">
                                            <AsyncCreatableSelect
                                                cacheOptions
                                                defaultOptions
                                                loadOptions={(inputValue)=>loadOptions(inputValue,"product")}
                                                onCreateOption = {handleProductAdd}
                                                classNamePrefix="select"
                                                className="select-container"
                                                onChange = {props.updateInput}
                                            />
                                            <div hidden={!props.responseMessage.product.error} className="select-error-message">{props.responseMessage.product.message}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="row align-items-center">
                                        <div className="col-md-4 title-input">
                                            Serial Number
                                        </div>
                                        <div className="col-md-8 input">
                                            <TextField
                                                margin="normal"
                                                variant="outlined"
                                                className="text"
                                                name = "serial_number"
                                                onChange = {props.updateInput}
                                                value = {props.productInput.serial_number}
                                                disabled = {props.submit}
                                                required
                                                error = {props.responseMessage.serial_number.error}
                                                helperText = {props.responseMessage.serial_number.message}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="row align-items-center">
                                        <div className="col-md-4 title-input">
                                            Status
                                        </div>
                                        <div className="col-md-8 input">
                                            <Select
                                                options={status}
                                                // isClearable
                                                name = 'status'
                                                // defaultValue = {options[0]}
                                                onChange = {props.updateInput}
                                                isDisabled = {props.submit}
                                                className={props.responseMessage.status.error? "select error" : "" }
                                                required
                                            />

                                            <div hidden={!props.responseMessage.status.error} className="select-error-message">{props.responseMessage.status.message}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="row align-items-center">
                                        <div className="col-md-4 title-input">
                                            Delivery Date
                                        </div>
                                        <div className="col-md-8 input svg">
                                            <DatePicker
                                                format="dd/MM/yyyy"
                                                allowKeyboardControl
                                                animateYearScrolling
                                                variant = "dialog"
                                                className = "date"
                                                onChange = {(event) => props.updateInput(event,"delivery_date")}
                                                value = {props.productInput.delivery_date}
                                                disabled = {props.submit}
                                                required
                                                error = {props.responseMessage.delivery_date.error}
                                                helperText = {props.responseMessage.delivery_date.message}
                                                // defaultValue={new Date()}
                                            />

                                            <Today color="primary" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="row align-items-center">
                                        <div className="col-md-4 title-input">
                                            Delivery Doc.
                                        </div>
                                        <div className="col-md-8 input">
                                            <TextField
                                                type="text"
                                                margin="normal"
                                                variant="outlined"
                                                className="text"
                                                name = "reference_delivery_document"
                                                onChange = {props.updateInput}
                                                value = {props.productInput.reference_delivery_document}
                                                disabled = {props.submit}
                                                required
                                                error = {props.responseMessage.reference_delivery_document.error}
                                                helperText = {props.responseMessage.reference_delivery_document.message}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="row align-items-center">
                                        <div className="col-md-4 title-input">
                                            Warranty(month)
                                        </div>
                                        <div className="col-md-8 input">
                                            <TextField
                                                type="number"
                                                margin="normal"
                                                variant="outlined"
                                                className="text"
                                                name = "warranty"
                                                onChange = {props.updateInput}
                                                value = {props.productInput.warranty}
                                                disabled = {props.submit}
                                                required
                                                error = {props.responseMessage.warranty.error}
                                                helperText = {props.responseMessage.warranty.message}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="row align-items-center">
                                        <div className="col-md-4 title-input">
                                            Warranty Start
                                        </div>
                                        <div className="col-md-8 input svg">
                                            <DatePicker
                                                format="dd/MM/yyyy"
                                                allowKeyboardControl
                                                animateYearScrolling
                                                variant = "dialog"
                                                className = "date"
                                                onChange = {(event) => props.updateInput(event,"warranty_start")}
                                                value = {props.productInput.warranty_start}
                                                // minDate = {new Date(props.productInput.delivery_date)}
                                                disabled = {props.submit}
                                                required
                                                error = {props.responseMessage.warranty_start.error}
                                                helperText = {props.responseMessage.warranty_start.message}
                                            />

                                            <Today color="primary" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="row align-items-center">
                                        <div className="col-md-4 title-input">
                                            Remarks
                                        </div>
                                        <div className="col-md-8 input">
                                            <TextField
                                                // type="number"
                                                margin="normal"
                                                variant="outlined"
                                                className="text"
                                                name = "remarks"
                                                onChange = {props.updateInput}
                                                value = {props.productInput.remarks}
                                                disabled = {props.submit}
                                                required
                                                error = {props.responseMessage.remarks.error}
                                                helperText = {props.responseMessage.remarks.message}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <input type="submit" style={{display:'none'}} />
                            </form>
                        </Paper>

                    </DialogContent>
                    <DialogActions>

                        <Button onClick={() =>props.setModalAdd(false)} color="secondary" variant="contained">
                            <Close />   
                            Cancel
                        </Button>

                        <Button 
                            onClick={(event:any) => props.submitForm(event,"add")} 
                            color="primary" 
                            variant="contained"
                            disabled={props.submit}
                            form="submit-edit-form"
                        >  
                            <Save />
                            Submit
                            <CircularProgress style={{display: !props.submit ? 'none' : 'unset' }} className="submit-progress"/>
                        </Button>
                    
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        : null
    );
}

export default Add;