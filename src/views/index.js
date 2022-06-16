import Page from './Page.vue'
export default [{
    path: '/',
    redirect:'/page/1'
},
    {
    path: '/page/:index',
    name:Page.name,
    component:Page,
    meta:{
        keepAlive:true
    }
}]
