import Page from './Page.vue'
export default [{
    path: '/',
    redirect:'/page/1'
},{
    path: '/page/:index',
    name:Page.name,
    component: Page,
    props:true,
    meta:{
        keepAlive:false
    }
}]
