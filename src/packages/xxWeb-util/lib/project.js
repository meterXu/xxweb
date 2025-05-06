export default {
    nameSpace: "helloWorld",
    redirect: {
        index: '/',
        login: '/login',
        "404": '/404'
    },
    style: {
        theme: 'vue-admin',
        layout: 'sideMenu',
        multiPage: true,
        fixSideMenu: false,
    },
    config: {
        logo: null,
        title: "helloWorld",
        login: {
            title: "helloWorld",
            desc: ""
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
            title: "helloWorld",
            width: '200px',
            hamburger:true,
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
            show:true,
            icon: false,
        },
        footer: {
            show: true,
            links: [],
            copyright: {
                content: "xxweb-box",
                year: new Date().getFullYear(),
                href: "javascript:;",
                target: "_blank"
            }
        },
        plugins: {}
    }
}