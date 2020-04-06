import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Paper, IconButton, LinearProgress } from '@material-ui/core';
import './upload.style.scss';
import { Close } from '@material-ui/icons';
import {useSnackbar} from "notistack";
import tus from 'tus-js-client';
import { Requests } from 'Services';

interface Upload{

    open : boolean,
    setOpen(a:boolean) : void,
    type : "masterfile" | "product" | "supplier"
}


let newFileName = "";
const Upload = (props:Upload) => {

    const notify:any = React.useRef();
    const dragDiv = React.useRef(null);
    const input = React.useRef(null);
    const {enqueueSnackbar,closeSnackbar} = useSnackbar();
    const [status,setStatus] = React.useState({
        uploading   : false,
        percent     : 0,
    });


    const dragAndDrop = (event:any) => {
        event.preventDefault();

        switch(event.type){
            case "change" :
                processFileList(event.target.files);
                return;
            case "dragover" :
                dragDiv.current.classList.add("active");
                return;
            case "drop" :
                dragDiv.current.classList.remove("active");
                processFileList(event.dataTransfer.files);
                return;
            default:
                dragDiv.current.classList.remove("active");
                return;                
        }
    }

    const action = (key:any) => (
        <Button variant="text" color="inherit" onClick={ () => closeSnackbar(key)}>
            <Close />
        </Button>
    );

    const processFileList = (data:FileList) => {
        if(data.length !== 0){
            let extension = data[0].name.split('.').pop();
            
            if(extension === "xlsx" || extension === "xls"){
                
                newFileName = generateRandomFileName(data[0].name);
                setStatus({
                    ...status,
                    uploading : true,
                })
                uploadToServer(data[0]);
                return;
            }else{
                enqueueSnackbar('Invalid file, please try again!!!',{
                    variant:"error",
                    anchorOrigin:{
                        vertical:'top', 
                        horizontal:'right'
                    },
                    action : action
                });
            }
        }
    };


    const uploadToServer = (file:any) => {
        var upload:any = new tus.Upload(file, {
            endpoint: "/api/file/",
            retryDelays: [0, 3000, 5000, 10000, 20000],
            resume : false,
            chunkSize : 1000000,
            metadata: {
                filename: newFileName,
                filetype: file.type
            },
            onError: (error) => {
                enqueueSnackbar('Something went wrong, please try again!!',{
                    variant:"error",
                    anchorOrigin:{
                        vertical:'top', 
                        horizontal:'right'
                    },
                    action : action
                });

                setStatus({
                    ...status,
                    uploading : false,
                })
            },
            onProgress: (bytesUploaded, bytesTotal) => {

                // console.log(bytesTotal);
                setStatus({
                    uploading   :   true,
                    percent     :   parseInt((bytesUploaded / bytesTotal * 100).toFixed(2),10)
                })
            },
            onSuccess: () => {
                
                notify.current.add({
                    filename    : newFileName,
                    type        : props.type, 
                });

                enqueueSnackbar('File successfully uploaded!!!',{
                    variant:"success",
                    anchorOrigin:{
                        vertical:'top', 
                        horizontal:'right'
                    },
                    action : action
                });

                console.error("redux here");
                props.setOpen(false);
                setStatus({
                    ...status,
                    uploading:false
                })
            }
        })
     
        // Start the upload
        upload.start();
    };


    const generateRandomFileName = (name:string) =>{
        let extension = name.slice((name.lastIndexOf(".") - 1 >>> 0) + 1);
        let filename = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)+Math.random().toString(36).substring(2, 15);
        return filename+extension;
    }

    return(
         <React.Fragment>
            <Requests.Notification request={notify} />
            <Dialog
                maxWidth="xs"
                open={props.open}
                onClose={ () => props.setOpen(false)}
                aria-labelledby="max-width-dialog-title"
                className="upload"
                disableBackdropClick
            >
                {/* <DialogTitle>Upload File</DialogTitle> */}
                <DialogContent>
                    {
                        status.uploading ?
                            <Paper className="uploading">
                                <LinearProgress variant="determinate" value={status.percent} />
                                <b>Uploading({status.percent})</b>
                            </Paper>
                        
                        :
                            <Paper
                                onDragEnter={dragAndDrop} 
                                onDragLeave={dragAndDrop} 
                                onDragOver ={dragAndDrop} 
                                onDrop     ={dragAndDrop}
                            >
                                <div className="start" ref={dragDiv}>
                                    <Button onClick={()=>input.current.click()} variant="contained" color="secondary"> browse </Button>
                                    <input ref={input} hidden accept=".xlsx, .xls" type="file" onChange={dragAndDrop} />
                                    <i>&nbsp;&nbsp;or drop files here</i>
                                </div>
                            </Paper>
                    }
                    <IconButton hidden={status.uploading} onClick={()=>props.setOpen(false)} className="close-upload" color="primary">
                        <Close />
                    </IconButton>
                </DialogContent>
            
            </Dialog>
        </React.Fragment>
    );
}

export default Upload;