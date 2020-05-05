import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core';
import { Requests } from 'Services';
import { useSnackbar } from 'notistack';
import Close from '@material-ui/icons/Close';

interface Category{
    
    params : any,
    open : any,
    setOption : any,
    setOpen : any,


    value : string,
}

const Category = (props:Category) => {

    const categoryRequest:any = React.useRef();
    const [ submit, setSubmit ] = React.useState(false);
    const [ error, setError ] = React.useState(false);
    const [ message, setMessage ] = React.useState('');
    const [category, setCategory ] = React.useState();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar(); //snackbar

    const actions = (key:any) => (
        <Button onClick={() => { closeSnackbar(key) }}>
            <div style={{color:"white"}}><Close /></div>
        </Button>
    );

    const handleClose = () => {
        props.setOpen(!props.open);
    }


    // const handleOption = async () => {
    //     const a = await categoryRequest.current.show(props.params);

    //     let meta = a.data.meta;

    //     let opti:any;

    //     if(meta.total > meta.per_page){
    //         let b =  await categoryRequest.current.show({per_page:meta.total,page:1});
    //         opti = b.data.data;
    //         props.params.page = 1;
    //         props.params.per_page = meta.total; 
    //     }else{
    //         setCategory(a.data.data);
    //         opti = a.data.data;
    //     }



    //     let opt = opti.map((value:any) => {
    //         return {
    //             label : value.name,
    //             value : value.id,
    //             target: {
    //                 name  : 'category',
    //                 value : value.id 
    //             }
    //         }
    //     })

    //     props.setOption(opt);
    // }

    const submitForm = async () => {
        setError(false);
        setSubmit(true);
        if(category === ''){
            setSubmit(false);
            setError(true);
            setMessage('Category name is required');
            return;
        }

        let a = await categoryRequest.current.add({name:category});



        if(a.network_error){
            enqueueSnackbar("Something went wrong. Plese try again later.",{variant:'error',action:actions});
        }else{
            if(a.status === 200 && !a.data.hasOwnProperty('status') ){
                // handleOption();
                handleClose();
                enqueueSnackbar("Product category successfull added",{variant:"success",action:actions});
            }else{
 
                if(a.status === 200 && a.data.hasOwnProperty('status')){
                    setSubmit(false);
                    setError(true);
                    setMessage(a.data.message);
                    return;
                }else{
                    enqueueSnackbar("Something went wrong. Please try again.",{variant:"error",action:actions});
                }
            }
        }

        setSubmit(false);
        setError(false);
        setMessage('');
    }

    return(
        <React.Fragment>
            <Requests.Category request={categoryRequest} />
            <Dialog
                disableBackdropClick
                maxWidth="xs"
                open={props.open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">Add New Category</DialogTitle>
                <DialogContent >
                    <TextField
                        id="outlined-email-input"
                        label="Category Name"
                        // className={classes.textField}
                        type="text"
                        name="category"
                        value = {category}
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        defaultValue={props.value}
                        onChange = {(event) => setCategory(event.target.value)}
                        error = {error}
                        helperText = {message}
                        disabled={submit}
                    />
                </DialogContent>
                <DialogActions>
                    <Button disabled={submit} onClick={handleClose} color="secondary" variant="contained">
                        Cancel
                    </Button>

                    <Button disabled={submit} onClick={submitForm} color="primary" variant="contained">
                        Submit
                    </Button>
                </DialogActions>        
            </Dialog>
        </React.Fragment>
    );

}

export default Category;