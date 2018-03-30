
export default class apiService {

    setProps(props, t = false) {
        this.props = props;

        if (t)
            console.log(props);

        if (this.props.hasOwnProperty('user'))
            this.user = this.props.user;


        return this;
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


    apiHost = () => {

        //return 'https://api.garson.co/';
          return 'http://10.0.2.2:8000/';
    };



    menu = async (id, method = 'get', body = {}, doneFunc = false, successFunc = false, errorFunc = false) => {

        let uri = this.apiHost() + 'companies/' + id + '/menu?per_page=500';

        return this.request(uri, method, body, doneFunc, successFunc, errorFunc);
    };

    device_token = async (method = 'get', body = {}, doneFunc = false, successFunc = false, errorFunc = false) => {
        let uri = this.apiHost() + 'users/refresh-token';

        let request = this.request(uri, method, body, doneFunc, successFunc, errorFunc);

        return request;

    };

    orders = async (id = false, method = 'get', body = {}, doneFunc = false, successFunc = false, errorFunc = false) => {
        let uri = this.apiHost() + 'orders';

        if (id) {
            uri += '/' + id;
        }

        return this.request(uri, method, body, doneFunc, successFunc, errorFunc);
    };

    order = async (id, method = 'get', body = {}, doneFunc = false, successFunc = false, errorFunc = false) => {

        let uri = this.apiHost() + 'orders/last?company_id=' + id;

        return this.request(uri, method, body, doneFunc, successFunc, errorFunc);
    };

    companies = async (method = 'get', body = {}, doneFunc = false, successFunc = false, errorFunc = false) => {
        let uri = this.apiHost() + 'companies?locations=true&last_order=true';

        return this.request(uri, method, body, doneFunc, successFunc, errorFunc);
    };

    register = async (method = 'get', body = {}, doneFunc = false, successFunc = false, errorFunc = false) => {
        let uri = this.apiHost() + 'register';

        return this.request(uri, method, body, doneFunc, successFunc, errorFunc);

    };

    verify = async (method = 'get', body = {}, doneFunc = false, successFunc = false, errorFunc = false) => {
        let uri = this.apiHost() + 'verify';

        return this.request(uri, method, body, doneFunc, successFunc, errorFunc);
    };

    request = async (uri, method = 'get', body = {}, doneFunc = false, successFunc = false, errorFunc = false) => {
        let headers_authorised = {};

        if (this.hasOwnProperty('user') && this.user.hasOwnProperty('token')) {
            headers_authorised = this.headers_authorised();
            headers_authorised['Authorization'] = headers_authorised['Authorization'] + this.user.token;


        }

        let headers = {
            method: method,
            headers: { ...this.headers_common(), ...headers_authorised },
        };
        if (method != 'get' && body != false) {
            headers.body = JSON.stringify(body);
        }

        try {
            let response = await fetch(uri, headers);


            return this.responseParse(response, doneFunc, successFunc, errorFunc)
        } catch (error) {


            if (isFunction(doneFunc)) doneFunc();
            if (isFunction(errorFunc)) errorFunc(error);

            return error
        }

    };

    responseParse = async (response, doneFunc, successFunc, errorFunc) => {
        try {

            switch (response.status) {
                case 200:
                    let responseJson = await response.json();


                    if (isFunction(doneFunc)) doneFunc();
                    if (isFunction(successFunc)) successFunc(responseJson);
                    return responseJson;
                    break;
                case 409:
                case 302:
                case 401:
                case 404:
                    let redirectJson = await response.json();


                    if (isFunction(doneFunc)) doneFunc();
                    if (isFunction(successFunc)) successFunc({ redirect: true, json: redirectJson, status: response.status });
                    return { redirect: true, json: redirectJson, status: response.status };
                case 403:
                    throw new Error('403 Forbidden');
                default:
                    let errorMessages = [];
                    let otherJson = await response.json();
                    Object.keys(otherJson).forEach(function (key) {
                        errorMessages.push(otherJson[key].join("\r\n"));
                    });

                    throw new Error(errorMessages.join("\r\n"));

                    break;
            }



        } catch (error) {

            if (isFunction(doneFunc)) doneFunc();
            if (isFunction(errorFunc)) errorFunc(error);
            throw new Error(error);
            return error
        }

    };

}


const isFunction = (functionToCheck) => {
    let getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
};

