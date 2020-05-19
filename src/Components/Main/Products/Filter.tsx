import { TableRow, TableCell, Popper, Paper, TextField, Button, FormControl, Select, MenuItem, InputLabel } from "@material-ui/core"
import React, { useState } from "react";
import { DatePicker } from "@material-ui/pickers";
import moment from "moment";
import {Filter as Filterer,ProductsParams,Products} from "Redux/Actions";
import {useDispatch,useSelector} from 'react-redux';

const Filter = (props:any):any => {


    const dispatch = useDispatch();
    const products = useSelector( (state:any) => state.Products);


    type control =  "supplier" | "product" | 
                    "product_description" | 
                    "supplier_name" | "category" | 
                    "serial_number" | "warranty" | 
                    "warranty_start" | "warranty_end" | 
                    "status" | "delivery_date" | 
                    "reference_delivery_document" | 
                    "created_by" | "remarks";

    type action = "close" | "open";
    type submit = "clear" | "filter";

    React.useEffect(()=>{
        if(!products.filter){
            reset();
        }
    },[products.filter]);

    const ref:any = {
        supplier            : React.useRef(null),
        product             : React.useRef(null),
        product_description : React.useRef(null),
        supplier_name       : React.useRef(null),
        category            : React.useRef(null),
        serial_number       : React.useRef(null),
        warranty            : React.useRef(null),
        warranty_start      : React.useRef(null),
        warranty_end        : React.useRef(null),
        status              : React.useRef(null),
        delivery_date       : React.useRef(null),
        reference_delivery_document : React.useRef(null),
        created_by          : React.useRef(null),
        remarks             : React.useRef(null),

    };

    const [popper,setPopper] = useState({
        supplier            : null,
        product             : null,
        product_description : null,
        supplier_name       : null,
        category            : null,
        serial_number       : null,
        warranty            : null,
        warranty_start      : null,
        warranty_end        : null,
        status              : null,
        delivery_date       : null,
        reference_delivery_document : null,
        created_by          : null,
        remarks             : null,
    });

    const reset = () => {
        
        let a = popper;
        a.supplier              = null;
        a.product               = null;
        a.product_description   = null;
        a.supplier_name         = null;
        a.category              = null;
        a.serial_number         = null;
        a.warranty              = null;
        a.warranty_end          = null;
        a.warranty_start        = null;
        a.warranty_end          = null;
        a.status                = null;
        a.delivery_date         = null;
        a.reference_delivery_document = null;
        a.created_by            = null;
        a.remarks               = null;
        setPopper(a);
    }
    
    const controller = (event:any,control:control,action:action) => {
        reset();
        
        if(action === "open"){
            setPopper({
                ...popper,
                [control] : event.currentTarget,
            })
        }else{
            setPopper({
                ...popper,
                [control] : null,
            })
        }
    }

    const setText=(event:any) =>{
        dispatch(ProductsParams({
            ...products.params,
            filter : {
                ...products.params.filter,
                [event.target.name] : {
                    ...products.params.filter[event.target.name],
                    key : event.target.value,
                }
            }
        }));
    }

    const setFilterControl=(event:any) =>{
        dispatch(ProductsParams({
            ...products.params,
            filter : {
                ...products.params.filter,
                [event.target.name] : {
                    ...products.params.filter[event.target.name],
                    filter : event.target.value,
                }
            }
        }));
    }

    const submitFilter = async (action:submit,control:control) =>{
        dispatch(ProductsParams({
            ...products.params,
            per_page    : 10,
            page        : 1,
        }));
       

        if(action === "filter"){
            reset();
            if(products.params.filter[control].key !== ''){
                dispatch(Products());
            }
        }else{
            if(products.params.filter[control].key !== ''){
                dispatch(ProductsParams({
                    ...products.params,
                    filter : {
                        ...products.params.filter,
                        [control] : {
                            ...products.params.filter[control],
                            key : '',
                        }
                    }
                }));
                dispatch(Products());
            }else{
                setPopper({
                    ...popper,
                    [control] : null,
                })
            }
        }
    }

    const onKey = (e:any) => {

        if(e.key === "Backspace"){
            if(e.target.value.length === 1){
                dispatch(ProductsParams({
                    ...products.params,
                    filter : {
                        ...products.params.filter,
                        [e.target.name] : {
                            ...products.params.filter[e.target.name],
                            key : '',
                        }
                    }
                }));
            }
        }

        if(e.key === 'Enter'){
            if(e.target.value !== ''){
                reset();
                ref[e.target.name].current.blur();
                dispatch(Products());
            }
        }
    }


    return(
        products.filter ?
            <TableRow>
                <TableCell align="center" className="filter" hidden={!products.table.supplier_code.show}>
                    <TextField
                        
                        className="input"
                        autoComplete="off"
                        margin="normal"
                        variant="outlined"
                        name = "supplier"
                        value = {products.params.filter.supplier.key}
                        onChange = {setText}
                        onFocus = {(event)=>controller(event,"supplier","open")}
                        onKeyDown = {onKey}
                        inputRef = {ref.supplier}
                    />
                    
                    <Popper className="text-center" id={Boolean(popper.supplier)? "simple-popper" : undefined} open={Boolean(popper.supplier)} anchorEl={popper.supplier}>
                        <Paper className="popper-paper">
                            <FormControl variant="outlined" className="selector">
                                <Select
                                    value={products.params.filter.supplier.filter}
                                    onChange={setFilterControl}
                                    name = "supplier"
                                >
                                    <MenuItem value="iet" selected>Is Equal To </MenuItem>
                                    <MenuItem value="inet">Is Not Equal To</MenuItem>
                                    <MenuItem value="c">Contains</MenuItem>
                                    <MenuItem value="dnc">Does not Contains</MenuItem>
                                    <MenuItem value="sw">Starts With</MenuItem>
                                    <MenuItem value="ew">Ends With</MenuItem>
                                </Select>
                            </FormControl>
                            
                            <Button variant="contained" color="primary" onClick={()=>submitFilter("clear","supplier")}>
                                {products.params.filter.supplier.key === '' ?'Close' : 'Clear'}
                            </Button>
                            <Button variant="contained" color="secondary" onClick={()=>submitFilter("filter","supplier")} disabled={products.params.filter.supplier.key === ''}>
                                Filter
                            </Button>
                        </Paper>
                    </Popper>
                </TableCell>

                <TableCell align="center" className="filter" hidden={!products.table.supplier_name.show}>
                    <TextField
                        
                        className="input"
                        autoComplete="off"
                        margin="normal"
                        variant="outlined"
                        name = "supplier_name"
                        value = {products.params.filter.supplier_name.key}
                        onChange = {setText}
                        onFocus = {(event)=>controller(event,"supplier_name","open")}
                        onKeyDown = {onKey}
                        inputRef = {ref.supplier_name}
                    />
                    
                    <Popper className="text-center" id={Boolean(popper.supplier_name)? "simple-popper" : undefined} open={Boolean(popper.supplier_name)} anchorEl={popper.supplier_name}>
                        <Paper className="popper-paper">
                            <FormControl variant="outlined" className="selector">
                                <Select
                                    value={products.params.filter.supplier_name.filter}
                                    onChange={setFilterControl}
                                    name = "supplier_name"
                                >
                                    <MenuItem value="iet" selected>Is Equal To </MenuItem>
                                    <MenuItem value="inet">Is Not Equal To</MenuItem>
                                    <MenuItem value="c">Contains</MenuItem>
                                    <MenuItem value="dnc">Does not Contains</MenuItem>
                                    <MenuItem value="sw">Starts With</MenuItem>
                                    <MenuItem value="ew">Ends With</MenuItem>
                                </Select>
                            </FormControl>
                            <Button variant="contained" color="primary" onClick={()=>submitFilter("clear","supplier_name")}>
                                {products.params.filter.supplier_name.key === '' ?'Close' : 'Clear'}
                            </Button>
                            <Button variant="contained" color="secondary" onClick={()=>submitFilter("filter","supplier_name")} disabled={products.params.filter.supplier_name.key === ''}>
                                Filter
                            </Button>
                        </Paper>
                    </Popper>
                </TableCell>

                <TableCell align="center" className="filter" hidden={!products.table.product_code.show}>
                    
                    <TextField
                        
                        className="input"
                        autoComplete="off"
                        margin="normal"
                        variant="outlined"
                        name = "product"
                        value = {products.params.filter.product.key}
                        onChange = {setText}
                        onFocus = {(event)=>controller(event,"product","open")}
                        onKeyDown = {onKey}
                        inputRef = {ref.product}
                    />
                    
                    <Popper className="text-center" id={Boolean(popper.product)? "simple-popper" : undefined} open={Boolean(popper.product)} anchorEl={popper.product}>
                        <Paper className="popper-paper">
                            <FormControl variant="outlined" className="selector">
                                <Select
                                    value={products.params.filter.product.filter}
                                    onChange={setFilterControl}
                                    name = "product"
                                >
                                    <MenuItem value="iet" selected>Is Equal To </MenuItem>
                                    <MenuItem value="inet">Is Not Equal To</MenuItem>
                                    <MenuItem value="c">Contains</MenuItem>
                                    <MenuItem value="dnc">Does not Contains</MenuItem>
                                    <MenuItem value="sw">Starts With</MenuItem>
                                    <MenuItem value="ew">Ends With</MenuItem>
                                </Select>
                            </FormControl>
                            <Button variant="contained" color="primary" onClick={()=>submitFilter("clear","product")}>
                                {products.params.filter.product.key === '' ?'Close' : 'Clear'}
                            </Button>
                            <Button variant="contained" color="secondary" onClick={()=>submitFilter("filter","product")} disabled={products.params.filter.product.key === ''}>
                                Filter
                            </Button>
                        </Paper>
                    </Popper>

                </TableCell>
                
                <TableCell align="center" className="filter" hidden={!products.table.product_name.show}>
                    <TextField
                        
                        className="input"
                        autoComplete="off"
                        margin="normal"
                        variant="outlined"
                        name = "product_description"
                        value = {products.params.filter.product_description.key}
                        onChange = {setText}
                        onFocus = {(event)=>controller(event,"product_description","open")}
                        onKeyDown = {onKey}
                        inputRef = {ref.product_description}
                    />
                    
                    <Popper className="text-center" id={Boolean(popper.product_description)? "simple-popper" : undefined} open={Boolean(popper.product_description)} anchorEl={popper.product_description}>
                        <Paper className="popper-paper">
                            <FormControl variant="outlined" className="selector">
                                <Select
                                    value={products.params.filter.product_description.filter}
                                    onChange={setFilterControl}
                                    name = "product_description"
                                >
                                    <MenuItem value="iet" selected>Is Equal To </MenuItem>
                                    <MenuItem value="inet">Is Not Equal To</MenuItem>
                                    <MenuItem value="c">Contains</MenuItem>
                                    <MenuItem value="dnc">Does not Contains</MenuItem>
                                    <MenuItem value="sw">Starts With</MenuItem>
                                    <MenuItem value="ew">Ends With</MenuItem>
                                </Select>
                            </FormControl>
                            <Button variant="contained" color="primary" onClick={()=>submitFilter("clear","product_description")}>
                                {products.params.filter.product_description.key === '' ?'Close' : 'Clear'}
                            </Button>
                            <Button variant="contained" color="secondary" onClick={()=>submitFilter("filter","product_description")} disabled={products.params.filter.product_description.key === ''}>
                                Filter
                            </Button>
                        </Paper>
                    </Popper>
                </TableCell>

                <TableCell align="center" className="filter" hidden={!products.table.category.show}>
                    <TextField
                        
                        className="input"
                        autoComplete="off"
                        margin="normal"
                        variant="outlined"
                        name = "category"
                        value = {products.params.filter.category.key}
                        onChange = {setText}
                        onFocus = {(event)=>controller(event,"category","open")}
                        onKeyDown = {onKey}
                        inputRef = {ref.category}
                    />
                    
                    <Popper className="text-center" id={Boolean(popper.category)? "simple-popper" : undefined} open={Boolean(popper.category)} anchorEl={popper.category}>
                        <Paper className="popper-paper">
                            <FormControl variant="outlined" className="selector">
                                <Select
                                    value={products.params.filter.category.filter}
                                    onChange={setFilterControl}
                                    name = "category"
                                >
                                    <MenuItem value="iet" selected>Is Equal To </MenuItem>
                                    <MenuItem value="inet">Is Not Equal To</MenuItem>
                                    <MenuItem value="c">Contains</MenuItem>
                                    <MenuItem value="dnc">Does not Contains</MenuItem>
                                    <MenuItem value="sw">Starts With</MenuItem>
                                    <MenuItem value="ew">Ends With</MenuItem>
                                </Select>
                            </FormControl>
                            <Button variant="contained" color="primary" onClick={()=>submitFilter("clear","category")}>
                                {products.params.filter.category.key === '' ?'Close' : 'Clear'}
                            </Button>
                            <Button variant="contained" color="secondary" onClick={()=>submitFilter("filter","category")} disabled={products.params.filter.category.key === ''}>
                                Filter
                            </Button>
                        </Paper>
                    </Popper>
                </TableCell>
                
                <TableCell align="center" className="filter" hidden={!products.table.serial.show}>
                    <TextField
                        
                        className="input"
                        autoComplete="off"
                        margin="normal"
                        variant="outlined"
                        name = "serial_number"
                        value = {products.params.filter.serial_number.key}
                        onChange = {setText}
                        onFocus = {(event)=>controller(event,"serial_number","open")}
                        onKeyDown = {onKey}
                        inputRef = {ref.serial_number}
                    />
                    
                    <Popper className="text-center" id={Boolean(popper.serial_number)? "simple-popper" : undefined} open={Boolean(popper.serial_number)} anchorEl={popper.serial_number}>
                        <Paper className="popper-paper">
                            <FormControl variant="outlined" className="selector">
                                <Select
                                    value={products.params.filter.serial_number.filter}
                                    onChange={setFilterControl}
                                    name = "serial_number"
                                >
                                    <MenuItem value="iet" selected>Is Equal To </MenuItem>
                                    <MenuItem value="inet">Is Not Equal To</MenuItem>
                                    <MenuItem value="c">Contains</MenuItem>
                                    <MenuItem value="dnc">Does not Contains</MenuItem>
                                    <MenuItem value="sw">Starts With</MenuItem>
                                    <MenuItem value="ew">Ends With</MenuItem>
                                </Select>
                            </FormControl>
                            <Button variant="contained" color="primary" onClick={()=>submitFilter("clear","serial_number")}>
                                {products.params.filter.serial_number.key === '' ?'Close' : 'Clear'}                        
                            </Button>
                            <Button variant="contained" color="secondary" onClick={()=>submitFilter("filter","serial_number")} disabled={products.params.filter.serial_number.key === ''}>
                                Filter
                            </Button>
                        </Paper>
                    </Popper>
                </TableCell>
                
                <TableCell align="center" className="filter" hidden={!products.table.warranty.show}>
                    <TextField
                        
                        className="input"
                        autoComplete="off"
                        margin="normal"
                        variant="outlined"
                        type = "number"
                        name = "warranty"
                        value = {products.params.filter.warranty.key}
                        onChange = {setText}
                        onFocus = {(event)=>controller(event,"warranty","open")}
                        onKeyDown = {onKey}
                        inputRef = {ref.warranty}
                    />
                    
                    <Popper className="text-center" id={Boolean(popper.warranty)? "simple-popper" : undefined} open={Boolean(popper.warranty)} anchorEl={popper.warranty}>
                        <Paper className="popper-paper">
                            <FormControl variant="outlined" className="selector">
                                <Select
                                    value={products.params.filter.warranty.filter}
                                    onChange={setFilterControl}
                                    name = "warranty"
                                >
                                    <MenuItem value="iet" selected>Is Equal To </MenuItem>
                                    <MenuItem value="inet">Is Not Equal To</MenuItem>
                                    <MenuItem value="c">Contains</MenuItem>
                                    <MenuItem value="dnc">Does not Contains</MenuItem>
                                    <MenuItem value="sw">Starts With</MenuItem>
                                    <MenuItem value="ew">Ends With</MenuItem>
                                </Select>
                            </FormControl>
                            <Button variant="contained" color="primary" onClick={()=>submitFilter("clear","warranty")}>
                                {products.params.filter.warranty.key === '' ?'Close' : 'Clear'}                                                    
                            </Button>
                            <Button variant="contained" color="secondary" onClick={()=>submitFilter("filter","warranty")} disabled={products.params.filter.warranty.key === ''}>
                                Filter
                            </Button>
                        </Paper>
                    </Popper>
                </TableCell>
                
                <TableCell align="center" className="filter" hidden={!products.table.warranty_start.show}>
                    <DatePicker
                        format="yyyy/MM/dd"
                        allowKeyboardControl
                        animateYearScrolling
                        variant = "dialog"
                        className="input"
                        onChange = {(event) => dispatch(ProductsParams({
                                ...products.params,
                                filter : {
                                    ...products.params.filter,
                                    warranty_start : {
                                        ...products.params.filter['warranty_start'],
                                        key : moment(event).format("YYYY-MM-DD"),
                                    }
                                }
                            }))
                        }
                        value = {products.params.filter.warranty_start.key === '' ? null : moment(products.params.filter.warranty_start.key).format()}
                        onFocus = {(event)=>controller(event,"warranty_start","open")}
                        // cancelLabel = {<Button>Cancel</Button>}
                        // okLabel = {<Button>OK</Button>}
                        inputVariant="outlined"
                    />


                    
                    <Popper className="text-center" id={Boolean(popper.warranty_start)? "simple-popper" : undefined} open={Boolean(popper.warranty_start)} anchorEl={popper.warranty_start}>
                        <Paper className="popper-paper">
                            <FormControl variant="outlined" className="selector">
                                <Select
                                    value={products.params.filter.warranty_start.filter}
                                    onChange={setFilterControl}
                                    name = "warranty_start"
                                >
                                    <MenuItem value="iet" selected>Is Equal To </MenuItem>
                                    <MenuItem value="inet">Is Not Equal To</MenuItem>
                                    <MenuItem value="c">Contains</MenuItem>
                                    <MenuItem value="dnc">Does not Contains</MenuItem>
                                    <MenuItem value="sw">Starts With</MenuItem>
                                    <MenuItem value="ew">Ends With</MenuItem>
                                </Select>
                            </FormControl>
                            <Button variant="contained" color="primary" onClick={()=>submitFilter("clear","warranty_start")}>
                                {products.params.filter.warranty_start.key === '' ?'Close' : 'Clear'}                             
                            </Button>
                            <Button variant="contained" color="secondary" onClick={()=>submitFilter("filter","warranty_start")} disabled={products.params.filter.warranty_start.key === '' }>
                                Filter
                            </Button>
                        </Paper>
                    </Popper>
                </TableCell>
                
                <TableCell align="center" className="filter" hidden={!products.table.warranty_end.show}>
                    <DatePicker
                        format="yyyy/MM/dd"
                        allowKeyboardControl
                        animateYearScrolling
                        variant = "dialog"
                        className="input"
                        onChange = {(event) => dispatch(ProductsParams({
                                    ...products.params,
                                    filter : {
                                        ...products.params.filter,
                                        warranty_end : {
                                            ...products.params.filter['warranty_end'],
                                            key : moment(event).format("YYYY-MM-DD"),
                                        }
                                    }
                                })
                            )}
                        value = {products.params.filter.warranty_end.key === '' ? null : moment(products.params.filter.warranty_end.key).format()}
                        onFocus = {(event)=>controller(event,"warranty_end","open")}
                        // onKeyDown = {onKey}
                        inputVariant="outlined"
                    />
                    <Popper className="text-center" id={Boolean(popper.warranty_end)? "simple-popper" : undefined} open={Boolean(popper.warranty_end)} anchorEl={popper.warranty_end}>
                        <Paper className="popper-paper">
                            <FormControl variant="outlined" className="selector">
                                <Select
                                    value={products.params.filter.warranty_end.filter}
                                    onChange={setFilterControl}
                                    name = "warranty_end"
                                >
                                    <MenuItem value="iet" selected>Is Equal To </MenuItem>
                                    <MenuItem value="inet">Is Not Equal To</MenuItem>
                                    <MenuItem value="c">Contains</MenuItem>
                                    <MenuItem value="dnc">Does not Contains</MenuItem>
                                    <MenuItem value="sw">Starts With</MenuItem>
                                    <MenuItem value="ew">Ends With</MenuItem>
                                </Select>
                            </FormControl>
                            <Button variant="contained" color="primary" onClick={()=>submitFilter("clear","warranty_end")}>
                                {products.params.filter.warranty_end.key === '' ?'Close' : 'Clear'}
                            </Button>
                            <Button variant="contained" color="secondary" onClick={()=>submitFilter("filter","warranty_end")} disabled={products.params.filter.warranty_end.key === '' }>
                                Filter
                            </Button>
                        </Paper>
                    </Popper>
                </TableCell>
                
                <TableCell align="center" className="filter" hidden={!products.table.status.show}>
                    {/* <FormControl variant="outlined" style={{width:'100%'}}> */}
                        <TextField
                            value={products.params.filter.status.key}
                            onChange={setText}
                            name="status"
                            onFocus = {(event)=>controller(event,"status","open")}
                            variant="outlined"
                            select
                            className="input"
                        >
                            <MenuItem value={0}>All</MenuItem>
                            <MenuItem value={1}>New</MenuItem>
                            <MenuItem value={2}>Replaced</MenuItem>
                            <MenuItem value={3}>Returned</MenuItem>
                            <MenuItem value={4}>Repaired</MenuItem>                        
                        </TextField>
                    
                    {/* </FormControl> */}
                    <Popper className="text-center" id={Boolean(popper.status)? "simple-popper" : undefined} open={Boolean(popper.status)} anchorEl={popper.status}>
                        <Paper className="popper-paper">
                            <Button variant="contained" color="primary" onClick={()=>setPopper({...popper,status:null})}>
                                Close
                            </Button>
                            <Button variant="contained" color="secondary" onClick={()=>submitFilter("filter","status")}>
                                Filter
                            </Button>
                        </Paper>
                    </Popper>
                </TableCell>
      
                <TableCell align="center" className="filter" hidden={!products.table.delivery_date.show}>
                    <DatePicker
                        format="yyyy/MM/dd"
                        allowKeyboardControl
                        animateYearScrolling
                        variant = "dialog"
                        className="input"
                        inputVariant="outlined"
                        onChange = {(event) => dispatch(ProductsParams({
                                ...products.params,
                                filter : {
                                    ...products.params.filter,
                                    delivery_date : {
                                        ...products.params.filter['delivery_date'],
                                        key : moment(event).format("YYYY-MM-DD"),
                                    }
                                }
                            }))
                        }
                        value = {products.params.filter.delivery_date.key === '' ? null : moment(products.params.filter.delivery_date.key).format()}
                        onFocus = {(event)=>controller(event,"delivery_date","open")}
                    />


                    
                    <Popper className="text-center" id={Boolean(popper.delivery_date)? "simple-popper" : undefined} open={Boolean(popper.delivery_date)} anchorEl={popper.delivery_date}>
                        <Paper className="popper-paper">
                            <FormControl variant="outlined" className="selector">
                                <Select
                                    value={products.params.filter.delivery_date.filter}
                                    onChange={setFilterControl}
                                    name = "delivery_date"
                                >
                                    <MenuItem value="iet" selected>Is Equal To </MenuItem>
                                    <MenuItem value="inet">Is Not Equal To</MenuItem>
                                    <MenuItem value="c">Contains</MenuItem>
                                    <MenuItem value="dnc">Does not Contains</MenuItem>
                                    <MenuItem value="sw">Starts With</MenuItem>
                                    <MenuItem value="ew">Ends With</MenuItem>
                                </Select>
                            </FormControl>
                            <Button variant="contained" color="primary" onClick={()=>submitFilter("clear","delivery_date")}>
                                {products.params.filter.delivery_date.key === '' ?'Close' : 'Clear'}                             
                            </Button>
                            <Button variant="contained" color="secondary" onClick={()=>submitFilter("filter","delivery_date")} disabled={products.params.filter.delivery_date.key === '' }>
                                Filter
                            </Button>
                        </Paper>
                    </Popper>
                </TableCell>

                <TableCell align="center" className="filter" hidden={!products.table.reference_delivery_document.show}>
                    <TextField
                        
                        className="input"
                        autoComplete="off"
                        margin="normal"
                        variant="outlined"
                        name = "reference_delivery_document"
                        value = {products.params.filter.reference_delivery_document.key}
                        onChange = {setText}
                        onFocus = {(event)=>controller(event,"reference_delivery_document","open")}
                        onKeyDown = {onKey}
                        inputRef = {ref.reference_delivery_document}
                    />
                    
                    <Popper className="text-center" id={Boolean(popper.reference_delivery_document)? "simple-popper" : undefined} open={Boolean(popper.reference_delivery_document)} anchorEl={popper.reference_delivery_document}>
                        <Paper className="popper-paper">
                            <FormControl variant="outlined" className="selector">
                                <Select
                                    value={products.params.filter.reference_delivery_document.filter}
                                    onChange={setFilterControl}
                                    name = "reference_delivery_document"
                                >
                                    <MenuItem value="iet" selected>Is Equal To </MenuItem>
                                    <MenuItem value="inet">Is Not Equal To</MenuItem>
                                    <MenuItem value="c">Contains</MenuItem>
                                    <MenuItem value="dnc">Does not Contains</MenuItem>
                                    <MenuItem value="sw">Starts With</MenuItem>
                                    <MenuItem value="ew">Ends With</MenuItem>
                                </Select>
                            </FormControl>
                            <Button variant="contained" color="primary" onClick={()=>submitFilter("clear","reference_delivery_document")}>
                                {products.params.filter.reference_delivery_document.key === '' ?'Close' : 'Clear'}                        
                            </Button>
                            <Button variant="contained" color="secondary" onClick={()=>submitFilter("filter","reference_delivery_document")} disabled={products.params.filter.reference_delivery_document.key === ''}>
                                Filter
                            </Button>
                        </Paper>
                    </Popper>
                </TableCell>

                <TableCell align="center" className="filter" hidden={!products.table.created_by.show}>
                    <TextField
                        
                        className="input"
                        autoComplete="off"
                        margin="normal"
                        variant="outlined"
                        name = "created_by"
                        value = {products.params.filter.created_by.key}
                        onChange = {setText}
                        onFocus = {(event)=>controller(event,"created_by","open")}
                        onKeyDown = {onKey}
                        inputRef = {ref.created_by}
                    />
                    
                    <Popper className="text-center" id={Boolean(popper.created_by)? "simple-popper" : undefined} open={Boolean(popper.created_by)} anchorEl={popper.created_by}>
                        <Paper className="popper-paper">
                            <FormControl variant="outlined" className="selector">
                                <Select
                                    value={products.params.filter.created_by.filter}
                                    onChange={setFilterControl}
                                    name = "created_by"
                                >
                                    <MenuItem value="iet" selected>Is Equal To </MenuItem>
                                    <MenuItem value="inet">Is Not Equal To</MenuItem>
                                    <MenuItem value="c">Contains</MenuItem>
                                    <MenuItem value="dnc">Does not Contains</MenuItem>
                                    <MenuItem value="sw">Starts With</MenuItem>
                                    <MenuItem value="ew">Ends With</MenuItem>
                                </Select>
                            </FormControl>
                            <Button variant="contained" color="primary" onClick={()=>submitFilter("clear","created_by")}>
                                {products.params.filter.created_by.key === '' ?'Close' : 'Clear'}                        
                            </Button>
                            <Button variant="contained" color="secondary" onClick={()=>submitFilter("filter","created_by")} disabled={products.params.filter.created_by.key === ''}>
                                Filter
                            </Button>
                        </Paper>
                    </Popper>
                </TableCell>

                <TableCell align="center" className="filter" hidden={!products.table.remarks.show}>
                    <TextField
                        
                        className="input"
                        autoComplete="off"
                        margin="normal"
                        variant="outlined"
                        name = "remarks"
                        value = {products.params.filter.remarks.key}
                        onChange = {setText}
                        onFocus = {(event)=>controller(event,"remarks","open")}
                        onKeyDown = {onKey}
                        inputRef = {ref.remarks}
                    />
                    
                    <Popper className="text-center" id={Boolean(popper.remarks)? "simple-popper" : undefined} open={Boolean(popper.remarks)} anchorEl={popper.remarks}>
                        <Paper className="popper-paper">
                            <FormControl variant="outlined" className="selector">
                                <Select
                                    value={products.params.filter.remarks.filter}
                                    onChange={setFilterControl}
                                    name = "remarks"
                                >
                                    <MenuItem value="iet" selected>Is Equal To </MenuItem>
                                    <MenuItem value="inet">Is Not Equal To</MenuItem>
                                    <MenuItem value="c">Contains</MenuItem>
                                    <MenuItem value="dnc">Does not Contains</MenuItem>
                                    <MenuItem value="sw">Starts With</MenuItem>
                                    <MenuItem value="ew">Ends With</MenuItem>
                                </Select>
                            </FormControl>
                            <Button variant="contained" color="primary" onClick={()=>submitFilter("clear","remarks")}>
                                {products.params.filter.remarks.key === '' ?'Close' : 'Clear'}                        
                            </Button>
                            <Button variant="contained" color="secondary" onClick={()=>submitFilter("filter","remarks")} disabled={products.params.filter.remarks.key === ''}>
                                Filter
                            </Button>
                        </Paper>
                    </Popper>
                </TableCell>
            </TableRow>
        : null
    );
}

export default Filter;