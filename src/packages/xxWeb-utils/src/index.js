import LogFv from '@dpark/logfv-web-vue'
import {getLogFvConf} from "./util";
export async function registerApp (app,callback){
    if(window.s2 && window.s2.util.registerApp){
        let _project = getProject(app.project)
        let _conf=getLogFvConf(_project)
        if(_conf){
            if(!app.installs){
                app.installs = {}
            }
            app.installs.LogFv={
                install:LogFv,
                options:_conf
            };
        }
        let _app = Object.assign({},app,{project:getProject(app.project)})
        await window.s2.util.registerApp(
            _app
            ,(Vue,globalRouter, globalStore)=>{
                if(callback){
                    callback(Vue,globalRouter, globalStore);
                }
            });
    }
}

export function getAssets(bl_project,path){
    if(process.env.NODE_ENV==="development"){
        const script=document.querySelector("script[src*='"+bl_project.namespace+".js']")
        let src =script.getAttribute('src')
        src = src.replace(`/${bl_project.namespace}.js`,"")
        return `${src+path}`
    }
    if(process.env.NODE_ENV==="production"){
        return `./${path}`
    }
}


export function getProject(bl_project){
    let w_project = null
    if(window&&window.project){
        w_project = window.project[bl_project.namespace]
    }else{
        w_project=bl_project
    }
    let _project = Object.assign({},w_project)
    if(_project.variable.hasOwnProperty(process.env.NODE_ENV)){
        _project.variable = _project.variable[process.env.NODE_ENV]
        _project.env = process.env.NODE_ENV
    }
    else{
        _project.variable = _project.variable["development"]
        _project.env = "development"
    }
    _project.variable.logfv = Object.assign({
        enable:false,
        console:false
    },_project.variable.logfv)
    unfoldProjectVariable(_project)
    return _project
}

function unfoldProjectVariable(project){
    if(project.variable.sso&&typeof(project.variable.sso)==='object'){
        if(project.variable.sso.ssoAuth)
            project.variable.ssoAuth = project.variable.sso.ssoAuth
        if(project.variable.sso.ssoApi)
            project.variable.ssoApi = project.variable.sso.ssoApi
    }
    if(project.variable.minio&&typeof(project.variable.minio)==='object'){
        if(project.variable.minio.uploadUrl)
            project.variable.uploadUrl = project.variable.minio.uploadUrl
    }
}

export const globalStore = window.s2 && window.s2.store
export const globalRouter = window.s2 && window.s2.router
