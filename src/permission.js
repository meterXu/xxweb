export default [
    {
        path: '/page',
        meta: {
            title: '组件库',
            icon: 'Menu'
        }
    },
    {
    path: '/page',
    meta: {
        title: '组件库',
        icon: 'Menu'
    },
    children: [
        {
            path: '/page/itemList/xxWebBox',
            meta: {
                title: 'xxWebBox',
                icon:'Box'
            }
        },
        {
            path: '/page/itemList/login',
            meta: {
                title: 'login',
                icon: 'User'
            }
        },
        {
            path: '/page/itemList/error',
            meta: {
                title: 'error',
                icon: 'CircleClose'
            }
        }
    ]
},
    {
        path:'/demo',
        meta: {
            title: '示例页面',
            icon: 'Help'
        },
        children: [
            {
                path: '/demo/dashboard',
                meta: {
                    title: '统计分析',
                    icon: 'DataAnalysis'
                }
            },
            {
                path: '/demo/pageList',
                meta: {
                    title: '数据列表',
                    icon: 'Coin'
                }
            },
            {
                path: '/demo/detail',
                meta: {
                    title: '详情页面',
                    icon: 'Tickets'
                }
            }
        ]
    }
]
