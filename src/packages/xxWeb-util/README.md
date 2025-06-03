# xxweb-util
> xxweb函数工具包

## 依赖组件
```
npm i xxweb-util
```

## 使用
全部使用动态引入的方式进行使用，例如：
```
import {Ls} from 'xxweb-util/lib/util.js'
const ls = new Ls('test');
ls.set('tokenKey','<tokenValue>')
```
## 函数列表
* util.js

| 函数                                                  | 说明                                                                                          | 示例                                                                     |
|:----------------------------------------------------|:--------------------------------------------------------------------------------------------|:-----------------------------------------------------------------------|
| isExternal(url:string):boolean                      | 是否示外部地址，https,http,mailto,tel开头的都认为是外部地址                                                    | ```isExternal('https://www.baidu.com')```                              |
| isEmpty(str:any):boolean                            | 是否为空，null,undefined,'','undefined','null'都认为是空                                              | ```isExternal('hello world')```                                        |
| Ls(nameSpace:string):localStorage                   | 创建带命名空间的localStorage                                                                        | ```let ls = new Ls('nameSpace')```                                     |
| Ss(nameSpace:string):sessionStorage                 | 创建带命名空间的sessionStorage                                                                      | ```let ss = new Ss('nameSpace')```                                     |
| getLsValue(value:string):string\|object             | 获取localStore/sessionStorage值，如果原始值是对象字符串，则会进行反序列化                                           | ```getLsValue(ls.get('userInfo'))```                                         |
| setLsValue(value:string\|object):string             | 设置localStore/sessionStorage值，如果原始值是对象，则会进行序列化                                               | ```ls.set('test',setLsValue({"test":"helloWorld"})))```                      |
| alterStoreValue(value:string\|null):string\|null    | 改变存储至store的值                                                                                | ```alterStoreValue("null") // store中将存储null```                               |
| cloneObject(obj:object\|array):object\|array        | 深度克隆对象、数组                                                                                   | ```cloneObject({"test":"test","value":{"value":helloWorld}})```              |
| randomNumber(min?:number,max?:number):number        | 随机生成数字，如果参数只传递一个，则代表生成的数字长度                                                                 | ```randomNumber(1,100)```                                                    |
| randomString(length?:number,chats?:string):string   | 随机生成字符串,可以设置字符串内容范围和生成的长度                                                                   | ```randomString(10)```                                                       |
| randomUUID():string                                 | 随机生成uuid                                                                                    | ```randomUUID()```                                                           |
| getQuery():object                                   | 获取url中的所有参数                                                                                 | ```getQuery()['username']```                                                 |
| getQueryVariable(name:string):string                | 获取url中的指定名称的参数                                                                              | ```getQueryVariable('username')```                                           |
| doCopy(str:string,success:function,failed:function) | 复制字符串                                                                                       | ```doCopy('xx-xx-xx',()=>{console.log('复制成功')},()=>{console.log('复制失败')})``` |
| deviceType():string                                 | 获取设备类型,返回类型可能是WxMini,WeChat,Android,iPhone,iPad,webOS,BlackBerry,IEMobile,Opera Mini,Others |                                                                        |
| formatDate(date:Date,format?:string):string         | 时间格式化，默认格式YYYY-MM-DD HH:mm:ss                                                               |                                                                        |
| mergeObject(source:object,target:object):object     | 对象深度合并，支持多层级对象                                                                              |                                                                        |
| expandFullProject(data:object):object               | 展开整个project配置                                                                               |                                                                        |
| Cookie(path:string):object                          | Cookie的处理,api参考Ls或者Ss，默认作用域为/                                                               |                                                                        |
| downloadFileByUrl(name:string,url:string)           | 通过url下载资源                                                                                   |                                                                        |
| downloadFileByBlob(name:string,blob:blob)           | 通过blob对象下载资源                                                                                |                                                                        |
| GlobalOverride(type:string[])                       | 全局对象重写，默认重写function，增加防抖                                                                    |                                                                        |
| sleep(time:number)                                  | 等待函数，单位ms，默认等待100ms                                                                         |                                                                        |

* types.js
* request.js
* filter.js
* bus.js
* validate.js

