import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import Popover from '@material-ui/core/Popover';
import {ProductsTable} from 'Redux/Actions';
import { Fade, Paper, Typography, List, ListItemText, ListItem, Checkbox, ListItemSecondaryAction } from '@material-ui/core';

interface TableOrder{
    anchor      : HTMLButtonElement | null,
    open        : boolean,
    setOpen     : any
}


const TableOrder = (props:TableOrder)=>{
    const table = useSelector((state:any) => state.Products.table);
    const dispatch = useDispatch();


    const handleToggle = (value:any) => (event:any) => {        
        // console.log(value);
        
        dispatch(ProductsTable({
            ...table,
            [value] : {
                ...table[value],
                show : !table[value].show
            }
        }));
    }


    return(
        <Popover 
            open={props.open}
            onClose={()=>props.setOpen(false)}
            anchorEl={props.anchor} 
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
        >
            <Paper className="table-order">
                <div className="title">
                    Table Display
                </div>

                <List dense>
                    {
                        Object.keys(table).map((value) =>(
                            <ListItem key={value}>
                                <ListItemText primary={table[value].name} />
                                <ListItemSecondaryAction>
                                    <Checkbox 
                                        checked={table[value].show} 
                                        inputProps={{'aria-label':'primary checkbox'}}
                                        onClick = {handleToggle(value)}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))
                    }
                </List>
            </Paper>
      </Popover>
    )
}

export default TableOrder;