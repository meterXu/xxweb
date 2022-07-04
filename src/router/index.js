import Vue from 'vue';
import Router from 'vue-router';
import Login from '../views/Login.vue'
import Index from '../views/Index.vue'
import PageList from '../views/Page/PageList.vue'
import PageDetail from '../views/Page/PageDetail.vue'

Vue.use(Router);

const normalRoutes =  [
    {
        path: '/login',
        name: Login.name,
        component: Login,
    },
    {
        path: '/',
        name: Index.name,
        component: Index,
        children:[
            {
                path: '/page/list',
                name: PageList.name,
                component: PageList,
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


const createRouter = () =>
    new Router({
        scrollBehavior: () => ({
            y: 0
        }),
        routes: normalRoutes
    });

const router = createRouter();

export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher;
}

export default router;
