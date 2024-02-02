import {Menu,Box,User,CircleClose,Help,DataAnalysis,Coin,Tickets} from '@element-plus/icons-vue'
import {ElIcon} from "element-plus";
import {h} from 'vue'
export default [
    {
    path: '/page',
    meta: {
        title: '组件库',
        icon: {
            render(){
                return h(ElIcon,[h(Menu)])
            }
        }
    },
    children: [
        {
            path: '/page/itemList/xxWebBox',
            meta: {
                title: 'xxWebBox',
                icon:{
                    render(){
                        return h(ElIcon,[h(Box)])
                    }
                }
            }
        },
        {
            path: '/page/itemList/login',
            meta: {
                title: 'login',
                icon: {
                    render(){
                        return h(ElIcon,[h(User)])
                    }
                }
            }
        },
        {
            path: '/page/itemList/error',
            meta: {
                title: 'error',
                icon: {
                    render(){
                        return h(ElIcon,[h(CircleClose)])
                    }
                }
            }
        }
    ]
},
    {
        path:'/demo',
        meta: {
            title: '示例页面',
            icon: {
                render(){
                    return h(ElIcon,[h(Help)])
                }
            }
        },
        children: [
            {
                path: '/demo/dashboard',
                meta: {
                    title: '统计分析',
                    icon: {
                        render(){
                            return h(ElIcon,[h(DataAnalysis)])
                        }
                    }
                }
            },
            {
                path: '/demo/pageList',
                meta: {
                    title: '数据列表',
                    icon: {
                        render(){
                            return h(ElIcon,[h(Coin)])
                        }
                    }
                }
            },
            {
                path: '/demo/detail',
                meta: {
                    title: '详情页面',
                    icon: {
                        render(){
                            return h(ElIcon,[h(Tickets)])
                        }
                    }
                }
            }
        ]
    }
]
