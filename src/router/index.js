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
import ComDetail from '../views/Page/ComDetail'
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
        name: 'Index',
        component:()=>import('../views/Index'),
        redirect:'/page/xxWebBox',
        children:[
            {
                path:'/page/dashboard',
                name: 'Dashboard',
                component: ()=>import('../views/Page/Dashboard'),
            },
            {
                path: '/page/xxWebBox',
                name: 'XXWebBox',
                component: ()=>import('../views/Page/XXWebBox'),
            },
            {
                path: '/page/login',
                name: 'PageLogin',
                component: ()=>import('../views/Page/PageLogin'),
            },
            {
                path: '/page/comDetail/:type/:title',
                name: 'ComDetail',
                component:()=>import('../views/Page/ComDetail'),
                props:true,
                meta:{
                    title:'查看详情',
                    icon:'el-icon-tickets'
                }
            },
            {
                path: '/page/error',
                name: 'ErrorList',
                component:()=>import('../views/Page/ErrorList'),
            },
            {
                path: '/page/test',
                name: Test.name,
                component: Test,
                meta:{
                    title:'test'
                }
            },
            {
                path:'/demo/dashboard',
                name:"Dashboard",
                component:()=>import('../views/demo/Dashboard')
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
