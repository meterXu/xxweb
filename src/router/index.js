import Vue from 'vue';
import Router from 'vue-router';
import Login from '../views/Login.vue'
import Index from '../views/Index.vue'
import XXWebBox from '../views/Page/XXWebBox.vue'
import PageLogin from '../views/Page/PageLogin.vue'

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
                path: '/page/xxWebBox',
                name: XXWebBox.name,
                component: XXWebBox,
            },
            {
                path: '/page/login',
                name: PageLogin.name,
                component: PageLogin,
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
