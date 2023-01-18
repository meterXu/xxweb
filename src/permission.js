export default [
    {
    path: '/page',
    meta: {
        title: '组件库',
        icon: 'el-icon-menu'
    },
    children: [
        {
            path: '/page/itemList/xxWebBox',
            meta: {
                title: 'xxWebBox',
                icon: 'el-icon-box'
            }
        },
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
        },
        {
            path: '/page/itemList/draw',
            meta: {
                title: 'editor',
                icon: 'el-icon-crop'
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
                path: '/demo/dashboard',
                meta: {
                    title: '统计分析',
                    icon: 'el-icon-data-analysis'
                }
            },
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
                }
            },
            {
                path: '/demo/editor',
                meta: {
                    title: '编辑器',
                    icon: 'el-icon-edit'
                }
            }
        ]
    }
]
