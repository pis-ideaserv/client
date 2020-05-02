import { Search as sr } from './Types';


const open = (params :boolean) => {
        
        return (dispatch:any) => {
            dispatch({
                type    : sr.open,
                payload : params,
            });
        }
}

type targets = "users" | "products" | "suppliers";
const target = (params :targets) => {

    return (dispatch:any) => {
        dispatch({
            type    : sr.target,
            payload : params,
        });
    }
}

const value = (params :string) => {

    return (dispatch:any) => {
        dispatch({
            type    : sr.value,
            payload : params,
        });
    }
}

interface param {
    query   : string,
    target  : targets,
}

const data = () =>{

    // switch (params.target){
    //     case "users" :
    //         return async (dispatch:any) => {

    //             dispatch({
    //                 type    : Users,
    //                 payload : '',
    //             });

    //             await Requests.User.search(params.query).then((response)=>dispatch({
    //                 type    : Users,
    //                 payload : response,
    //             }));
    //         }

    //     case "products":
    //         return async (dispatch:any) => {
    //             dispatch({
    //                 type    : Products,
    //                 payload : '',
    //             });

    //             await Requests.Products.search(params.query).then((response)=>dispatch({
    //                 type    : Products,
    //                 payload : response,
    //             }));
    //         }
    //     case "suppliers":
    //         return async (dispatch:any) => {
    //             dispatch({
    //                 type    : Suppliers,
    //                 payload : '',
    //             });

    //             await Requests.Suppliers.search(params.query).then((response)=>dispatch({
    //                 type    : Suppliers,
    //                 payload : response,
    //             }));
    //         }
    // }

}

export default {
    open,
    target,
    value,
    data
}