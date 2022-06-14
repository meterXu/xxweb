import Index from './Index.vue'
import Page from './Page.vue'
export default [{
    path: '/',
    direct:'/page/1'
},{
    path: '/page/:index',
    name:Page.name,
    component: Page,
    props:true,
    meta:{
        keepAlive:false
    }
}]
