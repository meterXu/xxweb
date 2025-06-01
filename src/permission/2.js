export default [
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
                path: '/demo/text-editor',
                meta: {
                    title: 'text-editor',
                    icon: 'el-icon-tickets'
                }
            }
        ]
    }
]