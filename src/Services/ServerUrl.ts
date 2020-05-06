const server_url = 'http://localhost:8000/api/';

const prefix={
    auth        : 'auth/',
    user        : 'users/',
    products    : 'products/',
    supplier    : 'suppliers/',
    master      : 'product-master-list/',
    category    : 'category/',
    logs        : 'logs/',
    status      : 'status/',
    notification: 'notification/',
}

const Url = {
    login               :   server_url+prefix.auth+'login',
    logout              :   server_url+prefix.auth+'logout',
    refresh             :   server_url+prefix.auth+'refresh',
    me                  :   server_url+prefix.auth+'me',
    user                :   server_url+prefix.user,
    products            :   server_url+prefix.products,
    suppliers           :   server_url+prefix.supplier,
    productMasterList   :   server_url+prefix.master,
    category            :   server_url+prefix.category,
    logs                :   server_url+prefix.logs,
    status              :   server_url+prefix.status,
    notification        :   server_url+prefix.notification,
    file                :   server_url+'file',
}

export default Url;
