export default [
    {
    path: '/page',
    meta: {
        title: '组件库',
        icon: 'el-icon-menu'
        },
    children: [
        {
            path: '/page/xxWebBox',
            meta: {
                title: 'xxWebBox',
                icon: 'el-icon-box'
            }
        },
        {
            path: '/page/login',
            meta: {
                title: 'login',
                icon: 'el-icon-user'
            }
        },
        {
            path: '/page/error',
            meta: {
                title: 'error',
                icon: 'el-icon-circle-close'
            }
        }
    ]
}]
