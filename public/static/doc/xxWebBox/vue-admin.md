### vue-admin

:::demo

```html
<template>
    <div style="width: 100%;height: 600px">
    <XXWebBox :appConfig="project" :permission="permission"
              @dropdownMenuClick="dropdownMenuClick"
              @menuClick="menuClick">
    </XXWebBox>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                project: {
                    variable: {
                        baseApi:'',
                        ssoApi:''
                    },
                    redirect: {
                        index: '/page/1',
                        login: '/login/1',
                        "404": '/error/1',
                        '403':'/error/5'
                    },
                    style: {
                        theme: 'vue-admin',
                        color: '#1890FF',
                        layout: 'sidemenu',
                        multipage: true,
                        fixSideMenu: true 
                    },
                    config: {
                        logo: "./static/imgs/logo.png",
                        menu:{
                            mode:'route'
                        },
                        head: {
                            hamburger:true,
                            logo:{
                                show: true,
                            },
                            title: {
                                show: true,
                                desktop: "欢迎使用xxWebBox",
                                mobile: "xxWebBox"
                            },
                            breadcrumb: {
                                show: true,
                            },
                            searchMenu: {
                                show: true
                            },
                            helper: {
                                show: false,
                                href: "javascript:;",
                                target: "_blank"
                            },
                            fullscreen: {
                                show: true,
                            },
                            user: {
                                show: true,
                                username: true,
                                menu: {
                                    show: true,
                                    clearCache: true,
                                    changePwd: true,
                                    exitSystem: true
                                }
                            }
                        },
                        sideMenu: {
                            title: "xxWebBox",
                            width: '250px',
                            logo:{
                                show: true,
                            },
                            hamburger:false,
                            user: {
                                show: false,
                                username: true,
                                tag:true,
                                menu: {
                                    show: true,
                                    clearCache: true,
                                    changePwd: true,
                                    exitSystem: true
                                }
                            }
                        },
                        tabs: {
                            show: true,
                            icon: true
                        },
                        footer: {
                            show: true,
                            links: [],
                            copyright: {
                                content: "xxWebBox",
                                year: new Date().getFullYear(),
                                href: "javascript:;",
                                target: "_self"
                            }
                        },
                        plugins: {}
                    }
                },
                permission: [{
                    path:'/demo',
                    meta: {
                        title: '示例页面',
                        icon: 'el-icon-s-help'
                    },
                    children: [
                        {
                            path: '/page/comDetail/xxWebBox/vue-admin/dashboard',
                            meta: {
                                title: '统计分析',
                                icon: 'el-icon-data-analysis'
                            }
                        },
                        {
                            path: '/page/comDetail/xxWebBox/vue-admin/list',
                            meta: {
                                title: '数据列表',
                                icon: 'el-icon-coin'
                            }
                        },
                        {
                            path: '/page/comDetail/xxWebBox/vue-admin/detail',
                            meta: {
                                title: '详情',
                                icon: 'el-icon-tickets'
                            }
                        }
                    ]
                }]
            }
        },
        methods: {
            dropdownMenuClick(command) {
                console.log(command)
            },
            collapseToggle(isCollapse){
                console.log(isCollapse)
            },
            menuClick(path){
                console.log(path)
            }
        }
    }
</script>
```
:::


