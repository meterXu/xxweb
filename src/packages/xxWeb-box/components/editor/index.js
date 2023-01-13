import MtView from './view/MtView'
import XscStaticLayout from "./layout/XscStaticLayout";


let editor = [MtView,XscStaticLayout]

editor.forEach(c=>{
    c.install = function (Vue){
        Vue.component(c.name,c)
    }
})


export {
    MtView,
    XscStaticLayout
}