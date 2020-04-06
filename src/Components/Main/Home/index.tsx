import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationTitle } from 'Redux/Actions';
// import { AssignmentInd, Assignment, SupervisorAccount } from '@material-ui/icons';
import './HomeStyle.scss';
import { withRouter } from 'react-router-dom';
import { Dropbox, VanUtility, Account, ProgressWrench  } from 'mdi-material-ui';
import { Paper } from '@material-ui/core';
import Admin from './Admin';

const Home = (props:any) =>{
    const dispatch = useDispatch();
    const user = useSelector( (state:any) => state.UserAccount.data);

    useEffect( () =>{
        dispatch(NavigationTitle({title:'Home', control:'home'}));
    },[dispatch])


    return(
        <div>
            { user.level === 1 ?
                <Admin />
            :
                <div className="mx-auto" style={{marginTop:'150px'}}>
                    <React.Fragment>
                        <div className="justify-content-center row">
                            <div className="col-sm text-center iconButton" onClick={ () => props.history.push('/products')}>
                                <Paper>
                                    <div className="col"><Dropbox className="home-icon" /></div>
                                    <div className="col">Products</div>
                                </Paper>
                            </div>
                            
                            <div className="col-sm text-center iconButton" onClick={ () => props.history.push('/suppliers')}>
                                <Paper>
                                    <div className="col"><VanUtility className="home-icon" /></div>
                                    <div className="col">Suppliers</div>
                                </Paper>
                            </div>
                            
                        </div>
                    </React.Fragment>
                </div>
            }
        </div>
    )
}

export default withRouter(Home);