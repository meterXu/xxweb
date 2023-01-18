import MtView from './view/MtView'
import XscStaticLayout from "./layout/XscStaticLayout";
import ProPanel from "./panel/ProPanel";

let editor = [MtView,XscStaticLayout,ProPanel]

editor.forEach(c=>{
    c.install = function (Vue){
        Vue.component(c.name,c)
    }
})


export {
    MtView,
    XscStaticLayout,
    ProPanel
}