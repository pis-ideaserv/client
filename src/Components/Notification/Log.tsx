import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Paper, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@material-ui/core';
import {request} from 'Services/Requests/StaticMethods';
import Url from 'Services/ServerUrl';
import Skeleton from '@material-ui/lab/Skeleton';
const Log = (props:any) => {

    const [data,setData] = React.useState(null);
    const [params,setParams] = React.useState({per_page:10,page:1});

    React.useEffect(()=>{
        if(props.open && props.data !== null){
            call(params);
        }
    },[props.open]);


    const call = async (data:any) => {
        let a = await request({
            url : Url.filelog+'/'+props.data.filename,
            method : "GET",
            params : data,
        });

        if(a.status === 200){
            setData(a.data);
            return;
        }
        setData(null);
    }


    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,newPage: number) => {
        let pams:any = params;
        pams.page=newPage+1;
        call(pams);
        setParams(pams);
        // dispatch(NotificationsParams(pams));
        // dispatch(Notifications(pams));
    }
     
    


    const skeletonTable = () => {
        let a:any = [];
        const tableCell:any = <TableCell align="right"><Skeleton variant="rect" width={'100%'} height={20}  /></TableCell>;
        
        for(let i = 0;i < 10;i++ ){
            a.push(
                <TableRow key={i}>
                    {tableCell}
                    {tableCell}
                </TableRow>
            );
        }

        return a;
    }

    return (
        <Dialog
            open={props.open}
            onClose={()=>props.setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Upload log</DialogTitle>
            <DialogContent>
                <Paper className="notification-table">
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>id</TableCell>
                                    <TableCell>Error Message</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    data !== null ? 
                                        data.data.map((value:any,key:number) =>
                                            <TableRow hover key={key}>
                                                <TableCell>{value.id}</TableCell>
                                                <TableCell dangerouslySetInnerHTML={{__html:value.message}}></TableCell>
                                            </TableRow>
                                        )
                                    : skeletonTable()
                                }
                                
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[]}
                            component="div"
                            count={data ? data.meta.total : 10}
                            rowsPerPage={10}
                            page={data ? data.meta.current_page -1  : 0}
                            backIconButtonProps={{
                                'aria-label': 'previous page',
                            }}
                            nextIconButtonProps={{
                                'aria-label': 'next page',
                            }}
                            onChangePage={handleChangePage}
                            // onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                </Paper>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>props.setOpen(false)} color="primary" autoFocus>
                    Exit
                </Button>
            </DialogActions>
        </Dialog>
    );
}   

export default Log;