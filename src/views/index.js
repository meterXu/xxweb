import Index from './Index.vue'
import Page from './Page.vue'
export default [{
    path: '/',
    component: Index,
},{
    path: '/page/:index',
    component: Page,
    props:true,
}]
