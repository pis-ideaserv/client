import { NavigationTitle as NT } from './Types';

type control = "home" | "products" | "product_master_file_maintenance" | "suppliers" | "users" | "reports";

interface Navigation {
    title   ?: string,
    control : control,
}

export const NavigationTitle = (a:Navigation) => {
        return (dispatch:any) => {
            dispatch({
                type    : NT,
                payload : a
            });
        }
}
