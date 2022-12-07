import DarkMode1 from './DarkMode1'


let dms = [DarkMode1]

dms.forEach(dm=>{
    dm.install = function (Vue){
        Vue.component(dm.name,dm)
    }
})


export {
    DarkMode1
}