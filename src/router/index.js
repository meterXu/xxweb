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
        redirect:'/page/itemList/xxWebBox',
        children:[
            {
                path:'/page/dashboard',
                name: 'Dashboard',
                component: ()=>import('../views/Page/Dashboard'),
            },
            {
                path: '/page/itemList/:type',
                name: 'ItemList',
                component:()=>import('../views/Page/ItemList'),
                props: true
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
                },{
                    path:'/page/comDetail/:type/:title/pageList',
                    name:"DetailDashboard",
                    component:()=>import('../views/demo/PageList'),
                    meta: {
                        title: '详情-数据列表',
                        icon: 'el-icon-data-analysis'
                    }
                },{
                    path:'/page/comDetail/:type/:title/detail',
                    name:"DetailDashboard",
                    component:()=>import('../views/demo/Detail'),
                    meta: {
                        title: '详情-详情页面',
                        icon: 'el-icon-data-analysis'
                    }
                }]
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
            },
            {
                path: '/demo/editor',
                name: 'editor',
                component: ()=>import('../views/demo/Editor')
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
