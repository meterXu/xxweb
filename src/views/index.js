import Page from './Page/Page.vue'
import PageDetail from './Page/PageDetail.vue'
import Index from './Index.vue'
export default [{
    path: '/',
    component: Index,
    children:[
        {
            path: '/page',
            redirect:'/page/list',
            children:[
                {
                    path:'/page/list',
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
        }
    ]
}
]
