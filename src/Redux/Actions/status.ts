import { status as stat } from './Types';

export const loggedIn = (a:boolean) => {
    return (dispatch:any) => {
        dispatch({
            type    : stat.loggedIn,
            payload : a
        });
    }
}

export const error = (a:boolean) => {
    return (dispatch:any) => {
        dispatch({
            type    : stat.loggedIn,
            payload : a
        });
    }
}