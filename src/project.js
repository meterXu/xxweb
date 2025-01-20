const {loadEnv} = require("vite");
const project = function (mode){
    const env = loadEnv(mode,process.cwd())
    return {
        variable: {
            baseApi:env.VITE_APP_baseApi,
            ssoApi:env.VITE_APP_ssoApi
        },
        redirect: {
            index: '/page/itemList/xxWebBox',
            login: '/login/1',
            "404": '/error/1',
            '403':'/error/5'
        },
        style: {
            theme: 'nitro',
            layout: 'sideMenu',
            multiPage: true
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
}

module.exports = project;
