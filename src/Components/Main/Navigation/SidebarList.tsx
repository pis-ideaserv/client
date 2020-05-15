import React from 'react';
import {Collapse, ListItemText, ListItemIcon, ListItem, List, Popover, makeStyles, Theme, createStyles, Fade, Paper } from '@material-ui/core';
import {ExpandLess, ExpandMore, ArrowRightAlt} from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import {useSelector} from 'react-redux';
import Popper,{ PopperPlacementType } from '@material-ui/core/Popper';



const styles = {
    hidden : {
        visibility:'hidden',
    },
    inherited : {
        position : 'inherit',
    },
    shadowed : {
        boxShadow : '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
    },
    icon : {
        backgroundColor : '#3f50b5',
        color           : 'white',
        borderRadius    : '20px',
        padding         : '2px',
    }
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position : 'inherit'
        },
        list : {
            root : {
                visibility : 'hidden',
                '&:hover' : {
                    visibility : 'visible'
                }
            }
        }

    }),
);

const SidebarList = (props:any) => {
    const control = useSelector( (state:any) => state.NavigationTitle.control);
    // const classes = useStyles(props);

    const [popperOpen,setPopperOpen] = React.useState(false);
    const [popperAnchor, setPopperAnchor] = React.useState<HTMLButtonElement | null>(null);
    const [popperTitle,setPopperTitle] = React.useState<string>();
    const [popperActive,setPoppperActive] =  React.useState(false);


    let list = props.sidebar_properties;
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    function handlePopoverOpen(event: React.MouseEvent<HTMLElement, MouseEvent>) {
        setAnchorEl(event.currentTarget);
    }

    function handlePopoverClose() {
        setAnchorEl(null);
    }

    const open = Boolean(anchorEl);

    const popper = (event:any,title:any,open:boolean) => (
        event: any,
      ) => {
        if(!props.sidebar){
            // console.log(event);
            // console.log(event);
            setPopperTitle(title.name);
            setPopperAnchor(event.currentTarget);
            setPopperOpen(open);
            setPoppperActive(open ? title.control === control ? true : false : false);
        }  
    };

    return(
        <React.Fragment>
            <Popper open={popperOpen} anchorEl={popperAnchor} placement="right" transition style={{zIndex:3}}>
                {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={0}>
                    <Paper className={popperActive ? "sidebar-popper active-nav" : "sidebar-popper" } style={{color:'#020202b5'}}>
                        {popperTitle}
                    </Paper>
                </Fade>
                )}
            </Popper>


            <List /*className={!props.sidebar ? classes.root : ''}*/ style={{paddingTop:'4px'}}>
                {list.map((text:any, index:number) => (
                    <React.Fragment key={index} >
                        <ListItem onMouseEnter={(event) => popper(event,text,true)} onMouseLeave={(event) => popper(event,'',false)} className={text.control === control ? "active-nav" : ""} button onClick={()=>{
                            
                            // if(!props.sidebar){
                            //     props.toggleSidebar();
                            // }

                            if(!text.props){
                                if(props.location.pathname !== text.url){
                                    props.history.push(text.url);
                                }
                            }else{
                                
                                props.setSidebarProps({
                                    [text.name] : !props.sidebarProps[text.name],
                                });
                            
                            }

                        }}
                        >
                            {
                                (!text.props) ? 
                                    <React.Fragment >
                                        <ListItemIcon >{<text.icon style={styles.icon} />}</ListItemIcon>
                                        <ListItemText /*className={classes.list}*/>{text.name}</ListItemText>
                                    </React.Fragment>
                                : 
                                    <React.Fragment>
                                        <ListItemIcon>  
                                            {<text.icon />}
                                        </ListItemIcon>
                                        <ListItemText>{text.name}</ListItemText>
                                        {props.sidebarProps[text.name] ? <ExpandLess /> : <ExpandMore />}
                                    </React.Fragment>

                            }
                        </ListItem>

                        {
                            (text.props) ? 
                                <Collapse in={props.sidebarProps[text.name]} timeout="auto" unmountOnExit className={!props.sidebar ? "hide-sidebar" : ""}>
                                    <List component="div" disablePadding>
                                        {
                                            text.props.map((value:any,key:number)=>(
                                                <ListItem button key={key} className="nestedSidebar" 
                                                    
                                                >
                                                    <ListItemIcon><ArrowRightAlt /></ListItemIcon>
                                                    <ListItemText >
                                                        {value.name}
                                                    </ListItemText>								
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                </Collapse>
                                : ''
                        }
                    </React.Fragment>
                ))}
            </List>
        </React.Fragment>
    );
}

export default withRouter(SidebarList);