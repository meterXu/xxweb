import axios from 'axios'
export function createService(baseUrl:string,tokeCallback:(config:{[key:string]:any})=>{[key:string]:string},withCredentials=false,isToken=true,timeout=6000){
    const service = axios.create({
        baseURL: baseUrl,
        timeout: timeout,
        withCredentials:withCredentials
    })
    service.interceptors.request.use((config:{[key:string]:any}) => {
        const {tokenKey,token}:{tokenKey?:string,token?:string} = tokeCallback&&tokeCallback(config)
        let _headers = {} as {[key:string]:any}
        if(tokenKey&&token&&isToken){
            _headers[tokenKey]=token
        }
        config.headers = Object.assign({},_headers,config.headers)
        return config
    })

    return service
}

export function onResponseError(service:any,callback:(error:Error)=>void){
    service.interceptors.response.use((response:any) => {
        return response
    }, (error:Error) => {
        if(callback){
            callback(error)
        }
        return Promise.reject(error)
    })
}

export function getErrorText(status?:number){
    switch (status) {
        case 401:
            return '无鉴权或鉴权过期！'
        case 403:
            return '无权，拒绝访问！'
        case 500:
            return '后台服务异常！'
        case 404:
           return '抱歉，资源未找到！'
        case 503:
            return '服务不可用！'
        case 504:
           return '网络超时！'
        case 426:
            return '服务器拒绝使用当前协议执行请求！'
        default:
            return '请求异常！'
    }
}
