import Vue from 'vue';
import Router from 'vue-router';
import Login from '../views/Login.vue'
import Index from '../views/Index.vue'
import Dashboard from '../views/Page/Dashboard.vue'
import XXWebBox from '../views/Page/XXWebBox.vue'
import Box404 from '../views/Page/Box404.vue'
import PageLogin from '../views/Page/PageLogin.vue'
import NotFound from '../views/NotFound'
Vue.use(Router);

const normalRoutes =  [
    {
        path: '/login/:type',
        name: Login.name,
        component: Login,
        props:true
    },
    {
        path: '/404/:type',
        name: NotFound.name,
        component: NotFound,
        props:true
    },
    {
        path: '/',
        name: Index.name,
        component: Index,
        redirect:'/page/xxWebBox',
        children:[
            {
                path:'/page/dashboard',
                name: Dashboard.name,
                component: Dashboard,
            },
            {
                path: '/page/xxWebBox',
                name: XXWebBox.name,
                component: XXWebBox,
            },
            {
                path: '/page/login',
                name: PageLogin.name,
                component: PageLogin,
                props: true
            },
            {
                path: '/page/404',
                name: Box404.name,
                component: Box404,
                props: true
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
