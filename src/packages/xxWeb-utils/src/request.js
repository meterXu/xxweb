import Vue from 'vue'
import {getProject, globalStore} from './index'
import axios from 'axios'
import {ACCESS_TOKEN} from "./mutation-types"
import {Modal, notification} from 'ant-design-vue'
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
function error(error, project) {
    if (error.response) {
        let data = error.response.data;
        let message = ""
        if(typeof(data)==="string"&&data.indexOf('{')>-1){
            data = JSON.parse(data);
        }
        if(data&&data.message){
            message = data.message
        }
        const token = decodeURIComponent(Vue.ls.get(ACCESS_TOKEN));
        console.log("------异常响应------", token);
        console.log("------异常响应------", error.response.status);
        switch (error.response.status) {
            case 403:
                notification.error({message: '系统提示', description: message||'拒绝访问', duration: 4});
                break
            case 500:
                if (data.message == "Token失效，请重新登录") {
                    loginExpired(project)
                } else if(data.message.indexOf("用户名不存在或者密码错误")>-1){
                    notification.error({message: '系统提示', description: '用户名不存在或者密码错误!', duration: 4});
                } else {
                    notification.error({message: '系统提示', description: message||'接口错误!', duration: 4});
                }
                break
            case 404:
                notification.error({message: '系统提示', description: message||'很抱歉，资源未找到!', duration: 4});
                break
            case 504:
                notification.error({message: '系统提示', description: message||'网络超时'});
                break
            case 401:
                loginExpired(project)
                break
            case 426:
                notification.error({message: '系统提示', description: message||'服务器拒绝使用当前协议执行请求'});
                break
            default:
                notification.error({
                    message: '系统提示',
                    description: data.message,
                    duration: 4
                });
                break
        }
    }else{
        notification.error({
            message: '系统提示',
            description: error.message,
            duration: 4
        })
    }
    return Promise.reject(error)
}

function loginExpired(project){
    Modal.destroyAll();
    Modal.error({
        title: '登录已过期',
        content: '很抱歉，登录已过期，请重新登录',
        okText: '重新登录',
        mask: false,
        zIndex: 100000,
        onOk: () => {
            Logout(project)
        }
    });
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
