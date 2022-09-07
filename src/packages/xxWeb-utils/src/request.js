import Vue from 'vue'
import axios from 'axios'
import {ACCESS_TOKEN} from "./mutation-types"
function createService(project,withCredentials,baseApiKey,isToken){
    let baseUrl = project.variable[baseApiKey];
    const service = axios.create({
        baseURL: baseUrl,
        timeout: 15000, // 请求超时时间
        withCredentials:withCredentials||false
    })
    service.interceptors.request.use(config => {
        const token = decodeURIComponent(Vue.ls.get(ACCESS_TOKEN))
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
        if (config.method == 'get') {
            if (config.url&&config.url.indexOf("sys/dict/getDictItems") < 0) {
                config.params = Object.assign({
                    _t: new Date().valueOf()
                },config.params)
            }
        }
        return config
    }, (error) => {
        return Promise.reject(error)
    })
    service.interceptors.response.use((response) => {
        return response.data
    }, (err) => {
        return Error(err)
    })
    return service
}

export function getService(project,withCredentials=false,baseApiKey='baseApi') {
    return createService(project,withCredentials,baseApiKey,true)
}
export function getServiceSSO(project,withCredentials=false,baseApiKey='ssoApi') {
    return createService(project,withCredentials,baseApiKey,true)
}
export function getServiceLogin(project,withCredentials=false,baseApiKey='baseApi') {
    return createService(project,withCredentials,baseApiKey,false)
}
