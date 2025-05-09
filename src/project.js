const project = {
    nameSpace: 'xxweb',
    variable: {
        baseApi:process.env.VUE_APP_baseApi,
        ssoApi:process.env.VUE_APP_ssoApi
    },
    redirect: {
        index: '/page/itemList/xxWebBox',
        login: '/login/1',
        "404": '/error/1',
        '403':'/error/5'
    },
    style: {
        theme: 'element',
        color: '#1890FF',
        layout: 'sideMenu',
        multiPage: true,
        fixSideMenu: false
    },
    config: {
        logo: "./static/imgs/logo-white.png",
        favicon: "./static/imgs/logo.png",
        title: "xxWebBox",
        login: {
            title: "xxWebBox",
            desc: "请输入你的账号",
        },
        menu:{
            mode:'router'
        },
        head: {
            hamburger:false,
            logo:{
                show: true,
            },
            title: {
                show: false,
                desktop: "",
                mobile: ""
            },
            breadcrumb: {
                show: false,
            },
            searchMenu: {
                show: false
            },
            helper: {
                show: false,
                href: "javascript:;",
                target: "_blank"
            },
            fullscreen: {
                show: false,
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
            icon: false
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
}

module.exports=project
