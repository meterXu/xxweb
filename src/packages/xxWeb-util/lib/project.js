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
        logo: './favicon.ico',
        title: "helloWorld",
        login: {
            title: "helloWorld",
            desc: ""
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
            title: "helloWorld",
            width: '200px',
            hamburger:false,
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