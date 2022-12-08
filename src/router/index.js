import Vue from 'vue';
import Router from 'vue-router';
import Login from '../views/Login.vue'
import Index from '../views/Index.vue'
import Dashboard from '../views/Page/Dashboard.vue'
import XXWebBox from '../views/Page/XXWebBox.vue'
import ErrorList from '../views/Page/ErrorList.vue'
import PageLogin from '../views/Page/PageLogin.vue'
import error from '../views/Error'
import Test from "../views/Test";
Vue.use(Router);

const normalRoutes =  [
    {
        path: '/login/:type',
        name: Login.name,
        component: Login,
        props:true
    },
    {
        path: '/error/:type',
        name: error.name,
        component: error,
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
                path: '/page/error',
                name: ErrorList.name,
                component: ErrorList,
                props: true
            },
            {
                path: '/page/test',
                name: Test.name,
                component: Test,
                meta:{
                    title:'test'
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
