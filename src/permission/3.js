export default [
    {
    path: '/page',
    meta: {
        title: '组件库',
        icon: 'el-icon-menu'
    },
    children: [
        {
            path: '/page/itemList/login',
            meta: {
                title: 'login',
                icon: 'el-icon-user'
            }
        },
        {
            path: '/page/itemList/error',
            meta: {
                title: 'error',
                icon: 'el-icon-circle-close'
            }
        }
    ]
},
    {
        path:'/demo',
        meta: {
            title: '示例页面',
            icon: 'el-icon-s-help'
        },
        children: [
            {
                path: '/demo/pageList',
                meta: {
                    title: '数据列表',
                    icon: 'el-icon-coin'
                }
            },
            {
                path: '/demo/detail',
                meta: {
                    title: '详情页面',
                    icon: 'el-icon-tickets'
                },
                children:[
                    {
                        path: '/page/itemList/error',
                        meta: {
                            title: 'error',
                            icon: 'el-icon-circle-close'
                        }
                    }
                ]
            }
        ]
    }
]
