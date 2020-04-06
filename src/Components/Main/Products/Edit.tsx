// import React from 'react';
// import { Dialog, DialogTitle, DialogContent, Paper, TextField, DialogActions, Button, CircularProgress, Fab } from '@material-ui/core';
// import { DatePicker } from "@material-ui/pickers";
// import { Close, Save } from '@material-ui/icons';
// import Select from 'react-select';
// import AddIcon from '@material-ui/icons/Add';
// import {useSelector} from 'react-redux';
// import {default as ProductCode} from '../Summary/Add';


// interface Edit{
//     modalEdit       : boolean,
//     updateInput     : any,
//     submit          : boolean,
//     responseMessage : any,
//     product         : any,
//     productInput    : any
//     params          :   any,

    
//     submitForm(a:any, b:string) : void,
//     setModalEdit(a:boolean) : void,
// }

// const styles = {
//     select : {
//         fontSize: '0.75rem',
//         color   : '#f11111',
//     }
// }

// const buttonStyle = {
//     transform: 'scale(0.7)',
//     marginLeft: '-30px',
//     outline: 'none'
// }

// const Edit = (props:Edit) => {


//     const productCode = useSelector( (state:any) => state.MasterCodes.data.data);
//     // const [productOption, setProductOption] = React.useState();
//     const [openAddProduct, setOpenAddProduct] = React.useState(false);


//     React.useEffect( () => {
//         if(productCode && props.modalEdit){
//             initProduct();
//         }
//     },[productCode,props]);

//     const initProduct = () => {
//         let opt = productCode.data.map((value:any) => {
//             return {
//                 label : value.product_code,
//                 value : value.id,
//                 target: {
//                     name  : 'product',
//                     value : value.id 
//                 }
//             }
//         })

//         setProductOption(opt);
//     }



//     const handleProductAdd = () => {
//         setOpenAddProduct(!openAddProduct);
//     }



//     const productOption = async() =>{

//     }


 

//     if(props.product && productOption){
        

//         return(
//             <React.Fragment>
//                <ProductCode open={openAddProduct} handleClose={handleProductAdd} per_page={props.params.per_page} page={props.params.page} />
//                 <Dialog
//                     fullWidth
//                     maxWidth="sm"
//                     open={props.modalEdit}
//                     onClose={ () =>props.setModalEdit(false) }
//                     aria-labelledby="max-width-dialog-title"
//                 >
//                     <DialogTitle id="max-width-dialog-title" style={{textAlign:'center'}}>Edit Product Details</DialogTitle>
//                     <DialogContent>

//                         <Paper className="text-center">
//                             <form className ="form-group" onSubmit={(event:any) => props.submitForm(event,"edit")} id="submit-edit-form">
//                                 <div className="col-md-12">
//                                     <div className="row align-items-center">
//                                         <div className="col-md-4 font-bolder">
//                                             Supplier
//                                         </div>
//                                         <div className="col-md-8">
//                                             {/* <Select
//                                                 options={options}
//                                                 // isClearable
//                                                 name = 'supplier'
//                                                 defaultValue = {options.find((element:any) => element.value === props.productInput.supplier)}
//                                                 onChange = {props.updateInput}
//                                                 isDisabled = {props.submit}
//                                                 required
//                                             /> */}
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-12">
//                                     <div className="row align-items-center" style={{position:'relative'}}>
//                                         <div className="col-md-4 font-bolder">
//                                             Product Code
//                                         </div>
//                                         <div className="col-md-7">
//                                             <Select
//                                                 options={productOption}
//                                                 // isClearable
//                                                 name = 'product'
//                                                 defaultValue = {productOption? productOption.find((element:any) => element.value === props.productInput.product): ''}
//                                                 onChange = {props.updateInput}
//                                                 isDisabled = {props.submit}
//                                                 className={props.responseMessage.product.error? "select-error" : "" }
//                                                 required
//                                             />
//                                             <div hidden={!props.responseMessage.product.error} style = {styles.select}>{props.responseMessage.product.message}</div>
//                                         </div>
//                                         <div className="col-md-1">
//                                             <Fab color="primary" aria-label="add" style={buttonStyle} onClick = {handleProductAdd}>
//                                                 <AddIcon />
//                                             </Fab>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-12">
//                                     <div className="row align-items-center">
//                                         <div className="col-md-4 font-bolder">
//                                             Serial Number
//                                         </div>
//                                         <div className="col-md-8">
//                                             <TextField
//                                                 margin="normal"
//                                                 variant="outlined"
//                                                 className="full-width product-reduce-margin-text"
//                                                 name = "serial_number"
//                                                 onChange = {props.updateInput}
//                                                 value = {props.productInput.serial_number}
//                                                 disabled = {props.submit}
//                                                 required
//                                                 error = {props.responseMessage.serial_number.error}
//                                                 helperText = {props.responseMessage.serial_number.message}
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                                 {/* <div className="col-md-12">
//                                     <div className="row align-items-center">
//                                         <div className="col-md-4 font-bolder">
//                                             Status
//                                         </div>
//                                         <div className="col-md-8">
//                                             <Select
//                                                 options={status}
//                                                 // isClearable
//                                                 name = 'status'
//                                                 defaultValue = {status.find((element:any) => element.value === props.productInput.status)}
//                                                 onChange = {props.updateInput}
//                                                 isDisabled = {props.submit}
//                                                 className={props.responseMessage.status.error? "select-error" : "" }
//                                                 required
//                                             />
//                                             <div hidden={!props.responseMessage.status.error} style = {styles.select}>{props.responseMessage.status.message}</div>
//                                         </div>
//                                     </div>
//                                 </div> */}
//                                 <div className="col-md-12">
//                                     <div className="row align-items-center">
//                                         <div className="col-md-4 font-bolder">
//                                             Delivery Date
//                                         </div>
//                                         <div className="col-md-8">
//                                             <DatePicker
//                                                 format="dd/MM/yyyy"
//                                                 allowKeyboardControl
//                                                 animateYearScrolling
//                                                 variant = "dialog"
//                                                 className = "full-width product-reduce-margin-text"
//                                                 onChange = {(event) => props.updateInput(event,"delivery_date")}
//                                                 value = {props.productInput.delivery_date}
//                                                 disabled = {props.submit}
//                                                 required
//                                                 error = {props.responseMessage.delivery_date.error}
//                                                 helperText = {props.responseMessage.delivery_date.message}
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-12">
//                                     <div className="row align-items-center">
//                                         <div className="col-md-4 font-bolder">
//                                             Delivery Doc
//                                         </div>
//                                         <div className="col-md-8">
//                                             <TextField
//                                                 type="text"
//                                                 margin="normal"
//                                                 variant="outlined"
//                                                 className="full-width product-reduce-margin-text"
//                                                 name = "reference_delivery_document"
//                                                 onChange = {props.updateInput}
//                                                 value = {props.productInput.reference_delivery_document}
//                                                 disabled = {props.submit}
//                                                 required
//                                                 error = {props.responseMessage.reference_delivery_document.error}
//                                                 helperText = {props.responseMessage.reference_delivery_document.message}
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-12">
//                                     <div className="row align-items-center">
//                                         <div className="col-md-4 font-bolder">
//                                             Warranty(month)
//                                         </div>
//                                         <div className="col-md-8">
//                                             <TextField
//                                                 type="number"
//                                                 margin="normal"
//                                                 variant="outlined"
//                                                 className="full-width product-reduce-margin-text"
//                                                 name = "warranty"
//                                                 onChange = {props.updateInput}
//                                                 value = {props.productInput.warranty}
//                                                 disabled = {props.submit}
//                                                 required
//                                                 error = {props.responseMessage.warranty.error}
//                                                 helperText = {props.responseMessage.warranty.message}
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-12">
//                                     <div className="row align-items-center">
//                                         <div className="col-md-4 font-bolder">
//                                             Warranty Start
//                                         </div>
//                                         <div className="col-md-8">
//                                             <DatePicker
//                                                 format="dd/MM/yyyy"
//                                                 allowKeyboardControl
//                                                 animateYearScrolling
//                                                 variant = "dialog"
//                                                 className = "full-width product-reduce-margin-text"
//                                                 onChange = {(event) => props.updateInput(event,"warranty_start")}
//                                                 value = {props.productInput.warranty_start}
//                                                 // minDate = {new Date(props.productInput.delivery_date)}
//                                                 disabled = {props.submit}
//                                                 required
//                                                 error = {props.responseMessage.warranty_start.error}
//                                                 helperText = {props.responseMessage.warranty_start.message}
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-12">
//                                     <div className="row align-items-center">
//                                         <div className="col-md-4 font-bolder">
//                                             Remarks
//                                         </div>
//                                         <div className="col-md-8">
//                                             <TextField
//                                                 // type="number"
//                                                 margin="normal"
//                                                 variant="outlined"
//                                                 className="full-width product-reduce-margin-text"
//                                                 name = "remarks"
//                                                 onChange = {props.updateInput}
//                                                 value = {props.productInput.remarks}
//                                                 disabled = {props.submit}
//                                                 required
//                                                 error = {props.responseMessage.remarks.error}
//                                                 helperText = {props.responseMessage.remarks.message}
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <input type="submit" style={{display:'none'}} />
//                             </form>
//                         </Paper>

//                     </DialogContent>
//                     <DialogActions className="product-modal-footer">
                        
//                         <Button 
//                             onClick={(event:any) => props.submitForm(event,"edit")} 
//                             color="primary" 
//                             variant="contained"
//                             disabled={props.submit}
//                             form="submit-edit-form"
//                         >  
//                             <Save />
//                             Submit
//                             <CircularProgress style={{display: !props.submit ? 'none' : 'unset' }} className="product-circular-progress"/>
//                         </Button>
//                         <Button onClick={() =>props.setModalEdit(false)} color="secondary" variant="contained">
//                             <Close />   
//                             Cancel
//                         </Button>
//                     </DialogActions>
//                 </Dialog>
//             </React.Fragment>
//         );
//     }else{
//         return null;
//     }
// }

// export default Edit;




import React from 'react';
import { Dialog, DialogTitle, DialogContent, Paper, TextField, DialogActions, Button, CircularProgress, Fab } from '@material-ui/core';
import { DatePicker } from "@material-ui/pickers";
import { Close, Save, Today } from '@material-ui/icons';
import Select from 'react-select';
import AddIcon from '@material-ui/icons/Add';
import {useSelector} from 'react-redux';
import {default as ProductCode} from '../Summary/Add';
import {Requests} from 'Services';
import AsyncCreatableSelect from 'react-select/async-creatable'
import AsyncSelect from 'react-select/async'



interface Add{
    modalEdit       : boolean,
    updateInput     : any,
    submit          : boolean,
    responseMessage : any,
    product         : any,
    productInput    : any
    params          :   any,

    
    submitForm(a:any, b:string) : void,
    setModalEdit(a:boolean) : void,
}

type inputAsync = "product" | "supplier";

const Edit = (props:Add) => {

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

    
    const [preProduct,setPreProduct] = React.useState();
    const [preSupplier,setPreSupplier] = React.useState();



    React.useEffect(()=>{
        if(props.modalEdit){
            loadPreValues();
        }
    },[props.modalEdit]);

    const loadPreValues = async () => {
        let supplier = await supplierRequest.current.get(props.productInput.supplier);
        let product = await productCodeRequest.current.get(props.productInput.product);



        setPreSupplier({
            value : supplier.data.data.id,
            label : supplier.data.data.supplier_code+" ("+supplier.data.data.supplier_name+")",
            target : {
                value : supplier.data.data.id,
                name  : "supplier"
            }
        });
        
        setPreProduct({
            value : product.data.data.id,
            label : product.data.data.product_code,
            target : {
                value : product.data.data.id,
                name  : "product"
            }
        });

        
    }
    


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
        props.modalEdit ?
            <React.Fragment>
                <Requests.Suppliers request={supplierRequest} />
                <Requests.MasterCodes request={productCodeRequest} />
                <Requests.Status request={statusRequest} />
                <ProductCode open={openAddProduct} handleClose={handleProductAdd} />

                <Dialog
                    fullWidth
                    maxWidth="sm"
                    open={props.modalEdit}
                    onClose={ () =>props.setModalEdit(false) }
                    aria-labelledby="max-width-dialog-title"
                    className="dialog edit"
                >
                    <DialogTitle style={{textAlign:'center'}}>Edit Product Details</DialogTitle>
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
                                                value={preSupplier}
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
                                                value={preProduct}
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
                                                value = {status.find((element:any) => element.value === props.productInput.status)}
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

                        <Button onClick={() =>props.setModalEdit(false)} color="secondary" variant="contained">
                            <Close />   
                            Cancel
                        </Button>

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
                    
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        : null
    );
}

export default Edit;