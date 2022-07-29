export default {
    namespace: "newsso",
    mainSys: true,
    index: 10,
    redirect: {
        index: '/page/dashboard',
        login: '/login/1',
        "404": '/404'
    },
    style: {
        theme: 'default',
        color: '#1890FF',
        layout: 'sidemenu',
        multipage: true,
        colorWeak: false,
        fixedHeader: false,
        fixSiderbar: false,
        autoHideHeader: false,
    },
    config: {
        logo: "./static/imgs/logo-white.png",
        title: "web-xxWebBox",
        login: {
            title: "web-xxWebBox",
            desc: ""
        },
        head: {
            logo:{
                show: true,
            },
            title: {
                show: true,
                desktop: "欢迎使用xxWeb",
                mobile: ""
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
            title: "web-xxWebBox",
            width: '200px',
            logo:{
                show: true,
            },
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
            icon: false,
        },
        footer: {
            show: true,
            links: [],
            copyright: {
                content: "苏州工业园园区测绘地理信息有限公司",
                year: "2022",
                href: "http://www.dpark.com.cn",
                target: "_blank"
            }
        },
        plugins: {}
    }
}
