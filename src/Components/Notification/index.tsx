import React from 'react';
import { Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button, Table, TableHead, TableRow, TableBody, TableCell, TablePagination, Fab } from '@material-ui/core';
import './notification.style.scss';
import Skeleton from '@material-ui/lab/Skeleton';
import Chip from '@material-ui/core/Chip';
import moment from 'moment';
import { Cached } from '@material-ui/icons';
import {useSelector, useDispatch} from 'react-redux';
import {NotificationsParams,Notifications} from 'Redux/Actions';
import Log from './Log';


const Notification = () => {

    const [open,setOpen] = React.useState(false);
    const [log,setLog] = React.useState(false);
    const [data,setData] = React.useState(null);
    const notification = useSelector((state:any)=>state.Notifications);

    const dispatch = useDispatch();


    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,newPage: number) => {
        let pams:any = notification.params;
        pams.page=newPage+1;
        dispatch(NotificationsParams(pams));
        dispatch(Notifications(pams));
    }

    const skeletonTable = () => {
        let a:any = [];
        const tableCell:any = <TableCell align="right"><Skeleton variant="rect" width={'100%'} height={20}  /></TableCell>;
        
        for(let i = 0;i < 10;i++ ){
            a.push(
                <TableRow key={i}>
                    {tableCell}
                    {tableCell}
                    {tableCell}
                    {tableCell}
                    {tableCell}
                </TableRow>
            );
        }

        return a;
    }

    const setErrorMessage = (value:any) => {
        setData(value);
        setLog(true);
    }

    return(
        <React.Fragment>
            <Log open={log} setOpen={setLog} data={data} />
            <Paper className="notification" onClick={()=>setOpen(true)}>
                Upload Status
            </Paper>
            
            <Dialog
                fullWidth={true}
                maxWidth="md"
                open={open}
                onClose={()=>setOpen(false)}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title">Upload Status
                    <Fab size="small" style={{position:'absolute',right:'30px'}} disabled={notification.status!=="done"} className={notification.status === "done" ? "rotate pause":"rotate" } onClick={()=>dispatch(Notifications())} color="primary" >
                        <Cached />
                    </Fab>
                </DialogTitle>
                
                <DialogContent>
                    <Paper className="notification-table">
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>id</TableCell>
                                    <TableCell>Target</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Result</TableCell>
                                    <TableCell>Date</TableCell>
                                </TableRow>
                                
                            </TableHead>
                            <TableBody>
                                {
                                    notification.data ?
                                        notification.data.data.data.map((value:any,key:number) =>(
                                            <TableRow hover key={key} className="pointer" onDoubleClick={()=>value.status !== "failed" ? setErrorMessage(value) : null}>
                                                <TableCell>{value.id}</TableCell>
                                                <TableCell>{value.type}</TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={value.status} 
                                                        color={
                                                            value.status === "done" ? "default" :
                                                            value.status === "processing" ? "primary" :"secondary"
                                                        }
                                                        style={{
                                                            textTransform   : "uppercase",
                                                            fontWeight      : "bolder",
                                                            cursor          : "pointer",
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>{value.result === null ? "" :  value.result.hasOwnProperty('message') ? value.result.message : value.result.success+'/'+value.result.total+' were sucessfully imported.'}</TableCell>
                                                <TableCell>{moment(value.created_at).format('lll')}</TableCell>
                                            </TableRow>
                                        ))
                                    : 
                                    skeletonTable()
                                }
                                
                            </TableBody>
                        </Table>    
                        <TablePagination
                            rowsPerPageOptions={[]}
                            component="div"
                            count={notification.data ? notification.data.data.meta.total : 10}
                            rowsPerPage={10}
                            page={notification.data ? notification.params.page-1 : 0}
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
                    <Button variant="contained" color="primary" onClick={()=>setOpen(false)} >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default Notification;