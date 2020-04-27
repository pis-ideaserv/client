import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { Requests } from 'Services';

const Caller = ():any => {

    const me:any = React.useRef();
    const product:any = React.useRef();
    const supplier:any = React.useRef();
    const users:any = React.useRef();
    const masterCodes:any = React.useRef();
    const reports:any = React.useRef();
    const notification:any = React.useRef();
    const log:any = React.useRef();
    

    const dispatch = useDispatch();
    const status = useSelector((state:any)=>state.status);
    const [ids,setIds] = React.useState(0);
    const interval = 60000;

    
     
    React.useEffect(()=>{

        if(!status.loggedIn){
            clearTimeout(ids);
        }
        if(status.called){
            clearInterval(ids);
            runFunction();
            let a:any = setInterval(runFunction,interval);
            setIds(a);
        }
    },[status.loggedIn,status.called]);


    const runFunction = async()=> {
        
    }


    return(
        <React.Fragment>
            <Requests.Auth request={me} />
            <Requests.Products request={product} />
            <Requests.Suppliers request={supplier} />
            <Requests.User request={users} />
            <Requests.MasterCodes request={masterCodes} />
            <Requests.Status request={reports} />
            <Requests.Notification request={notification} />
            <Requests.Logs request={log} />
        </React.Fragment>
    );
}

export default Caller;