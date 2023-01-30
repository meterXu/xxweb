import MtView from './view/MtView'
import XscStaticLayout from "./layout/XscStaticLayout";
import ProPanel from "./panel/ProPanel";
import UIList from "./UIList/UIList";

let editor = [MtView,XscStaticLayout,ProPanel,UIList]

editor.forEach(c=>{
    c.install = function (Vue){
        Vue.component(c.name,c)
    }
})


export {
    MtView,
    XscStaticLayout,
    ProPanel,
    UIList
}
