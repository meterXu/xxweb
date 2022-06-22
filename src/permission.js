export default [{
    path: '/page',
    name: 'page',
    meta: { title: '系统页面', icon: 'el-icon-s-platform' },
    children: [
        {
            path: '/page/1',
            name: 'page_1',
            meta: {
                title: '页面1',
                icon: 'el-icon-s-platform'
            }
        },
        {
            path: '/page/2',
            name: 'page_2',
            meta: {
                title: '页面2',
                icon: 'el-icon-s-platform'
            }
        },
        {
            path: '/page/3',
            name: 'page_3',
            meta: {
                title: '页面3',
                icon: 'el-icon-s-platform'
            }
        },
        {
            path: '/page/4',
            name: 'page_4',
            meta: {
                title: '页面4',
                icon: 'el-icon-s-platform'
            },
            children:[
                {
                    path: '/page/4/xxx',
                    name: 'page_4_xxx',
                    meta: {
                        title: 'hello',
                        icon: 'el-icon-s-platform'
                    },
                }
            ]
        }
    ]
}]
