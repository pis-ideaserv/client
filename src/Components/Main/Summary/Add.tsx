import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, FormControl, InputLabel, MenuItem, FormControlLabel, DialogActions, TextField, makeStyles, Theme, createStyles, Fab } from '@material-ui/core';
import { Requests } from 'Services';
import Select from 'react-select';
import AddIcon from '@material-ui/icons/Add';
import Close from '@material-ui/icons/Close';
import { useSnackbar } from 'notistack';
import {MasterCodes} from 'Redux/Actions'
import {useDispatch} from 'react-redux';
import Category from './Category';
import AsyncCreatableSelect from 'react-select/async-creatable'

interface Add {
    open : boolean,
    handleClose : any,
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: 0,
            marginRight: 0,
            width : '100%',
            marginBottom: '10px',
            marginTop:'0'
            
        },
        dense: {
            marginTop: theme.spacing(0),
        },
        menu: {
            width: 200,
        },
        dialog : {
            overflow: 'visible'
        },
        select : {
            background : 'white',
            position : 'absolute',
            color : '#757575',
            marginTop : '-10px',
            left : '14px',
            zIndex : 1,
            // marginLeft : '40px',
            // fontSize : '12px', 
        },
        category : {
            width : '100%'
        },
        addCategory : {
           marginTop : '-46px',
           right : '15px',
           position : 'absolute',
           transform : 'scale(0.7)',
           outline:'none',

            "&:focus": {
                outline: 'none'
            }
        },
        categoryError : {
            fontSize: '0.75rem',
            color   : '#f11111',
            position : 'absolute',
        }
    }),
);


const Add = (props:Add) => {

    const categoryRequest:any = React.useRef();
    const masterCodeRequest:any = React.useRef(); 

    const initError = {
        product_code : {error: false, message : ''},
        product_name : {error: false, message : ''},
        category     : {error: false, message : ''}
    }

    const classes = useStyles(props);

    const dispatch = useDispatch();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar(); //snackbar
    const [ category, setCategory ] = React.useState();
    const [ option, setOption ] = React.useState();
    const [input, setInput] = React.useState({
        product_code : '',
        product_name : '',
        category     : '',
    });
    const [submit, setSubmit ] = React.useState(false);
    const [error, setError] = React.useState(initError);
    const [ categoryHandle, setCategoryHandler ] = React.useState(false);
    const [categoryValue,setCategoryValue] = React.useState('');

    const categoryParams = {
        per_page : 10,
        page : 1,
    }


    React.useEffect( () => {
        if(props.open){
            // queryCategory();
        }
    },[props]);

    const actions = (key:any) => (
        <Button onClick={() => { closeSnackbar(key) }}>
            <div style={{color:"white"}}><Close /></div>
        </Button>
    );


    const handleChangeText = (event:any) => {

        setInput({
            ...input,
            [event.target.name] : event.target.value
        });
    }


    const loadOption = async(inputValue:string) => {

        
        let category =  await categoryRequest.current.show({search:inputValue});

        return category.data.data.map((value:any)=>{
            return{
                value : value.id,
                label : value.name,
                target:{
                    value : value.id,
                    name : "category",
                }
            }
        });
    }


    // const reset = () => {

    //     // let a = {
            
    //     // }


        

    //     console.log(error);
    // }


    // const checkNull = () => {
    //     if(input.product_code === ''){
    //         setError({
    //             ...error,
    //             product_code : {error: true, message : 'Product Code is required'}
    //         });
    //         setSubmit(false);
    //         return true;
    //     }

    //     if(input.product_name === ''){
    //         setError({
    //             ...error,
    //             product_name : {error: true, message : 'Product Name is required'}
    //         });
    //         setSubmit(false);
    //         return true;
    //     }

    //     if(input.category === ''){
    //         setError({
    //             ...error,
    //             category : {error: true, message : 'Please select category'}
    //         });
    //         setSubmit(false);
    //         return true;
    //     }

    //     setSubmit(false);
    //     return false;
    // }





    const submitForm = async (event:any) => {
              
        setError(initError); 
        setSubmit(true);  
        event.preventDefault();
    
        let a = await masterCodeRequest.current.add(input);

        console.log(a);

        if(a.status === 200){
            enqueueSnackbar("Successfully added Product Code",{variant:"success",action:actions});
            dispatch(MasterCodes());
            props.handleClose();
            setSubmit(false);
            return;
        }

        if(a.status === 406){
            updateErrorState(a.data.errors);
        } 

        setSubmit(false);
        return;
    }


    const updateErrorState = (response:[]) => {
        let holder:any = initError;
        response.forEach( (value:any) =>{
            holder[value.name] = {error : true,message: value.message};
        });


        console.log(holder);
        setError(holder);
    }

    
    return (
        <React.Fragment>
            <Requests.Category request={categoryRequest} />
            <Requests.MasterCodes request={masterCodeRequest} />
            <Category
                params = {categoryParams}
                open = {categoryHandle}
                setOpen = {setCategoryHandler}
                setOption = {setOption}
                value = {categoryValue}
            />
            <Dialog
                disableBackdropClick
                maxWidth="xs"
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="max-width-dialog-title"
                classes = {{ paperScrollPaper: classes.dialog }}
            >
                <DialogTitle id="max-width-dialog-title">Add New Product</DialogTitle>
                <DialogContent className={classes.dialog}>
                    <form onSubmit={submitForm} id="master-file">
                        
                        <TextField
                            id="outlined-email-input"
                            label="Product Code"
                            className={classes.textField}
                            type="text"
                            name="product_code"
                            value = {input.product_code}
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange = {handleChangeText}
                            error = {error.product_code.error}
                            helperText = {error.product_code.error ? error.product_code.message : ''}
                            disabled={submit}
                        />
                        
                        <TextField
                            id="outlined-email-input"
                            label="Product Name"
                            className={classes.textField}
                            type="text"
                            name="product_name"
                            value = {input.product_name}
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange = {handleChangeText}
                            error = {error.product_name.error  ? true : false}
                            helperText = {error.product_name.message}
                            disabled={submit}
                        />

                        <div style={{position:'relative'}}>
                            <label className={classes.select}>Category</label>
                            <AsyncCreatableSelect
                                cacheOptions
                                defaultOptions
                                onChange = {handleChangeText}
                                loadOptions ={(value) =>loadOption(value)}
                                onCreateOption = {(inputValue)=>{
                                    setCategoryValue(inputValue);
                                    setCategoryHandler(true);
                                }}
                                // value={input.category}
                                className={classes.category}
                                required
                                disabled={submit}
                            />
                            <div hidden={!error.category.error} className={classes.categoryError}>{error.category.message}</div>
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button disabled={submit} onClick={props.handleClose} color="secondary" variant="contained">
                        Close
                    </Button>

                    <Button form="id" disabled={submit} onClick={submitForm} color="primary" variant="contained">
                        Submit
                    </Button>
                </DialogActions>
          </Dialog>
        </React.Fragment>
      );
}

export default Add;