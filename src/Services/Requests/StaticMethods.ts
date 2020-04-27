import axios from 'axios';
import Url from 'Services/ServerUrl';
import { Token } from 'Services';


export interface Format{
    network_error : boolean,
    status        : number,
    data          : any,
}

interface request{
    url     :   string,
    headers  ?:   any,
    params  ?:   any,
    method  :   'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
}


export const request = async(data:request) =>{
    let config:any = data;
    let format:Format = {
        network_error : false,
        status        : 0,
        data          : '',
    }

    if(config.headers === undefined){
        config['headers'] = {
            'Content-Type'  :   'application/json',
            'Accept'        :   'application/json',
            'Authorization' :   'Bearer '+Token.get(),
        };
    }


    await axios(config).then( response => {
        format.status = response.status;
        format.data = response.data;    
    }).catch( async (error) =>{
        format = await handleError(error,config);
    });
    

    return format;
}


const retry =  async (request:request) =>{
    let ret = {};
    await axios(request).then( response => {
            ret = {success : true,response: response}; 
        }).catch( error =>{
            ret = {success : false,response: error};
        });

    return ret;
}



const refresh =  async() => {
    let ret = {};

    await axios({
        method  :   "POST",
        url     :   Url.refresh,
        headers :   {
            'Content-Type'  :   'application/json',
            'Accept'        :   'application/json',
            'Authorization' :   'Bearer '+Token.get(),
        },
    }).then( response => {
        ret = {
            success:true,
            response :response,
        }
    }).catch( error =>{
        ret = {
            success:false,
            response :error,
        }
    })

    return ret;
}


const handleError = async (error:any,request:request) =>{
    
    let format:Format = {
        network_error : false,
        status        : 0,
        data          : '',
    }

    if(!error.response){
        format.network_error = true;    
        return format;
    }

    switch(error.response.status){
        // case 429:
        //     let counter = 0;
        //     while(counter<3){
        //         let a:any;
        //         setTimeout(async () => {
        //             a = await recall();
        //             if(a.success){
        //                 format.status = a.response.status;
        //                 format.data = a.response.data;
        //                 return format;
        //             }else{
        //                 if(a.response && a.response.response.status === 429)
        //                     counter = counter + 1;
        //                 else{
        //                     format.network_error = false;
        //                     return format;
        //                 }
        //             }
        //         }, 5000);
        //     }
        //     format.network_error = false;
        //     return format;
        case 401:
            if(!Token.exist() && Url.login === request.url){
                format.data = error.response.data;
                format.network_error = false;
                format.status =error.response.status;
                return format;
            }

            let a:any = await refresh();

            if(a.success){
                let tok = a.response.data.token
                Token.save(tok);
                
                request.headers = {
                    'Content-Type'  :   'application/json',
                    'Accept'        :   'application/json',
                    'Authorization' :   'Bearer '+tok,
                }

                let b:any = await retry(request);
                if(b.success){
                    format.status = b.response.status;
                    format.data = b.response.data;
                    return format;
                }else{
                    format.network_error = false;
                    return format;
                }
            }else{
                format.network_error = false;
                return format;
            }
        default : 
            format.data = error.response.data;
            format.network_error = false;
            format.status =error.response.status;
            return format;
    }
}
