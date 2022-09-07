import Vue from "vue";
import {ACCESS_TOKEN} from "./mutation-types";

export function Logout(project){
    Vue.ls.remove(ACCESS_TOKEN);
    let href =  window.location.href;
    let serviceUrl = project.variable.ssoAuth + `/login?redirect_url=${encodeURIComponent(href)}&action=logout`;
    window.location.href = serviceUrl;
    window.location.reload();
}
