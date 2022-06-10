import Index from './Index.vue'
import Page from './Page.vue'
export default [{
    path: '/',
    component: Index,
},{
    path: '/page/:index',
    name:Page.name,
    component: Page,
    props:true,
    meta:{
        keepAlive:true
    }
}]
