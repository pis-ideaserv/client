import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import * as Component from 'Components';
import {Navigation} from './Navigation';
import { useSelector } from 'react-redux';
import Error from './Error';
import Caller from 'Services/Caller';

const Navigations = (props:any) =>{

    const status = useSelector((state:any)=>state.status);

    return(
        <React.Fragment>
            {/* <div className="container-body"> */}
                <div className="container">
                    <Caller />
                    <BrowserRouter> 
                        {status.loggedIn && status.caller ? <Component.Navigation />: ''}
                        <Switch>
                            {
                                Navigation.map((element,index) => 
                                    <Route 
                                        exact={element.exact} 
                                        path ={element.path} 
                                        render= {(props) => <element.middleware {...props} component={element.component} />} 
                                        key={index}
                                    />
                                )
                            }
                            <Route component={Component.NotFound} />
                            <Error {...props} />
                        </Switch>
                    </BrowserRouter>
                </div>
            {/* </div> */}
        </React.Fragment>
    );
}

export default Navigations;