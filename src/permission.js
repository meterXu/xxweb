export default [
    {
    path: '/page',
    meta: { title: '组件库', icon: {
            icon: 'el-icon-s-platform'
        } },
    children: [
        {
            path: '/page/xxWebBox',
            meta: {
                title: 'xxWebBox',
                icon: 'el-icon-s-platform'
            }
        },
        {
            path: '/page/login',
            meta: {
                title: 'login',
                icon: 'el-icon-s-platform'
            }
        },
        {
            path: '/page/404',
            meta: {
                title: '404',
                icon: 'el-icon-s-platform'
            }
        },
        {
            path: 'http://www.baidu.com',
            meta: {
                title: 'baidu',
                icon: 'el-icon-s-platform'
            }
        }
    ]
}]
