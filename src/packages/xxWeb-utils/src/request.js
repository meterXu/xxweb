import Vue from 'vue'
import {getProject, globalStore} from './index'
import axios from 'axios'
import {ACCESS_TOKEN} from "./mutation-types"
// import {Modal, notification} from 'ant-design-vue'
import {LogFv,axiosRequest,axiosError} from '@dpark/logfv-web-vue'
import {getLogFvConf} from './util'
function createService(project,withCredentials,baseApiKey,isToken){
    let _project = getProject(project)
    let baseUrl = _project.variable[baseApiKey];
    let logfv = new LogFv()
    initLog(_project,logfv)
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
        if(logfv.globalConfig.appId&&logfv.globalConfig.enable)
            axiosRequest(logfv,config)
        return config
    }, (error) => {
        if(logfv.globalConfig.appId&&logfv.globalConfig.enable)
            axiosError(logfv,error)
        return Promise.reject(error)
    })
    service.interceptors.response.use((response) => {
        return response.data
    }, (err) => {
        if(logfv.globalConfig.appId&&logfv.globalConfig.enable)
            axiosError(logfv,err)
        return error(err, _project)
    })
    return service
}
function initLog(project,logfv){
    let logConf =getLogFvConf(project)
    if(logConf){
        logfv.initConfig(logConf)
    }
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
