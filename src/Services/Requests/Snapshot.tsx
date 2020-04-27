import React from 'react';
import { Requests } from 'Services';

type request =  "me"|"product"|"supplier"|"users"|"masterCodes"|
                "reports"|"notification"|"log";
                   
const Snapshot = (props:any) => {
    const me:any = React.useRef();
    const product:any = React.useRef();
    const supplier:any = React.useRef();
    const users:any = React.useRef();
    const masterCodes:any = React.useRef();
    const reports:any = React.useRef();
    const notification:any = React.useRef();
    const log:any = React.useRef();

    React.useImperativeHandle(props.request,()=>({
        sync : async (request:request,snapshot:number) => {
            switch(request){
                case "log" : return await log.current.show({snapshot});
                case "masterCodes" : return await masterCodes.current.show({snapshot});
                case "me" : return await me.current.show({snapshot});
                case "notification" : return await notification.current.show({snapshot});
                case "product" : return await product.current.show({snapshot});
                case "reports" : return await reports.current.show({snapshot});
                case "supplier" : return await supplier.current.show({snapshot});
                case "users" : return await users.current.show({snapshot});
            }
        }
    }))


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
    )

}

export default Snapshot;