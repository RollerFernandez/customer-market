import axios from 'axios';

axios.defaults.baseURL="https://customer-market.azurewebsites.net/";


const requestGenerico = {
    get: (url) => axios.get(url),
    post: (url, body) => axios.post(url, body),
    postFile: (url, body,type) => axios.post(url, body,type),
    put: (url, body) => axios.put(url, body),
    delete: (url,body) => axios.delete(url, body)
};

export default requestGenerico;