# s2前端框架工具类

## 安装
```bash=
npm i @dpark/s2-xxweb-utils
```
或
```bash
yarn add @dpark/s2-xxweb-utils
```
## 使用

```javascript=

import {potal,mutationTypes,util,request,validate} from '@dpark/s2-utils'
```

## 工具列表

### portal类

|成员|类型|   说明 |
|:---|:---:|-----:|
|logout|属性| 退出系统 |

### type类

|成员|类型|说明|
|:---|:---:|---:|
|ACCESS_TOKEN|属性|用户token|

### request类
|成员|类型|说明|
|:---|:---:|---:|
|getService(project)|函数|获取ajax请求对象|
|getServiceSSO(project)|函数|获取sso的ajax请求对象|

### util类
|成员|类型|说明|
|:---|:---:|---:|
|triggerWindowResizeEvent|函数|触发 window.resize|
|filterObj|函数|过滤对象中为空的属性|
|cloneObject|函数|深度克隆对象、数组|
|randomNumber|函数|随机生成数字|
|randomString|函数|随机生成字符串|
|randomUUID|函数|随机生成uuid|
|underLine2CamelCase|函数|下划线转驼峰|
|cssExpand|函数|增强CSS，可以在页面上输出全局css|
|jsExpand|函数|用于js增强事件，运行JS代码，可以传参|

### validate类
|成员|类型|说明|
|:---|:---:|---:|
|isEmail(s)|函数|邮箱|
|isMobile(s)|函数|手机号码|
|isPhone(s)|函数|电话号码|
|isURL(s)|函数|URL地址|
