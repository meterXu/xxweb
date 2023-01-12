import MtView from './view/MtView'
import Xsc from "./render/Xsc";


let editor = [MtView,Xsc]

editor.forEach(c=>{
    c.install = function (Vue){
        Vue.component(c.name,c)
    }
})


export {
    MtView,
    Xsc
}