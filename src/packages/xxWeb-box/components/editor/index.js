import MtView from './view/MtView'


let editor = [MtView]

editor.forEach(c=>{
    c.install = function (Vue){
        Vue.component(c.name,c)
    }
})


export {
    MtView
}