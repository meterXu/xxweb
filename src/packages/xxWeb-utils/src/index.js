import {ls} from './util'
import {ACCESS_TOKEN} from "./mutation-types";

export function logout(project){
    let _ls = new ls(project)
    _ls.remove(ACCESS_TOKEN);
    let href =  window.location.href;
    let serviceUrl = project.variable.ssoAuth + `/login?redirect_url=${encodeURIComponent(href)}&action=logout`;
    window.location.href = serviceUrl;
}