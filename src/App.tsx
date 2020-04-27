import React from 'react';
import Navigations from 'Routes';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import { SnackbarProvider } from 'notistack';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import './App.scss';
import pouchdb from 'pouchdb';

const App = () => {

    return(
        <Provider store={store}>
            <SnackbarProvider 
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                maxSnack={10}
                autoHideDuration ={4000}
            >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Navigations />
                </MuiPickersUtilsProvider>
            </SnackbarProvider>
        </Provider>
    );
}

export default App;
