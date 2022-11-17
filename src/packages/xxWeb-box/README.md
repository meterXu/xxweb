# xxweb-box
> 开箱即用的web页面百宝箱

![xxweb-box](http://img.xdo.icu/QQ%E6%88%AA%E5%9B%BE20220712174214.jpg)

## 依赖组件
* vue-router

## 使用
```js
// main.js
import router from "./router/index.js"
import XXWebBox from 'xxweb-box'
Vue.use(XXWebBox)
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
```

```js
// /router/index.js
import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue'
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: HelloWorld.name,
            component: HelloWorld,
            props:true
        }
    ]
})
```

```js
// permission.js
export default [
    {
        path: '/',
        meta: { title: 'helloWorld', icon: 'el-icon-folder-opened' },
    }
]
```

```js
// appConfig.js
export default {
    namespace: "helloWorld",
    redirect: {
        index: '/',
        login: '/login',
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
        logo: "./assets/logo.png",
        title: "helloWorld",
        login: {
            title: "helloWorld",
            desc: ""
        },
        head: {
            logo:{
                show: true,
            },
            title: {
                show: true,
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
                content: "xxweb-box",
                year: "2022",
                href: "https://www.npmjs.com/package/xxweb-box",
                target: "_blank"
            }
        },
        plugins: {}
    }
}
```

```vue
<!-- App.vue -->
  <div id="app">
    <XXWebBox :appConfig="appConfig" :permission="permission"></XXWebBox>
  </div>
<script>
import appConfig from "./appConfig";
import permission from "./permission";
export default {
  name: 'App',
  data(){
    return {
      appConfig:appConfig,
      permission:permission
    }
  }
}
</script>
```

## 属性

|prop|remark|
|---|---|
|appConfig|应用配置|
|permission|权限数据|

## 插槽


### side
左边栏

|slotName|slotProps|remark|
|---|---|---|
|side|:data="{isCollapse,permission}"|整个侧边栏|
|side-logo|---|logo|
|side-userMenu|---|用户菜单|
|side-user-userName|---|用户名|
|side-user-dropdownMenuItem|:menu="menu"|用户下拉菜单|
|side-user-tag|---|标签|
|side-user-tag-text|---|标签文字|


### head
顶栏

|slotName|slotProps|remark|
|---|---|---|
|head-hamburger|:data="{isCollapse,permission}"|收缩控制|
|head-logo|---|logo|
|head-title|---|标题|
|head-breadcrumb|---|面包屑|
|heade-expand|---|扩展|
|head-searchMenu|---|查询|
|head-fullScreen|---|全屏|
|head-userMenu|---|用户菜单|
|head-user-userName|---|用户名|
|head-user-dropdownMenuItem|:menu="menu"|用户下拉菜单|
|head-user-tag|---|标签|
|head-user-tag-text|---|标签文字|

### footer
底栏

|slotName|slotProps|remark|
|---|---|---|
|footer|---|整个底部|