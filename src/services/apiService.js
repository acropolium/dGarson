import store from '../utils/storage'

export default class apiService {
    constructor(props) {
        this.user = {
            lang: store.get('lang'),
            token: store.get('token')
        }
    }

    headers_common = () => {
        return {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Accept-Language': this.user.lang
        }
    }

    headers_authorised = () => {
        return {
            Authorization: 'Bearer '
        }
    }

    apiHost = () => {
        //return 'https://api.garson.co/';
        return 'http://10.0.2.2:8000/'
    }

    menu = async (id, method) => {
        let uri = this.apiHost() + 'companies/' + id + '/menu?per_page=500'

        return this.request(uri, method)
    }

    device_token = async (method, body) => {
        let uri = this.apiHost() + 'users/refresh-token'

        let request = this.request(uri, method, body)

        return request
    }

    orders = async (id, method, body) => {
        let uri = this.apiHost() + 'orders'

        if (id) {
            uri += '/' + id
        }

        return this.request(uri, method, body)
    }

    order = async (id, method = 'get', body) => {
        let uri = this.apiHost() + 'orders/last?company_id=' + id

        return this.request(uri, method, body)
    }

    companies = async (method, body) => {
        let uri = this.apiHost() + 'companies?locations=true&last_order=true'

        return this.request(uri, method, body)
    }

    register = async (method, body) => {
        let uri = this.apiHost() + 'register'

        return this.request(uri, method, body)
    }

    verify = async (method, body) => {
        let uri = this.apiHost() + 'verify'

        return this.request(uri, method, body)
    }

    request = async (uri, method = 'get', body = {}) => {
        let headers_authorised = {}

        if (this.hasOwnProperty('user') && this.user.token) {
            headers_authorised = this.headers_authorised()
            headers_authorised['Authorization'] =
                headers_authorised['Authorization'] + this.user.token
        }

        let headers = {
            method: method,
            headers: { ...this.headers_common(), ...headers_authorised }
        }
        if (method != 'get' && body != false) {
            headers.body = JSON.stringify(body)
        }

        try {
            let response = await fetch(uri, headers)

            return this.responseParse(response)
        } catch (error) {
            throw new Error(error)
            return error
        }
    }

    responseParse = async response => {
        try {
            switch (response.status) {
                case 200:
                    let responseJson = await response.json()
                    return responseJson
                    break
                case 409:
                case 302:
                case 401:
                case 404:
                    let redirectJson = await response.json()
                    return {
                        redirect: true,
                        json: redirectJson,
                        status: response.status
                    }
                case 403:
                    throw new Error('403 Forbidden')
                default:
                    let errorMessages = []
                    let otherJson = await response.json()
                    Object.keys(otherJson).forEach(function(key) {
                        errorMessages.push(otherJson[key].join('\r\n'))
                    })

                    throw new Error(errorMessages.join('\r\n'))

                    break
            }
        } catch (error) {
            throw new Error(error)
            return error
        }
    }
}

const isFunction = functionToCheck => {
    let getType = {}
    return (
        functionToCheck &&
        getType.toString.call(functionToCheck) === '[object Function]'
    )
}
