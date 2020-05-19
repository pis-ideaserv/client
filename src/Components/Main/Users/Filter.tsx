import { TableRow, TableCell, Popper, Paper, TextField, Button, FormControl, Select, MenuItem } from "@material-ui/core"
import React, { useState } from "react";
import {UsersParams,Users} from "Redux/Actions";
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
        dispatch(UsersParams({
            ...user.params,
            filter : {
                ...user.params.filter,
                [event.target.name] : {
                    ...user.params.filter[event.target.name],
                    key : event.target.value,
                }
            }
        }));
    }

    const setFilterControl=(event:any) =>{
        dispatch(UsersParams({
            ...user.params,
            filter : {
                ...user.params.filter,
                [event.target.name] : {
                    ...user.params.filter[event.target.name],
                    filter : event.target.value,
                }
            }
        }));
    }

    const submitFilter = async (action:submit,control:control) =>{
        dispatch(UsersParams({
            ...user.params,
            per_page    : 10,
            page        : 1,
        }));

        if(action === "filter"){
            reset();
            if(user.params.filter[control].key !== ''){
                dispatch(Users())
            }
        }else{
            if(user.params.filter[control].key !== ''){
                dispatch(UsersParams({
                    ...user.params,
                    filter : {
                        ...user.params.filter,
                        [control] : {
                            ...user.params.filter[control],
                            key : '',
                        }
                    }
                }));
                dispatch(Users());
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
                dispatch(UsersParams({
                    ...user.params,
                    filter : {
                        ...user.params.filter,
                        [e.target.name] : {
                            ...user.params.filter[e.target.name],
                            key : '',
                        }
                    }
                }));
                dispatch(Users());
            }
        }

        if(e.key === 'Enter'){
            if(e.target.value !== ''){
                reset();
                ref[e.target.name].current.blur();
                dispatch(Users());
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
                        value = {user.params.filter.username.key}
                        onChange = {setText}
                        onFocus = {(event)=>controller(event,"username","open")}
                        onKeyDown = {onKey}
                        inputRef = { ref.username }
                    />
                    
                    <Popper className="text-center" id={Boolean(popper.username)? "simple-popper" : undefined} open={Boolean(popper.username)} anchorEl={popper.username}>
                        <Paper className="popper-paper">
                            <FormControl variant="outlined" className="selector">
                                <Select
                                    value={user.params.filter.username.filter}
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
                                {user.params.filter.username.key === '' ?'Close' : 'Clear'}                            
                            </Button>
                            <Button variant="contained" color="secondary" onClick={()=>submitFilter("filter","username")} disabled={user.params.filter.username.key === ''}>
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
                        value = {user.params.filter.name.key}
                        onChange = {setText}
                        onFocus = {(event)=>controller(event,"name","open")}
                        onKeyDown = {onKey}
                        inputRef = {ref.name}
                    />
                    
                    <Popper className="text-center" id={Boolean(popper.name)? "simple-popper" : undefined} open={Boolean(popper.name)} anchorEl={popper.name}>
                        <Paper className="popper-paper">
                            <FormControl variant="outlined" className="selector">
                                <Select
                                    value={user.params.filter.name.filter}
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
                                {user.params.filter.name.key === '' ?'Close' : 'Clear'}                            
                            </Button>
                            <Button variant="contained" color="secondary" onClick={()=>submitFilter("filter","name")} disabled={user.params.filter.name.key === ''}>
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
                        value = {user.params.filter.company.key}
                        onChange = {setText}
                        onFocus = {(event)=>controller(event,"company","open")}
                        onKeyDown = {onKey}
                        inputRef = {ref.company}
                    />
                    
                    <Popper className="text-center" id={Boolean(popper.company)? "simple-popper" : undefined} open={Boolean(popper.company)} anchorEl={popper.company}>
                        <Paper className="popper-paper">
                            <FormControl variant="outlined" className="selector">
                                <Select
                                    value={user.params.filter.company.filter}
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
                                {user.params.filter.company.key === '' ?'Close' : 'Clear'}                                                        
                            </Button>
                            <Button variant="contained" color="secondary" onClick={()=>submitFilter("filter","company")} disabled = { user.params.filter.company.key === '' }>
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
                        value = {user.params.filter.email.key}
                        onChange = {setText}
                        onFocus = {(event)=>controller(event,"email","open")}
                        onKeyDown = {onKey}
                        inputRef = {ref.email}
                    />
                    
                    <Popper className="text-center" id={Boolean(popper.email)? "simple-popper" : undefined} open={Boolean(popper.email)} anchorEl={popper.email}>
                        <Paper className="popper-paper">
                            <FormControl variant="outlined" className="selector">
                                <Select
                                    value={user.params.filter.email.filter}
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
                                {user.params.filter.email.key === '' ?'Close' : 'Clear'}                        
                            </Button>
                            <Button variant="contained" color="secondary" onClick={()=>submitFilter("filter","email")} disabled={user.params.filter.email.key === ''}>
                                Filter
                            </Button>
                        </Paper>
                    </Popper>
                </TableCell>
                <TableCell align="center" className="filter">
                    <TextField
                        value={user.params.filter.level.key}
                        onChange={setText}
                        name="level"
                        variant="outlined"
                        select
                        className="input"
                        onFocus = {(event)=>controller(event,"level","open")}
                    >
                        <MenuItem value={0}>All</MenuItem>
                        <MenuItem value={1}>Admin</MenuItem>
                        <MenuItem value={2}>Encoder</MenuItem>
                        <MenuItem value={3}>Viewer</MenuItem>
                    </TextField>
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

                <TableCell align="center" className="filter">
                        <TextField
                            value={user.params.filter.activated.key}
                            onChange={setText}
                            name="activated"
                            onFocus = {(event)=>controller(event,"activated","open")}
                            select
                            className="input"
                            variant="outlined"
                        >
                            <MenuItem value={0} >All</MenuItem>
                            <MenuItem value={1}>Yes</MenuItem>
                            <MenuItem value={2}>No</MenuItem>
                            
                        </TextField>
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