import {createRouter,createWebHashHistory} from "vue-router";
import {defineAsyncComponent} from 'vue'
import Login from '../views/Login.vue'
import error from '../views/Error'
import Test from "../views/Test";

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
                component: defineAsyncComponent(()=>import('../views/Page/Dashboard')),
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
                component:defineAsyncComponent(()=>import('../views/Page/ComDetail')),
                props:true,
                meta:{
                    title:'查看详情',
                    icon:'el-icon-tickets'
                },
                children: [{
                    path:'/page/comDetail/:type/:title/dashboard',
                    name:"DetailDashboard",
                    component:defineAsyncComponent(()=>import('../views/demo/Dashboard')),
                    meta: {
                        title: '详情-统计分析',
                        icon: 'el-icon-data-analysis'
                    }
                },{
                    path:'/page/comDetail/:type/:title/pageList',
                    name:"DetailDashboard",
                    component:defineAsyncComponent(()=>import('../views/demo/PageList')),
                    meta: {
                        title: '详情-数据列表',
                        icon: 'el-icon-data-analysis'
                    }
                },{
                    path:'/page/comDetail/:type/:title/detail',
                    name:"DetailDashboard",
                    component:defineAsyncComponent(()=>import('../views/demo/Detail')),
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
                component:defineAsyncComponent(()=>import('../views/demo/Dashboard'))
            },
            {
                path:'/demo/pageList',
                name:"PageList",
                component:defineAsyncComponent(()=>import('../views/demo/PageList'))
            },
            {
                path:'/demo/detail',
                name:"Detail",
                component:defineAsyncComponent(()=>import('../views/demo/Detail'))
            }
        ]
    }
]


const router = createRouter({
    scrollBehavior: () => ({
        y: 0
    }),
    history:createWebHashHistory(),
    routes: normalRoutes
});

export default router;
