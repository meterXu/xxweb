# xxweb-box
> 可复用的web常用页面

![xxweb-box](http://img.xdo.icu/xxwebbox-01.png)
![xxweb-box](https://img.xdo.icu/xxwebbox-02.png)
![xxweb-box](http://img.xdo.icu/xxwebbox-03.png)

## 依赖组件
* vue-router

## 内置组件
* 布局页(6种，含左右，上下布局)
* 登录页(4种)
* 404页面(3种)
* 403页面(2种)
* 500页面(1种)

## 安装

```shell
yarn add xxweb-box
```
或者
```shell
npm install xxweb-box
```

## 使用
```js
// main.js
import router from "./router/util.js"
import XXWebBox from 'xxweb-box'
Vue.use(XXWebBox)
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
```

```js
// /router/util.js
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
    nameSpace: "helloWorld",
    redirect: {
        index: '/',
        login: '/login',
        "404": '/404'
    },
    style: {
        theme: 'vue-admin',
        color: '#1890FF',
        layout: 'sideMenu',
        multiPage: true,
        fixSideMenu: false,
    },
    config: {
        logo: "https://dev.dpark.com.cn/iplatform/files/s2-logo/logo.png",
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
                year: "2022",
                href: "javascript:;",
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
|initCollapse|初始是否收缩，默认值false|

## 事件
|methodName|methodParams|remark|
|---|---|---|
|dropdownMenuClick|command,string|用户下拉菜单点击事件，默认command：clearCache,changePwd,exitSystem|
|collapseToggle|isCollapse,boolean|收缩切换事件|
|menuClick|path,string|菜单模式为event时的点击事件|


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
|head-expand-left-start|---|顶部左侧开头扩展|
|head-expand-left-end|---|顶部左侧结尾扩展|
|head-expand-center|---|顶部中间扩展|
|head-expand-right-start|---|顶部右侧开头扩展|
|head-expand-right-end|---|顶部右侧结尾扩展|
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


## 登录页面
# 登录组件

```vue
<template>
  <PhylumLogin :config="config" v-model="form" @login="login"></PhylumLogin>
</template>
<script>
import {PhylumLogin} from 'xxweb-box'
export default {
  data(){
    return {
      config:{
        logo: "./static/imgs/logo-white.png",
        title: "xxWebBox",
        login: {
          title: "xxWebBox",
          desc: "请输入你的账号",
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
        }
      },
      rules:{
        username:[
          { required: true, message: '用户名不能为空',trigger: 'blur'},
        ],
        password:[
          { required: true, message: '密码不能为空',trigger: 'blur'},
        ]
      },
      form:{
        username:null,
        password:null,
        remember:false
      }
    }
  },
  components:{
    PhylumLogin
  },
  methods:{
    login(valid){
      if(valid){
        console.log(this.form)
      }
    }
  }
  
}
</script>
```

## 组件列表
* PhylumLogin
* PigLogin
* TreeLogin
* WatermelonLogin

## 属性

|prop| remark           |
|---|------------------|
|config| 配置               |
|remember| 初始是显示记住密码，默认true |
|placeholder| input描述，{username:'请输入用户名/邮箱/手机号',password:"请输入密码"}         |
|rules| 验证规则             |
|form| 表单               |

## 事件
|methodName| methodParams                | remark |
|---|-----------------------------|------|
|login| valid:Boolean,loginState:{loading:false} | 登录   |



## 插槽

| slotName | slotProps | remark   |
|----------|-----------|----------|
| default  | ---       | 整个登录内容区域 |
| form-item-prefix  | ---       | 表单前置内容   |
| form-item-suffix  |---| 表单后置内容   |
|form-login-btn|---| 表单按钮内容   |
|form-login-btn-other|---| 额外表单按钮   |


## 错误页面
# 错误处理

```vue
<template>
  <NotFound :link="link"/>
</template>
<script>
import {NotFound} from 'xxweb-box'
export default {
  name: 'MyNotFound',
  data(){
    return {
      link:{
        home:window.location.pathname
      }
    }
  },
  components:{
    NotFound
  }
}
</script>
```

## 组件列表
* NotFound
* NotFoundDark
* NoAuthority1
* NoAuthority2
* NotFound2

## 属性
|prop| remark                  |
|---|-------------------------|
|code| 错误编码，403｜404            |
|text| 错误文本，抱歉，你无权访问！          |
|show| 控制返回首页按钮显示，{home: true} |
|link| 设置返回首页的链接，{home: "javascript:;"}            |

## 插槽
| slotName          | slotProps | remark |
|-------------------|-----------|--------|
| default | ---       | 页面内容区域 |