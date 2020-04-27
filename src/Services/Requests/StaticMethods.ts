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
    header  ?:   any,
    data    ?:   {},
    params  :   boolean,
    method  :   'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
}


export const request = async(data:request) =>{


    let header = {};
    let format:Format = {
        network_error : false,
        status        : 0,
        data          : '',
    }

    if(data.header !== undefined){
        header = data.header;
    }else{
        header = {
            'Content-Type'  :   'application/json',
            'Accept'        :   'application/json',
            'Authorization' :   'Bearer '+Token.get(),
        }
    }

    await axios({
        method  :   data.method,
        url     :   data.url,
        headers :   header,
        params  :   data.params ? data.data : '',
    }).then( response => {
        format.status = response.status;
        format.data = response.data;    
    }).catch( async (error) =>{
        format = await handleError(error,data);
    });
    
    return format;

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


    const recall = async() => {


        let header = {};   
        let ret = {};
        
        if(request.header !== undefined){
            header = request.header;
        }else{
            header = {
                'Content-Type'  :   'application/json',
                'Accept'        :   'application/json',
                'Authorization' :   'Bearer '+Token.get(),
            }
        }
        await axios({
            method  :   request.method,
            url     :   request.url,
            headers :   header,
            params  :   request.params ? request.data : '',
        }).then( response => {
            ret = {
                success : true,
                response: response
            };
        }).catch( error =>{
            ret = {
                success : false,
                response: error,
            };
        });

        return ret;
    }

    const refresh = async () =>{

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


    switch(error.response.status){
        case 429:
            let counter = 0;
            while(counter<3){
                let a:any;
                setTimeout(async () => {
                    a = await recall();
                    if(a.success){
                        format.status = a.response.status;
                        format.data = a.response.data;
                        return format;
                    }else{
                        if(a.response && a.response.response.status === 429)
                            counter = counter + 1;
                        else{
                            format.network_error = false;
                            return format;
                        }
                    }
                }, 5000);
            }
            format.network_error = false;
            return format;
        case 401:
            let a:any = await refresh();


            if(a.success){

                // console.log(a.response.data.token);
                Token.save(a.response.data.token);

                let b:any = await recall();
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