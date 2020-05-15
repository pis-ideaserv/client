import React from 'react';
import { CircularProgress,Grid } from '@material-ui/core';
import "./sync.scss";

const Sync = () => {

    const me:any = React.useRef();
    const product:any = React.useRef();
    const supplier:any = React.useRef();
    const users:any = React.useRef();
    const masterCodes:any = React.useRef();
    const reports:any = React.useRef();
    const log:any = React.useRef();
    
    const [finish,setFinish] = React.useState(false);
    const [message,setMessage] = React.useState('Loading...');
    
    const callerList:any={
        me          :   {name: "me",           funct : me},
        product     :   {name: "product",      funct : product},
        supplier    :   {name: "supplier",     funct : supplier},
        users       :   {name: "users",        funct : users},
        masterCodes :   {name: "masterCodes",  funct : masterCodes},
        reports     :   {name: "reports",      funct : reports},
        log         :   {name: "log",          funct : log},
    };

    return (
        <Grid
            container
            spacing={0}
            alignItems="center"
            justify="center"
            style={{ minHeight: "100vh" }}
        >
            <Grid className="text-center" item xs={6}>
                <CircularProgress size={60} /> <br />
                <div>&nbsp;{message}</div>
            </Grid>
        </Grid>
    )
};

export default Sync;