import React, { useEffect } from 'react';
import {Backdrop, SwipeableDrawer } from '@material-ui/core';
import {Home, Assessment} from '@material-ui/icons';
import Topbar from './Topbar';
import SidebarDesktop from './SidebarDesktop';
import './NavigationStyle.scss';
import {useSelector, useDispatch} from 'react-redux';
import {Token} from 'Services';
import SidebarMobile from './SidebarMobile';
import SidebarList from './SidebarList';
import { withRouter } from 'react-router';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import {loggedIn,caller} from 'Redux/Actions';
import { Dropbox, VanUtility, Account, ProgressWrench  } from 'mdi-material-ui';
import Notification from 'Components/Notification';

const Navigation = (props:any) => {
	
	const logo = "/img/ideaserv.png";
	let sidebar_properties = [
		{
			name : "Home",
			control : "home",
			icon : Home,
			url  : "/",
			
		},{
			name : "Products",
			control : "products",
			icon : Dropbox,
			url  : '/products',
			
		},{
			name :	"Product Maintenance",
			control : "product_master_file_maintenance",
			icon :  ProgressWrench,
			url  :  '/summary'
		},{
			name : "Suppliers",
			control : "suppliers",
			icon :  VanUtility,
			url  : "/suppliers", 
		},{
			name : "Users",
			control : "users",
			icon :  Account,
			url  : "/users", 
			props: '',
		},{
			name : "Reports",
			control : "reports",
			icon :  Assessment,
			url  : "/reports", 
			props: '',
		}
	];






	
	const [ sidebar , setSidebar ] = React.useState(false);
	const [ sidebarProps, setSidebarProps ] = React.useState({});
	const [ swipe, setSwipe ] = React.useState(false);
	const [ width, setWidth ] = React.useState( window.innerWidth );
	const [ search, setSearch ] = React.useState( false );
	const [ user, setUser ] = React.useState(null);
	const reduxUser = useSelector( (state:any) => state.UserAccount.data);
	const menu_title = useSelector( (state:any) => state.NavigationTitle.title);
	const dispatch = useDispatch();
	

	useEffect(()=>{

		//subscribe to window event listener 
		window.addEventListener('resize', updateBrowserWidth);

		let sidebars:any = {};
		sidebar_properties.forEach((value) =>{
			if(value.props){
				sidebars[value.name] = false;
			}
		});

		setSidebarProps(sidebars);
		
		//clean it up when unmounted
		return () => {
			window.removeEventListener('resize', updateBrowserWidth);
		}
	},[reduxUser]);
	

	if(reduxUser.level !== 1){
		sidebar_properties = [
			{
				name : "Home",
				control : 'home',
				icon : Home,
				url  : "/" 
			},{
				name : "Products",
				control : "products",
				icon : Dropbox,
				url  : '/products',
			},{
				name : "Suppliers",
				control : "suppliers",
				icon :  VanUtility,
				url  : "/suppliers", 
			}/*,{
				name : "Reports",
				icon :  Assignment,
				url  : "/reports", 
			},{
				name : "Profile Settings",
				icon :  Settings,
				url  : "/users", 
			}*/
		]
	}


	//functions ----------------------------------------
	const updateBrowserWidth = () =>{
		setWidth( window.innerWidth );
	}

	const toggleUser = (event: React.MouseEvent<HTMLElement>):void => {
		setUser(user ? null : event.currentTarget);
	}

	const toggleSidebar = ():void =>{
		
		//toggle backdrop in search when toggling sidebar
		if(search){
			toggleSearch(false);
		}
		setSidebar(!sidebar);
	}

	const toggleSearch = (a:boolean):void=>{

		//toggle backdrop in sidebar when toggling search
		if(sidebar){
			toggleSidebar();
		}
		setSearch(a);
	}

	const swipeDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
		if ( event && event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
			return;
		}
		setSwipe(!swipe);
	};

	const logout = () =>{
		Token.remove();
		dispatch(loggedIn(false));
		return;
	}


	const navigate = (url:string) => {
		props.history.push(url);
		return;
	}


	return(
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
		<div>
			<SwipeableDrawer
				open={swipe}
		        onClose={swipeDrawer}
		        onOpen={swipeDrawer}
			>
		    	<SidebarMobile
					logo 		= {logo}
					menu_title	= {menu_title}
					sidebar_list= {
						<SidebarList
							sidebar 			= {sidebar}
							sidebar_properties 	= {sidebar_properties}
							sidebarProps 		= {sidebarProps}
							setSidebarProps 	= {setSidebarProps}
							toggleSidebar		= {toggleSidebar}
						/>
					}
				/>
		    </SwipeableDrawer>
						
		
			<Topbar 
				state 			= {{width,sidebar,user,search}}
				logo  			= {logo}
				menu_title 		= {menu_title}
				user 			= {reduxUser}
				toggleSearch	= {toggleSearch}
				toggleSidebar	= {toggleSidebar}
				toggleUser		= {toggleUser}
				swipeDrawer		= {swipeDrawer}
				logout			= {logout}
				location		= {props.location.pathname}
				navigate 		= {navigate}
			/>
		
			<SidebarDesktop
				state			= {{sidebar}}
				sidebar_list	= {
					<SidebarList
						sidebar 			= {sidebar}
						sidebar_properties 	= {sidebar_properties}
						sidebarProps 		= {sidebarProps}
						setSidebarProps 	= {setSidebarProps}
						toggleSidebar		= {toggleSidebar}
					/>
				}
				toggleSidebar	= {toggleSidebar}
			/>
			
			{
				reduxUser.level !== 3 ? <Notification /> : ''
			}
			<Backdrop open={sidebar} onClick={toggleSidebar} className="backdrop-desktop disable-z-index"/>
			<Backdrop open={search} onClick={ () => toggleSearch(false) } className="backdrop-search disable-z-index"/>
		</div>
		</MuiPickersUtilsProvider>
	)
}

export default withRouter(Navigation);