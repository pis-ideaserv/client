import { TableRow, TableCell, Popper, Paper, Typography, TextField, Button, FormControl, Select, MenuItem } from "@material-ui/core"
import React, { useState } from "react";
import { DatePicker } from "material-ui-pickers";
import moment from "moment";
import {Filter as Filterer} from "Redux/Actions";
import {useDispatch,useSelector} from 'react-redux';


const Filter = (props:any) => {



    const dispatch = useDispatch();
    const user = useSelector((state:any)=>state.Users);

    type control = "username" | "name" | "company" | "email" | "level" | "activated";
    type action = "close" | "open";
    type submit = "clear" | "filter";

    const ref:any = {
        username        : React.useRef(null),
        name            : React.useRef(null),
        company         : React.useRef(null),
        email           : React.useRef(null),
        level           : React.useRef(null),
        activated       : React.useRef(null)
    }

    const [popper,setPopper] = useState({
        username        : null,
        name            : null,
        company         : null,
        email           : null,
        level           : null,
        activated       : null,
    });

    const reset = () => {
        
        let a = popper;
        a.username        = null;
        a.name            = null;
        a.company         = null;
        a.email           = null;
        a.level           = null;
        a.activated       = null;
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

        let params = {per_page:10,page:1};

        props.setParams(params);


        if(action === "filter"){
            reset();
            if(props.filter[control].key !== ''){
                dispatch(Filterer(props.filter,"user",params));
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
                dispatch(Filterer(a,"user",params));
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
                dispatch(Filterer(a,"user",props.params));
            }
        }

        if(e.key === 'Enter'){
            if(e.target.value !== ''){
                reset();
                ref[e.target.name].current.blur();
                dispatch(Filterer(props.filter,"user",props.params));
            }
        }
    }


    return(
        user.filter ? 
            <TableRow>
                <TableCell align="center" className="filter">
                    <TextField
                        id="outlined-email-input"
                        className="input"
                        autoComplete="off"
                        margin="normal"
                        variant="outlined"
                        name = "username"
                        value = {props.filter.username.key}
                        onChange = {setText}
                        onFocus = {(event)=>controller(event,"username","open")}
                        onKeyDown = {onKey}
                        inputRef = { ref.username }
                    />
                    
                    <Popper className="text-center" id={Boolean(popper.username)? "simple-popper" : undefined} open={Boolean(popper.username)} anchorEl={popper.username}>
                        <Paper className="popper-paper">
                            <FormControl variant="outlined" className="selector">
                                <Select
                                    value={props.filter.username.filter}
                                    onChange={setFilterControl}
                                    name = "username"
                                >
                                    <MenuItem value="iet" selected>Is Equal To </MenuItem>
                                    <MenuItem value="inet">Is Not Equal To</MenuItem>
                                    <MenuItem value="c">Contains</MenuItem>
                                    <MenuItem value="dnc">Does not Contains</MenuItem>
                                    <MenuItem value="sw">Starts With</MenuItem>
                                    <MenuItem value="ew">Ends With</MenuItem>
                                </Select>
                            </FormControl>
                            <Button variant="contained" color="primary" onClick={()=>submitFilter("clear","username")}>
                                {props.filter.username.key === '' ?'Close' : 'Clear'}                            
                            </Button>
                            <Button variant="contained" color="secondary" onClick={()=>submitFilter("filter","username")} disabled={props.filter.username.key === ''}>
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
                        name = "name"
                        value = {props.filter.name.key}
                        onChange = {setText}
                        onFocus = {(event)=>controller(event,"name","open")}
                        onKeyDown = {onKey}
                        inputRef = {ref.name}
                    />
                    
                    <Popper className="text-center" id={Boolean(popper.name)? "simple-popper" : undefined} open={Boolean(popper.name)} anchorEl={popper.name}>
                        <Paper className="popper-paper">
                            <FormControl variant="outlined" className="selector">
                                <Select
                                    value={props.filter.name.filter}
                                    onChange={setFilterControl}
                                    name = "name"
                                >
                                    <MenuItem value="iet" selected>Is Equal To </MenuItem>
                                    <MenuItem value="inet">Is Not Equal To</MenuItem>
                                    <MenuItem value="c">Contains</MenuItem>
                                    <MenuItem value="dnc">Does not Contains</MenuItem>
                                    <MenuItem value="sw">Starts With</MenuItem>
                                    <MenuItem value="ew">Ends With</MenuItem>
                                </Select>
                            </FormControl>
                            <Button variant="contained" color="primary" onClick={()=>submitFilter("clear","name")}>
                                {props.filter.name.key === '' ?'Close' : 'Clear'}                            
                            </Button>
                            <Button variant="contained" color="secondary" onClick={()=>submitFilter("filter","name")} disabled={props.filter.name.key === ''}>
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
                        name = "company"
                        value = {props.filter.company.key}
                        onChange = {setText}
                        onFocus = {(event)=>controller(event,"company","open")}
                        onKeyDown = {onKey}
                        inputRef = {ref.company}
                    />
                    
                    <Popper className="text-center" id={Boolean(popper.company)? "simple-popper" : undefined} open={Boolean(popper.company)} anchorEl={popper.company}>
                        <Paper className="popper-paper">
                            <FormControl variant="outlined" className="selector">
                                <Select
                                    value={props.filter.company.filter}
                                    onChange={setFilterControl}
                                    name = "company"
                                >
                                    <MenuItem value="iet" selected>Is Equal To </MenuItem>
                                    <MenuItem value="inet">Is Not Equal To</MenuItem>
                                    <MenuItem value="c">Contains</MenuItem>
                                    <MenuItem value="dnc">Does not Contains</MenuItem>
                                    <MenuItem value="sw">Starts With</MenuItem>
                                    <MenuItem value="ew">Ends With</MenuItem>
                                </Select>
                            </FormControl>
                            <Button variant="contained" color="primary" onClick={()=>submitFilter("clear","company")}>
                                {props.filter.company.key === '' ?'Close' : 'Clear'}                                                        
                            </Button>
                            <Button variant="contained" color="secondary" onClick={()=>submitFilter("filter","company")} disabled = { props.filter.company.key === '' }>
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
                        name = "email"
                        value = {props.filter.email.key}
                        onChange = {setText}
                        onFocus = {(event)=>controller(event,"email","open")}
                        onKeyDown = {onKey}
                        inputRef = {ref.email}
                    />
                    
                    <Popper className="text-center" id={Boolean(popper.email)? "simple-popper" : undefined} open={Boolean(popper.email)} anchorEl={popper.email}>
                        <Paper className="popper-paper">
                            <FormControl variant="outlined" className="selector">
                                <Select
                                    value={props.filter.email.filter}
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
                                {props.filter.email.key === '' ?'Close' : 'Clear'}                        
                            </Button>
                            <Button variant="contained" color="secondary" onClick={()=>submitFilter("filter","email")} disabled={props.filter.email.key === ''}>
                                Filter
                            </Button>
                        </Paper>
                    </Popper>
                </TableCell>
                <TableCell align="center">
                    <FormControl variant="outlined" style={{width:'100%'}}>
                        <Select
                            value={props.filter.level.key}
                            onChange={setText}
                            name="level"
                            onFocus = {(event)=>controller(event,"level","open")}
                        >
                            <MenuItem value={0}>All</MenuItem>
                            <MenuItem value={1}>Admin</MenuItem>
                            <MenuItem value={2}>Encoder</MenuItem>
                            <MenuItem value={3}>Viewer</MenuItem>
                        </Select>
                    
                    </FormControl>
                    <Popper className="text-center" id={Boolean(popper.level)? "simple-popper" : undefined} open={Boolean(popper.level)} anchorEl={popper.level}>
                        <Paper className="popper-paper">
                            <Button variant="contained" color="primary" onClick={()=>setPopper({...popper,level:null})}>
                                Close
                            </Button>
                            <Button variant="contained" color="secondary" onClick={()=>submitFilter("filter","level")}>
                                Filter
                            </Button>
                        </Paper>
                    </Popper>
                </TableCell>

                <TableCell align="center">
                    <FormControl variant="outlined" style={{width:'100%'}}>
                        <Select
                            value={props.filter.activated.key}
                            onChange={setText}
                            name="activated"
                            onFocus = {(event)=>controller(event,"activated","open")}
                        >
                            <MenuItem value={0} >All</MenuItem>
                            <MenuItem value={1}>Yes</MenuItem>
                            <MenuItem value={2}>No</MenuItem>
                            
                        </Select>
                    
                    </FormControl>
                    <Popper className="text-center" id={Boolean(popper.activated)? "simple-popper" : undefined} open={Boolean(popper.activated)} anchorEl={popper.activated}>
                        <Paper className="popper-paper">
                            <Button variant="contained" color="primary" onClick={()=>setPopper({...popper,activated:null})}>
                                Close
                            </Button>
                            <Button variant="contained" color="secondary" onClick={()=>submitFilter("filter","activated")}>
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