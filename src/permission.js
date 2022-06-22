export default [
    {
        path: '/',
        name: 'index',
        meta: { title: '首页', icon: 'el-icon-s-platform' },
    },
    {
    path: '/page',
    name: 'page',
    meta: { title: '系统页面', icon: 'el-icon-s-platform' },
    children: [
        {
            path: '/page/list',
            name: 'page_list',
            meta: {
                title: '列表',
                icon: 'el-icon-s-platform'
            }
        },
        {
            path: '/page/PageDetail/1',
            name: 'page_1',
            meta: {
                title: '详情页面1',
                icon: 'el-icon-s-platform'
            }
        },
        {
            path: '/page/PageDetail/2',
            name: 'page_2',
            meta: {
                title: '详情页面2',
                icon: 'el-icon-s-platform'
            }
        },
        {
            path: '/page/PageDetail/3',
            name: 'page_3',
            meta: {
                title: '详情页面3',
                icon: 'el-icon-s-platform'
            }
        },
        {
            path: '/page/PageDetail/4',
            name: 'page_4',
            meta: {
                title: '详情页面4',
                icon: 'el-icon-s-platform'
            }
        }
    ]
}]
