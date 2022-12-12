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
import de from "element-ui/src/locale/lang/de";
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
            },
            {
                path: '/page/comDetail/:title',
                name: ComDetail.name,
                component: ComDetail,
                props:true,
                meta:{
                    title(vue){
                        return `查看详情-${vue.$route.params.title}`
                    },
                    icon:'el-icon-tickets'
                }
            },
            {
                path: '/page/error',
                name: ErrorList.name,
                component: ErrorList,
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
