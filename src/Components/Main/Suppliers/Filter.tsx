import { TableRow, TableCell, Popper, Paper, TextField, Button, FormControl, Select, MenuItem } from "@material-ui/core"
import React, { useState } from "react";
import {Filter as Filterer,SuppliersParams,Suppliers} from "Redux/Actions";
import {useDispatch,useSelector} from 'react-redux';


const Filter = (props:any) => {

    const dispatch = useDispatch();

    type control = "supplier_code" | "supplier_name" | "address" | "contact_person" | "contact_number" | "email";
    type action = "close" | "open";
    type submit = "clear" | "filter";
    const supplier = useSelector((state:any)=>state.Suppliers)
    
    const ref:any = {
        supplier_code       : React.useRef(null),
        supplier_name       : React.useRef(null),
        address             : React.useRef(null),
        contact_person      : React.useRef(null),
        contact_number      : React.useRef(null),
        email               : React.useRef(null)
    }

    const [popper,setPopper] = useState({
        supplier_code       : null,
        supplier_name       : null,
        address             : null,
        contact_person      : null,
        contact_number      : null,
        email               : null,
    });

    const reset = () => {
        let a = popper;
        a.supplier_code       = null;
        a.supplier_name       = null;
        a.address             = null;
        a.contact_person      = null;
        a.contact_number      = null;
        a.email               = null;
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
        dispatch(SuppliersParams({
            ...supplier.params,
            filter : {
                ...supplier.params.filter,
                [event.target.name] : {
                    ...supplier.params.filter[event.target.name],
                    key : event.target.value,
                }
            }
        }));
    }

    const setFilterControl=(event:any) =>{
        dispatch(SuppliersParams({
            ...supplier.params,
            filter : {
                ...supplier.params.filter,
                [event.target.name] : {
                    ...supplier.params.filter[event.target.name],
                    filter : event.target.value,
                }
            }
        }));
    }

    const submitFilter = async (action:submit,control:control) =>{
        dispatch(SuppliersParams({
            ...supplier.params,
            per_page    : 10,
            page        : 1,
        }));

        if(action === "filter"){
            reset();
            if(supplier.params.filter[control].key !== ''){
                dispatch(Suppliers());
            }
        }else{
            if(supplier.params.filter[control].key !== ''){
                dispatch(SuppliersParams({
                    ...supplier.params,
                    filter : {
                        ...supplier.params.filter,
                        [control] : {
                            ...supplier.params.filter[control],
                            key : '',
                        }
                    }
                }));
                dispatch(Suppliers());
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
                dispatch(SuppliersParams({
                    ...supplier.params,
                    filter : {
                        ...supplier.params.filter,
                        [e.target.name] : {
                            ...supplier.params.filter[e.target.name],
                            key : '',
                        }
                    }
                }));
                dispatch(Suppliers());

            }
        }

        if(e.key === 'Enter'){
            if(e.target.value !== ''){
                reset();
                ref[e.target.name].current.blur();
                dispatch(Suppliers());
            }
        }
    }

    return(
        supplier.filter ?
            <TableRow>
                <TableCell align="center" className="filter">
                    <TextField
                        id="outlined-email-input"
                        className="input"
                        autoComplete="off"
                        margin="normal"
                        variant="outlined"
                        name = "supplier_code"
                        value = {supplier.params.filter.supplier_code.key}
                        onChange = {setText}
                        onFocus = {(event)=>controller(event,"supplier_code","open")}
                        onKeyDown = {onKey}
                        inputRef = {ref.supplier_code}
                    />
                    
                    <Popper className="text-center" id={Boolean(popper.supplier_code)? "simple-popper" : undefined} open={Boolean(popper.supplier_code)} anchorEl={popper.supplier_code}>
                        <Paper className="popper-paper">
                            <FormControl variant="outlined" className="selector">
                                <Select
                                    value={supplier.params.filter.supplier_code.filter}
                                    onChange={setFilterControl}
                                    name = "supplier_code"
                                >
                                    <MenuItem value="iet" selected>Is Equal To </MenuItem>
                                    <MenuItem value="inet">Is Not Equal To</MenuItem>
                                    <MenuItem value="c">Contains</MenuItem>
                                    <MenuItem value="dnc">Does not Contains</MenuItem>
                                    <MenuItem value="sw">Starts With</MenuItem>
                                    <MenuItem value="ew">Ends With</MenuItem>
                                </Select>
                            </FormControl>
                            <Button variant="contained" color="primary" onClick={()=>submitFilter("clear","supplier_code")}>
                                {supplier.params.filter.supplier_code.key === '' ?'Close' : 'Clear'}                            
                            </Button>
                            <Button variant="contained" color="secondary" onClick={()=>submitFilter("filter","supplier_code")} disabled={supplier.params.filter.supplier_code.key === ''}>
                                Filter
                            </Button>
                        </Paper>
                    </Popper>

                </TableCell>

                <TableCell align="center" className="filter">
                    
                    <TextField
                        id="outlined-email-input"
                        className="input"
                        autoComplete="off"
                        margin="normal"
                        variant="outlined"
                        name = "supplier_name"
                        value = {supplier.params.filter.supplier_name.key}
                        onChange = {setText}
                        onFocus = {(event)=>controller(event,"supplier_name","open")}
                        onKeyDown = {onKey}
                        inputRef = {ref.supplier_name}
                    />
                    
                    <Popper className="text-center" id={Boolean(popper.supplier_name)? "simple-popper" : undefined} open={Boolean(popper.supplier_name)} anchorEl={popper.supplier_name}>
                        <Paper className="popper-paper">
                            <FormControl variant="outlined" className="selector">
                                <Select
                                    value={supplier.params.filter.supplier_name.filter}
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
                                {supplier.params.filter.supplier_name.key === '' ?'Close' : 'Clear'}                            
                            </Button>
                            <Button variant="contained" color="secondary" onClick={()=>submitFilter("filter","supplier_name")} disabled={supplier.params.filter.supplier_name.key === ''}>
                                Filter
                            </Button>
                        </Paper>
                    </Popper>

                </TableCell>
                <TableCell align="center" className="filter">
                    <TextField
                        id="outlined-email-input"
                        className="input"
                        autoComplete="anyrandomstring"
                        margin="normal"
                        variant="outlined"
                        name = "address"
                        value = {supplier.params.filter.address.key}
                        onChange = {setText}
                        onFocus = {(event)=>controller(event,"address","open")}
                        onKeyDown = {onKey}
                        inputRef = {ref.address}
                    />
                    
                    <Popper className="text-center" id={Boolean(popper.address)? "simple-popper" : undefined} open={Boolean(popper.address)} anchorEl={popper.address}>
                        <Paper className="popper-paper">
                            <FormControl variant="outlined" className="selector">
                                <Select
                                    value={supplier.params.filter.address.filter}
                                    onChange={setFilterControl}
                                    name = "address"
                                >
                                    <MenuItem value="iet" selected>Is Equal To </MenuItem>
                                    <MenuItem value="inet">Is Not Equal To</MenuItem>
                                    <MenuItem value="c">Contains</MenuItem>
                                    <MenuItem value="dnc">Does not Contains</MenuItem>
                                    <MenuItem value="sw">Starts With</MenuItem>
                                    <MenuItem value="ew">Ends With</MenuItem>
                                </Select>
                            </FormControl>
                            <Button variant="contained" color="primary" onClick={()=>submitFilter("clear","address")}>
                                {supplier.params.filter.address.key === '' ?'Close' : 'Clear'}
                            </Button>
                            <Button variant="contained" color="secondary" onClick={()=>submitFilter("filter","address")} disabled={supplier.params.filter.address.key === '' }>
                                Filter
                            </Button>
                        </Paper>
                    </Popper>
                </TableCell>
                <TableCell align="center" className="filter">
                    <TextField
                        id="outlined-email-input"
                        className="input"
                        autoComplete="anyrandomstring"
                        margin="normal"
                        variant="outlined"
                        name = "contact_person"
                        value = {supplier.params.filter.contact_person.key}
                        onChange = {setText}
                        onFocus = {(event)=>controller(event,"contact_person","open")}
                        onKeyDown = {onKey}
                        inputRef = {ref.contact_person}
                    />
                    
                    <Popper className="text-center" id={Boolean(popper.contact_person)? "simple-popper" : undefined} open={Boolean(popper.contact_person)} anchorEl={popper.contact_person}>
                        <Paper className="popper-paper">
                            <FormControl variant="outlined" className="selector">
                                <Select
                                    value={supplier.params.filter.contact_person.filter}
                                    onChange={setFilterControl}
                                    name = "contact_person"
                                >
                                    <MenuItem value="iet" selected>Is Equal To </MenuItem>
                                    <MenuItem value="inet">Is Not Equal To</MenuItem>
                                    <MenuItem value="c">Contains</MenuItem>
                                    <MenuItem value="dnc">Does not Contains</MenuItem>
                                    <MenuItem value="sw">Starts With</MenuItem>
                                    <MenuItem value="ew">Ends With</MenuItem>
                                </Select>
                            </FormControl>
                            <Button variant="contained" color="primary" onClick={()=>submitFilter("clear","contact_person")}>
                                {supplier.params.filter.contact_person.key === '' ?'Close' : 'Clear'}                            
                            </Button>
                            <Button variant="contained" color="secondary" onClick={()=>submitFilter("filter","contact_person")} disabled={supplier.params.filter.contact_person.key === ''}>
                                Filter
                            </Button>
                        </Paper>
                    </Popper>
                </TableCell>
                <TableCell align="center" className="filter">
                    <TextField
                        id="outlined-email-input"
                        className="input"
                        autoComplete="anyrandomstring"
                        margin="normal"
                        variant="outlined"
                        name = "contact_number"
                        value = {supplier.params.filter.contact_number.key}
                        onChange = {setText}
                        onFocus = {(event)=>controller(event,"contact_number","open")}
                        onKeyDown = {onKey}
                        inputRef = {ref.contact_number}
                    />
                    
                    <Popper className="text-center" id={Boolean(popper.contact_number)? "simple-popper" : undefined} open={Boolean(popper.contact_number)} anchorEl={popper.contact_number}>
                        <Paper className="popper-paper">
                            <FormControl variant="outlined" className="selector">
                                <Select
                                    value={supplier.params.filter.contact_number.filter}
                                    onChange={setFilterControl}
                                    name = "contact_number"
                                >
                                    <MenuItem value="iet" selected>Is Equal To </MenuItem>
                                    <MenuItem value="inet">Is Not Equal To</MenuItem>
                                    <MenuItem value="c">Contains</MenuItem>
                                    <MenuItem value="dnc">Does not Contains</MenuItem>
                                    <MenuItem value="sw">Starts With</MenuItem>
                                    <MenuItem value="ew">Ends With</MenuItem>
                                </Select>
                            </FormControl>
                            <Button variant="contained" color="primary" onClick={()=>submitFilter("clear","contact_number")}>
                                {supplier.params.filter.contact_number.key === '' ?'Close' : 'Clear'}
                            </Button>
                            <Button variant="contained" color="secondary" onClick={()=>submitFilter("filter","contact_number")} disabled={supplier.params.filter.contact_number.key === '' }>
                                Filter
                            </Button>
                        </Paper>
                    </Popper>
                </TableCell>
                <TableCell align="center" className="filter">
                    <TextField
                        id="outlined-email-input"
                        className="input"
                        autoComplete="off"
                        margin="normal"
                        variant="outlined"
                        name = "email"
                        value = {supplier.params.filter.email.key}
                        onChange = {setText}
                        onFocus = {(event)=>controller(event,"email","open")}
                        onKeyDown = {onKey}
                        inputRef = {ref.email}
                    />
                    
                    <Popper className="text-center" id={Boolean(popper.email)? "simple-popper" : undefined} open={Boolean(popper.email)} anchorEl={popper.email}>
                        <Paper className="popper-paper">
                            <FormControl variant="outlined" className="selector">
                                <Select
                                    value={supplier.params.filter.email.filter}
                                    onChange={setFilterControl}
                                    name = "email"
                                >
                                    <MenuItem value="iet" selected>Is Equal To </MenuItem>
                                    <MenuItem value="inet">Is Not Equal To</MenuItem>
                                    <MenuItem value="c">Contains</MenuItem>
                                    <MenuItem value="dnc">Does not Contains</MenuItem>
                                    <MenuItem value="sw">Starts With</MenuItem>
                                    <MenuItem value="ew">Ends With</MenuItem>
                                </Select>
                            </FormControl>
                            <Button variant="contained" color="primary" onClick={()=>submitFilter("clear","email")}>
                                {supplier.params.filter.email.key === '' ?'Close' : 'Clear'}
                            </Button>
                            <Button variant="contained" color="secondary" onClick={()=>submitFilter("filter","email")} disabled={supplier.params.filter.email.key === '' }>
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