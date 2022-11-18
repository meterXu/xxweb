# xxweb-utils 
>xxweb工具库

## filter

|成员|类型|   说明 |
|:---|:---:|-----:|
|filter|方法| 路由鉴权 |

## types

|成员|类型|说明|
|:---|:---:|---:|
|ACCESS_TOKEN|属性|用户token|
|USER_INFO|属性|用户信息|

## request
|成员|类型|说明|
|:---|:---:|---:|
|getService(project,withCredentials=false,baseApiKey='baseApi',isToken=true,timeout=6000)|函数|获取请求对象|
|onResponseError|函数|请求异常处理|
|getErrorText|函数|根据http状态码获取错误内容|

## util
|成员|类型|说明|
|:---|:---:|---:|
|timeFix|函数|获取问候语|
|triggerWindowResizeEvent|函数|触发 window.resize|
|filterObj|函数|过滤对象中为空的属性|
|cloneObject|函数|深度克隆对象、数组|
|randomNumber|函数|随机生成数字|
|randomString|函数|随机生成字符串|
|randomUUID|函数|随机生成uuid|
|underLine2CamelCase|函数|下划线转驼峰|
|cssExpand|函数|增强CSS，可以在页面上输出全局css|
|jsExpand|函数|用于js增强事件，运行JS代码，可以传参|

## validate
|成员|类型|说明|
|:---|:---:|---:|
|isEmail(s)|函数|邮箱|
|isMobile(s)|函数|手机号码|
|isPhone(s)|函数|电话号码|
|isURL(s)|函数|URL地址|
