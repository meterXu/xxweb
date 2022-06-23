import Page from './Page/Page.vue'
import PageDetail from './Page/PageDetail.vue'
import Index from './Index.vue'

export default [
    {
    path: '/',
    name: Page.name,
    component: Index
    },
    {
        path: '/page/list',
        name: Page.name,
        component: Page,
    },
    {
        path: '/page/PageDetail/:index',
        name: PageDetail.name,
        component: PageDetail,
        props: true,
        meta: {
            keepAlive: true
        }
    }
]
