# xxweb-util
> xxweb函数工具包

## 安装组件
```
npm i xxweb-util
```

## 使用
推荐使用动态引入的方式进行使用，例如：
```
import {Ls} from 'xxweb-util/lib/util.js'
const ls = new Ls('test');
ls.set('tokenKey','<tokenValue>')
```
## 函数列表
* util.js

| 函数                                                  | 说明                                                                                          |
|:----------------------------------------------------|:--------------------------------------------------------------------------------------------|
| isExternal(url:string):boolean                      | 是否示外部地址，https,http,mailto,tel开头的都认为是外部地址                                                    |
| isEmpty(str:any):boolean                            | 是否为空，null,undefined,'','undefined','null'都认为是空                                              |
| Ls(nameSpace:string):localStorage                   | 创建带命名空间的localStorage                                                                        |
| Ss(nameSpace:string):sessionStorage                 | 创建带命名空间的sessionStorage                                                                      |
| getLsValue(value:string):string\|object             | 获取localStore/sessionStorage值，如果原始值是对象字符串，则会进行反序列化                                           |
| setLsValue(value:string\|object):string             | 设置localStore/sessionStorage值，如果原始值是对象，则会进行序列化                                               |
| alterStoreValue(value:string\|null):string\|null    | 改变存储至store的值                                                                                |
| cloneObject(obj:object\|array):object\|array        | 深度克隆对象、数组                                                                                   |
| randomNumber(min?:number,max?:number):number        | 随机生成数字，如果参数只传递一个，则代表生成的数字长度                                                                 |
| randomString(length?:number,chats?:string):string   | 随机生成字符串,可以设置字符串内容范围和生成的长度                                                                   |
| randomUUID():string                                 | 随机生成uuid                                                                                    |
| getQuery():object                                   | 获取url中的所有参数                                                                                 |
| getQueryVariable(name:string):string                | 获取url中的指定名称的参数                                                                              |
| doCopy(str:string,success:function,failed:function) | 复制字符串                                                                                       |
| deviceType():string                                 | 获取设备类型,返回类型可能是WxMini,WeChat,Android,iPhone,iPad,webOS,BlackBerry,IEMobile,Opera Mini,Others |                                                                        |
| formatDate(date:Date,format?:string):string         | 时间格式化，默认格式YYYY-MM-DD HH:mm:ss                                                               |                                                                        |
| mergeObject(source:object,target:object):object     | 对象深度合并，支持多层级对象                                                                              |                                                                        |
| expandFullProject(data:object):object               | 展开整个project配置                                                                               |                                                                        |
| Cookie(path:string):object                          | Cookie的处理,api参考Ls或者Ss，默认作用域为/                                                               |                                                                        |
| downloadFileByUrl(name:string,url:string)           | 通过url下载资源                                                                                   |                                                                        |
| downloadFileByBlob(name:string,blob:blob)           | 通过blob对象下载资源                                                                                |                                                                        |
| GlobalOverride(type:string[])                       | 全局对象重写，默认重写function，增加防抖                                                                    |                                                                        |
| sleep(time:number)                                  | 等待函数，单位ms，默认等待100ms                                                                         |                                                                        |

**示例**
store中属性赋值
```javascript
import {Ls} from 'xxweb-util/lib/util.js'
const ls = new Ls(nameSpace)
setUserInfo:(state,value)=>{
    _userInfo.value = value;
    ls.set('userInfo',setLsValue(value))
}
```
获取store中的用户信息
```javascript
import {Ls} from 'xxweb-util/lib/util.js'
const ls = new Ls(nameSpace)
const userInfo = computed(()=>{
    if(ls.get('userInfo')){
        _userInfo.value = getLsValue(ls.get('userInfo'))
        return _userInfo
    }
})
```
时间格式化
```javascript
import {formatDate} from 'xxweb-util/lib/util.js'
return formatDate(new Date(),'yyyy-MM-dd')
```
设置xxweb-box的project
```vue
<script setup>
  import {expandFullProject} from 'xxweb-util/lib/util.js'
  const project = expandFullProject({
    nameSpace:'test',
    variable: {
      tokenKey:'Authorization',
      baseUrl:env.VITE_APP_baseApi,
    },
    redirect: {
      index: '/',
      login: '/login',
    },
    style: {
      theme: 'v2board',
      layout: 'topMenu',
      multiPage: true
    }
  })
</script>
<XXWebBox :appConfig="project" :permission="[]"></XXWebBox>
```
给所有的函数增加防抖机制
```javascript
import {GlobalOverride} from 'xxweb-util/lib/util.js'
GlobalOverride(['debounce'])
```
等待3s执行
```javascript
import {sleep} from 'xxweb-util/lib/util.js'
sleep(3000)
console.log('等待3s执行')
```

* types.js

| 变量           | 值                        |
|--------------|--------------------------|
| ACCESS_TOKEN | box-Access-Token |
| USER_INFO    | box-UserInfo      |
| PERMISSION   | box-Permission      |

**示例**
```javascript
import {ACCESS_TOKEN,USER_INFO,PERMISSION} from "xxweb-util/lib/types.js";
console.log(ACCESS_TOKEN,USER_INFO,PERMISSION)
```

* request.js

| 函数                                                                                                                          | 说明        |
|-----------------------------------------------------------------------------------------------------------------------------|-----------|
| createService(baseUrl:string,tokeCallback:function,withCredentials?:boolean,isToken?:boolean,timeout?:number):AxiosInstance | 创建axios对象 |
| onResponseError(service:AxiosInstance,callback:function)                                                                    | 请求异常事件    |
| getErrorText(status:number):string                                                                                          | 错误码转文字    |

**示例**
创建axios对象
```javascript
import {createService} from "xxweb-util/lib/request.js";
import store from '@/store'

// 创建axios并设置baseUrl和token
const axios = request.createService(window.project.variable.baseUrl,(config)=>{
    config.headers[window.project.variable.tokenKey] = store.getters.token
})

// 对外暴露get请求函数
export function getAction(path,params){
    return axios({
        url: url,
        method: "get",
        params: params
    })
}
```
处理请求错误
```javascript
import { dealWithError } from './dealwithError.js';
import {onResponseError} from 'xxweb-util/lib/request.js'
onResponseError(axios,(error:any) => dealWithError(error))
```
```javascript
export function dealWithError(error) {
    error.response.data = {
        code: error.response.status,
        success: false,
        message: getErrorText(error.response.status)
    }
    return data
}
```
* filter.js

| 函数                                                                                                           | 说明                  |
|--------------------------------------------------------------------------------------------------------------|---------------------|
| filter(router:VueRouter, project:object,{beforeCallback?:function,endCallback?:function,permission?:boolean) | 基于vue-router的权限处理函数 |

**示例**
给项目安装授权过滤器
```javascript
import filter from 'xxweb-uitl/lib/filter.js';
filter(router,window.project,{}) // 只开启鉴权，不开启权限验证
// filter(router,window.project,{permission:true}) // 开启鉴权和权限验证
```

* bus.js

| 函数    | 说明          |
|-------|-------------|
| $on   | 注册函数        |
| $once | 注册一次性函数     |
| $off  | 注销函数        |
| $emit | 执行函数，支持异步回调 |
**示例**
调用异步的bus
```javascript
import {$on} from 'xxweb-uitl/lib/bus.js';
$on('test',()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(1);
        },1000)
    })
})

```
```javascript
import {$emit} from 'xxweb-uitl/lib/bus.js';
$emit('test').then(res=>{
    console.log(res) // 1
})
```
* validate.js

| 函数 | 说明     |
|----|--------|
| isEmail   | 是否是邮箱  |
|isMobile|  是否是座机号      | 
|isPhone| 是否是手机号 |
|isURL| 是否是url |


