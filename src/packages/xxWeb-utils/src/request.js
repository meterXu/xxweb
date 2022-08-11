import Vue from 'vue'
import {getProject, globalStore} from './index'
import axios from 'axios'
import {ACCESS_TOKEN} from "./mutation-types"
// import {Modal, notification} from 'ant-design-vue'
import {getLogFvConf} from './util'
function createService(project,withCredentials,baseApiKey,isToken){
    let _project = getProject(project)
    let baseUrl = _project.variable[baseApiKey];
    const service = axios.create({
        baseURL: baseUrl,
        timeout: 15000, // 请求超时时间
        withCredentials:withCredentials||false
    })
    service.interceptors.request.use(config => {
        const token = decodeURIComponent(Vue.ls.get(ACCESS_TOKEN))
        if (token&&isToken) {
            if(config.headers&&!config.headers[_project.variable.tokenKey || 'X-Access-Token']){
                if(isToken) {
                    config.headers[_project.variable.tokenKey || 'X-Access-Token'] = token; // 让每个请求携带自定义 token 请根据实际情况自行修改
                } else {
                    config.headers[_project.variable.tokenKey || 'X-Access-Token'] = null; // 让每个请求携带自定义 token 请根据实际情况自行修改
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
function Logout(project){
    globalStore.dispatch('Logout').then(() => {
        Vue.ls.remove(ACCESS_TOKEN);
        let sevice =  window.location.href;
        let serviceUrl = project.variable.ssoAuth + "/login?redirect_url=" + encodeURIComponent(sevice);
        serviceUrl += "&action=logout";
        window.location.href = serviceUrl;
        window.location.reload();
    });
}

export function getService(project,withCredentials,baseApiKey='baseApi') {
    return createService(project,withCredentials,baseApiKey,true)
}
export function getServiceSSO(project,withCredentials,baseApiKey='ssoApi') {
    return createService(project,withCredentials,baseApiKey,true)
}
export function getServiceLogin(project,withCredentials,baseApiKey='baseApi') {
    return createService(project,withCredentials,baseApiKey,false)
}
