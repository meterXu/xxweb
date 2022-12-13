const project = {
    variable: {
        baseApi:process.env.VUE_APP_baseApi,
        ssoApi:process.env.VUE_APP_ssoApi
    },
    redirect: {
        index: '/page/xxWebBox',
        login: '/login/1',
        "404": '/error/1',
        '403':'/error/5'
    },
    style: {
        theme: 'thunder',
        color: '#1890FF',
        layout: 'sidemenu',
        multipage: true,
        fixSideMenu: false
    },
    config: {
        logo: "./static/imgs/logo.png",
        title: "xxWebBox",
        login: {
            title: "xxWebBox",
            desc: "请输入你的账号",
        },
        menu:{
            mode:'router'
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
                year: "2022",
                href: "http://www.baidu.con",
                target: "_blank"
            }
        },
        plugins: {}
    }
}

module.exports=project
