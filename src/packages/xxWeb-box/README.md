# xxweb-box
> 前端页面空壳，vue2版

## 依赖组件
* element-ui/element-plus
* vue-router

## 安装

```shell
yarn add xxweb-box@0.0.x
```
或者
```shell
npm install xxweb-box@0.0.x
```

## 使用
安装组件
```js
import router from "@/router"
import XXWebBox from 'xxweb-box'
Vue.use(XXWebBox)
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
```
定义project
```js
export default {
    nameSpace: "xxweb-box",
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
    }
}
```
定义权限
```js
import {Box} from '@element-plus/icons-vue'
import {ElIcon} from "element-plus";
export default [
    {
        path: '/',
        meta: { 
            title: 'xxweb-box',
            icon:()=>(<ElIcon><Box/></ElIcon>)
        },
    }
]
```
组件中使用
```vue
  <div id="app">
    <XXWebBox :appConfig="project" :permission="permission"></XXWebBox>
  </div>
<script>
import project from "./project.js";
import permission from "./permission.js";
export default {
  name: 'App',
  data(){
    return {
      project:project,
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

|slotName|slotProps| remark   |
|---|---|----------|
|head-hamburger|:data="{isCollapse,permission}"| 收缩控制     |
|head-logo|---| logo     |
|head-title|---| 标题       |
|head-breadcrumb|---| 面包屑      |
|head-top-menu-wrap|:app="app"| 顶部菜单容器   |
|head-top-menu|:permission="permission"| 顶部菜单     |
|head-expand-left-start|---| 顶部左侧开头扩展 |
|head-expand-left-end|---| 顶部左侧结尾扩展 |
|head-expand-center|---| 顶部中间扩展   |
|head-expand-right-start|---| 顶部右侧开头扩展 |
|head-expand-right-end|---| 顶部右侧结尾扩展 |
|head-searchMenu|---| 查询       |
|head-fullScreen|---| 全屏       |
|head-userMenu|---| 用户菜单     |
|head-user-userName|---| 用户名      |
|head-user-dropdownMenuItem|:menu="menu"| 用户下拉菜单   |
|head-user-tag|---| 标签       |
|head-user-tag-text|---| 标签文字     |

### footer
底栏

|slotName|slotProps|remark|
|---|---|---|
|footer|---|整个底部|