import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import normalRoutes from '../views/index.js'


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
