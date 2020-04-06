import { UserAccount as UA } from './Types';

export const UserAccount = (a:JSON) => {
        return (dispatch:any) => {
            dispatch({
                type    : UA,
                payload : a
            });
        }
}
