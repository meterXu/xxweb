import Index from './Index.vue'
import Page from './Page.vue'
export default [{
    path: '/',
    component: Index,
    meta: {
        title: '首页',
        icon: '业务'
    }
},{
    path: '/page/:index',
    component: Page,
    props:true,
    meta: {
        title: '业务页面',
        icon: '业务'
    },
}]
