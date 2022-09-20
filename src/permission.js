import {DoExcel} from '@dpark/icon'
export default [
    {
        path: '/page/dashboard',
        meta: {
            title: '首页',
            icon: {
                icon:'DoDWork',
                conf:{
                    theme:'two-tone',
                    fill:['currentColor','green']
                }
            }
        },
    },
    {
    path: '/dashboard',
    meta: { title: '组件库', icon: {
            icon:'DoDBasis'
        } },
    children: [
        {
            path: '/page/xxWebBox',
            meta: {
                title: 'xxWebBox',
                icon: {
                    render(){
                        return (<DoExcel/>)
                    }
                }
            }
        },
        {
            path: '/page/login',
            meta: {
                title: 'login',
                icon: {
                    icon:'DoExcel',
                    conf:{}
                }
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
