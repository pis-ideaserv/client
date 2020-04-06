import React from 'react'
import { Divider } from '@material-ui/core';


interface Props{
    logo            :   string,
    menu_title      :   string,
    sidebar_list    :   any,
}

const SidebarMobile = (props:Props) => {
    return(
        <div
            className="swipe-list"
              role="presentation"
        >
            <div className="mobile-logo">
                <img src={props.logo} alt={props.menu_title} />
                <p>{props.menu_title}</p>
            </div>

            <Divider />
            {props.sidebar_list}
            <Divider />
        </div>
    );
}

export default SidebarMobile;