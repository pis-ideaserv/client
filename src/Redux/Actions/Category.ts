import { Category as MC } from './Types';

export const Category = (a:any) => {
        return (dispatch:any) => {
            dispatch({
                type    : MC,
                payload : a
            });
        }
}
