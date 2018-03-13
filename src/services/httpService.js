import axios from 'axios';
import StorageService from '../utils/storage';

export default class httpService {
    apiHost = () => {
        
      
        
       // return 'https://api.garson.co/';
        return 'http://10.0.2.2:8000/';
    };

    headers_common = () => {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Accept-Language': this.props.user.lang
        }
    };

    headers_authorised = () => {
        return {
            'Authorization': 'Bearer '
        }
    };


    getRequest = (uri, body = {}, headers = {}) => {
        let url = this.apiHost() + uri;
        return axios.get(url, {headers: headers, params: body});
    };

    postRequest = (uri, body, headers = {}) => {
        let url = this.apiHost() + uri;
        return axios.post(url, body, {headers: headers});
    };

    putRequest = (uri, body, headers = {}) => {
        let url = this.apiHost() + uri;
        return axios.put(url, body, {headers: headers});
    };

    deleteRequest = (uri, body = {}, headers = {}) => {
        let url = this.apiHost() + uri;
        return axios.delete(url, {headers: headers});
    };

    request = (uri, type = 'get', body = {}) => {
        let headers = {...this.headers_common()};
        let token = StorageService.get('token');
        if (token) {
            headers = {
                'Authorization': `Bearer ${token}`
            }
        }

        return NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected) {
                let promise = null;
                switch (type) {
                    case 'get':
                        promise = this.getRequest(uri, body, headers);
                        break;
                    case 'post':
                        promise = this.postRequest(uri, body, headers);
                        break;
                    case 'put':
                        promise = this.putRequest(uri, body, headers);
                        break;
                    case 'delete':
                        promise = this.deleteRequest(uri, body, headers);
                        break;
                    default:
                        promise = this.getRequest(uri, body, headers);
                        break;
                }
                return promise.then(response => {
                    return Promise.resolve(response.data);
                }).catch(err => {
                    if (err.response.status === 401) {
                        //store.dispatch(push('/login'));
                        //Actions.push("signUpView");
                    }
                    return Promise.reject(err.data);
                });
            } else {
                alert("Please check your internet connection");
                return Promise.reject("Please check your internet connection");
            }
        });
    };

    menu = async (id, method = 'get', body = {}) => {
        let uri = `companies/${id}/menu?per_page=500`;
        return this.request(uri, method, body);
    };

    device_token = async (method = 'get', body = {}) => {
        let uri = 'users/refresh-token';
        return this.request(uri, method, body);
    };

    orders = async (id = false, method = 'get', body = {}) => {
        let uri = 'orders';
        if (id) {
            uri += '/' + id;
        }
        return this.request(uri, method, body);
    };

    order = async (id, method = 'get', body = {}) => {
        let uri = 'orders/last?company_id=' + id;
        return this.request(uri, method, body);
    };

    companies = async (method = 'get', body = {}) => {
        let uri = 'companies?locations=true&last_order=true';
        return this.request(uri, method, body);
    };

    register = async (body = {}) => {
        let uri = 'register';
        return this.request(uri, 'post', body);
    };

    verify = async (method = 'get', body = {}) => {
        let uri = 'verify';
        return this.request(uri, method, body);
    };

}