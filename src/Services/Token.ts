import Cookies from 'universal-cookie';

export default class Token{
        
    public static save(token:any):void{
        // this.remove();
        let a = new Date();
        a.setDate(a.getDate()+ 30); //1440 1 day

        const cookies = new Cookies();
        cookies.set('token',token,{
            expires: a,
        })
    }

    public static update():void{
        const cookies = new Cookies();

        const token = cookies.get('token');
        this.save(token);
    }

    public static remove():void{
        const cookies = new Cookies();
        cookies.remove('token');
        return;
    }

    public static get():any{
        let token = new Cookies().get('token');

        if(token !== '' || token !== null || token !== undefined){
            this.update();
        }
        return token;
    }

    public static exist():any{  
        const cookies = new Cookies();
        const token = cookies.get('token');

        if(token === undefined || token === null || token === ''){
            return false;
        }
        return true;
    }

}