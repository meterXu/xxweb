import MtView from './view/MtView'
import XscStaticLayout from "./layout/XscStaticLayout";
import XscRowLayout from "./layout/XscRowLayout";
import XscColumnLayout from "./layout/XscColumnLayout";
import XscGridLayout from "./layout/XscGridLayout";
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
    XscRowLayout,
    XscColumnLayout,
    XscGridLayout,
    ProPanel,
    UIList
}
