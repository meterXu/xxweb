import axios from 'axios'
function createService(baseUrl,tokeCallback,withCredentials=false,isToken=true,timeout=6000){
    const service = axios.create({
        baseURL: baseUrl,
        timeout: timeout,
        withCredentials:withCredentials
    })
    service.interceptors.request.use(config => {
        const {tokenKey,token} = tokeCallback&&tokeCallback()
        let _headers = {}
        if(tokenKey&&token&&isToken){
            _headers[tokenKey]=token
        }
        config.headers = Object.assign({},_headers,config.headers)
        return config
    })

    return service
}

export function onResponseError(service,callback){
    service.interceptors.response.use((response) => {
        return response
    }, (error) => {
        if(callback){
            const data = callback(error)
            return Promise.reject(data)
        }else{
            return Promise.reject(error)
        }
    })
}


export function getErrorText(status){
    switch (status) {
        case 403:
            return '拒绝访问'
        case 500:
            return '服务异常'
        case 404:
           return '很抱歉，资源未找到'
        case 503:
            return '服务不可用'
        case 504:
           return '网络超时'
        case 401:
            return '授权过期'
        case 426:
            return '服务器拒绝使用当前协议执行请求'
        default:
            return '未知错误'
    }
}
