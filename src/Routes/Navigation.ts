import * as Component from 'Components';
import {ComponentMiddleware,LoginMiddleware} from 'Middleware';

export const Navigation = [
    {
        path        : "/",
        component   : Component.Home,
        middleware  : ComponentMiddleware,
        exact       : true,
    },{
        path        : "/login",
        component   : Component.Login,
        middleware  : LoginMiddleware,
        exact       : false,
    },{
        path        : "/products",
        component   : Component.Products,
        middleware  : ComponentMiddleware,
        exact       : false
    },{
        path        : "/suppliers",
        component   : Component.Suppliers,
        middleware  : ComponentMiddleware,
        exact       : false
    },{
        path        : "/users",
        component   : Component.Users,
        middleware  : ComponentMiddleware,
        exact       : false
    },{
        path        : "/activities",
        component   : Component.Reports,
        middleware  : ComponentMiddleware,
        exact       : false
    },{
        path        : '/settings',
        component   : Component.Settings,
        middleware  : ComponentMiddleware,
        exact       : false
    },{
        path        : '/summary',
        component   : Component.Summary,
        middleware  : ComponentMiddleware,
        exact       : false,
    }
];
