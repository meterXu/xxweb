import axios from 'axios'
import {ACCESS_TOKEN} from "./mutation-types"
import {ls} from "./util"
function createService(project,mapmostProtocol,withCredentials,baseApiKey,isToken,timeout){
    const _ls = new ls(project)
    let baseUrl = project.variable[baseApiKey];
    const service = axios.create({
        baseURL: baseUrl,
        timeout: timeout, // 请求超时时间
        withCredentials:withCredentials||false
    })
    service.interceptors.request.use(config => {
        const token = _ls.get(ACCESS_TOKEN)
        const tokenKey = project.variable.tokenKey || 'X-Access-Token'
        if (token&&isToken) {
            if(config.headers&&!config.headers[tokenKey]){
                if(isToken) {
                    config.headers[tokenKey] = token; // 让每个请求携带自定义 token 请根据实际情况自行修改
                } else {
                    config.headers[tokenKey] = null; // 让每个请求携带自定义 token 请根据实际情况自行修改
                }
            }
        }
        if(mapmostProtocol) {
            let protocol = location.protocol.slice(0,-1)
            config.headers['Mapmost-Protocol'] = protocol
        }
        return config
    })

    return service
}

export function getService(project,mapmostProtocol,withCredentials=false,baseApiKey='baseApi',isToken=true,timeout=6000) {
    return createService(project,mapmostProtocol,withCredentials,baseApiKey,isToken,timeout)
}
export function getServiceSSO(project,mapmostProtocol,withCredentials=false,baseApiKey='ssoApi',isToken=true,timeout=6000) {
    return createService(project,mapmostProtocol,withCredentials,baseApiKey,isToken,timeout)
}
export function getServiceLogin(project,mapmostProtocol,withCredentials=false,baseApiKey='baseApi',isToken=false,timeout=6000) {
    return createService(project,mapmostProtocol,withCredentials,baseApiKey,isToken,timeout)
}


export function onResponseError(service,callback){
    service.interceptors.response.use((response) => {
        return response
    }, (error) => {
        callback&&callback(error)
    })
}


export function getErrorText(status){
    switch (status) {
        case 403:
            return '拒绝访问'
        case 500:
            return '后端异常'
        case 404:
           return '很抱歉，资源未找到'
        case 504:
           return '网络超时'
        case 401:
            return '授权过期'
        case 426:
            return '服务器拒绝使用当前协议执行请求'
        default:
            return '未知'
    }
}
