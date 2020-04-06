import React from 'react'
import {Drawer, Divider} from '@material-ui/core';


interface Props{
    
    state           :   {
		sidebar		: boolean
	},
    sidebar_list    :   any,

    toggleSidebar() :   void,
}


const SidebarDesktop = (props:Props) => {

    return(
        <Drawer
        	variant="permanent"
        	className={props.state.sidebar ? "sidebar-open" : "sidebar-close"}
			open={props.state.sidebar}
			// onMouseEnter={()=> props.toggleSidebar()}
			// onMouseLeave={()=> this.toggleSidebar()}
      	>
			{props.sidebar_list}
			<Divider />
      	</Drawer>
    );
}

export default SidebarDesktop;
