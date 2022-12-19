import Vue from 'vue';
import Router from 'vue-router';
import Login from '../views/Login.vue'
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
                },
                children: [{
                    path:'/page/comDetail/:type/:title/dashboard',
                    name:"DetailDashboard",
                    component:()=>import('../views/demo/Dashboard'),
                    meta: {
                        title: '详情-统计分析',
                        icon: 'el-icon-data-analysis'
                    }
                }]
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
            },
            {
                path:'/demo/pageList',
                name:"Dashboard",
                component:()=>import('../views/demo/PageList')
            },
            {
                path:'/demo/detail',
                name:"Dashboard",
                component:()=>import('../views/demo/Detail')
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
