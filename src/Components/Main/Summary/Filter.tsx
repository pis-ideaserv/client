import { TableRow, TableCell, Popper, Paper, Typography, TextField, Button, FormControl, Select, MenuItem } from "@material-ui/core"
import React, { useState } from "react";
import { DatePicker } from "material-ui-pickers";
import moment from "moment";
import {Filter as Filterer} from "Redux/Actions";
import {useDispatch} from 'react-redux';


const Filter = (props:any) => {



    const dispatch = useDispatch();

    type control = "product_code" | "product_name" | "category"
    type action = "close" | "open";
    type submit = "clear" | "filter";

    const ref:any = {
        product_code    : React.useRef(null),
        product_name    : React.useRef(null),
        category         : React.useRef(null),
    }

    const [popper,setPopper] = useState({
        product_code    : null,
        product_name    : null,
        category        : null
    });

    const reset = () => {
        
        let a = popper;
        a.product_code     = null;
        a.product_name     = null;
        a.category         = null;
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
        let a:control = event.target.name;
        props.setFilter({
            ...props.filter,
            [event.target.name] : {
                ...props.filter[a],
                key : event.target.value,
            }
        });
    }

    const setFilterControl=(event:any) =>{
        let a:control = event.target.name;
        props.setFilter({
            ...props.filter,
            [event.target.name] : {
                ...props.filter[a],
                filter : event.target.value,
            }
        });
    }

    const submitFilter = async (action:submit,control:control) =>{
        // reset();
        if(action === "filter"){
            reset();
            if(props.filter[control].key !== ''){
                dispatch(Filterer(props.filter,"master",props.params));
            }
        }else{
            if(props.filter[control].key !== ''){
                let a = props.filter;

                props.setFilter({
                    ...props.filter,
                    [control] : {
                        ...props.filter[control],
                        key : ''
                    }
                });
                
                a[control].key = "";
                dispatch(Filterer(a,"master",props.params));
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

                // reset();
                
                let a:any = props.filter;
                a[e.target.name].key = '';    
                dispatch(Filterer(a,"master",props.params));
            }
        }

        if(e.key === 'Enter'){
            if(e.target.value !== ''){
                reset();
                ref[e.target.name].current.blur();
                dispatch(Filterer(props.filter,"master",props.params));
            }
        }
    }


    return(
        <TableRow>
            <TableCell align="center" className="filter">
                <TextField
                    id="outlined-email-input"
                    className="input"
                    autoComplete="off"
                    margin="normal"
                    variant="outlined"
                    name = "product_code"
                    value = {props.filter.product_code.key}
                    onChange = {setText}
                    onFocus = {(event)=>controller(event,"product_code","open")}
                    onKeyDown = {onKey}
                    inputRef = { ref.product_code }
                />
                
                <Popper className="text-center" id={Boolean(popper.product_code)? "simple-popper" : undefined} open={Boolean(popper.product_code)} anchorEl={popper.product_code}>
                    <Paper className="popper-paper">
                        <FormControl variant="outlined" className="selector">
                            <Select
                                value={props.filter.product_code.filter}
                                onChange={setFilterControl}
                                name = "product_code"
                            >
                                <MenuItem value="iet" selected>Is Equal To </MenuItem>
                                <MenuItem value="inet">Is Not Equal To</MenuItem>
                                <MenuItem value="c">Contains</MenuItem>
                                <MenuItem value="dnc">Does not Contains</MenuItem>
                                <MenuItem value="sw">Starts With</MenuItem>
                                <MenuItem value="ew">Ends With</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant="contained" color="primary" onClick={()=>submitFilter("clear","product_code")}>
                            {props.filter.product_code.key === '' ?'Close' : 'Clear'}                            
                        </Button>
                        <Button variant="contained" color="secondary" onClick={()=>submitFilter("filter","product_code")} disabled={props.filter.product_code.key === ''}>
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
                    name = "product_name"
                    value = {props.filter.product_name.key}
                    onChange = {setText}
                    onFocus = {(event)=>controller(event,"product_name","open")}
                    onKeyDown = {onKey}
                    inputRef = {ref.product_name}
                />
                
                <Popper className="text-center" id={Boolean(popper.product_name)? "simple-popper" : undefined} open={Boolean(popper.product_name)} anchorEl={popper.product_name}>
                    <Paper className="popper-paper">
                        <FormControl variant="outlined" className="selector">
                            <Select
                                value={props.filter.product_name.filter}
                                onChange={setFilterControl}
                                name = "product_name"
                            >
                                <MenuItem value="iet" selected>Is Equal To </MenuItem>
                                <MenuItem value="inet">Is Not Equal To</MenuItem>
                                <MenuItem value="c">Contains</MenuItem>
                                <MenuItem value="dnc">Does not Contains</MenuItem>
                                <MenuItem value="sw">Starts With</MenuItem>
                                <MenuItem value="ew">Ends With</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant="contained" color="primary" onClick={()=>submitFilter("clear","product_name")}>
                            {props.filter.product_name.key === '' ?'Close' : 'Clear'}                            
                        </Button>
                        <Button variant="contained" color="secondary" onClick={()=>submitFilter("filter","product_name")} disabled={props.filter.product_name.key === ''}>
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
                    name = "category"
                    value = {props.filter.category.key}
                    onChange = {setText}
                    onFocus = {(event)=>controller(event,"category","open")}
                    onKeyDown = {onKey}
                    inputRef = {ref.category}
                />
                
                <Popper className="text-center" id={Boolean(popper.category)? "simple-popper" : undefined} open={Boolean(popper.category)} anchorEl={popper.category}>
                    <Paper className="popper-paper">
                        <FormControl variant="outlined" className="selector">
                            <Select
                                value={props.filter.category.filter}
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
                            {props.filter.category.key === '' ?'Close' : 'Clear'}                                                        
                        </Button>
                        <Button variant="contained" color="secondary" onClick={()=>submitFilter("filter","category")} disabled = { props.filter.category.key === '' }>
                            Filter
                        </Button>
                    </Paper>
                </Popper>
            </TableCell>
        </TableRow>
    );
}

export default Filter;