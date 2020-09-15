# @dpark/s2
> 前端开发框架

## 框架说明
```bash
s2 -h  # 查看帮助文档
```

| 命令          | 说明             | 用途                                                     |
| ------------- | ---------------- | -------------------------------------------------------- |
| -v, --version | 查看版本         |                                                          |
| -h, --help    | 查看帮助         |                                                          |
| run           | 运行业务系统     | 开发环境启动业务系统                                     |
| build         | 打包业务系统     | 业务打包                            |
| install       | 安装npm包        | 与npm i 相同 |
| update        | 更新npm包        | 与npm u 相同 |
| captain       | 生成业务集成配置 | 线上环境生成配置文件             |


## 业务系统开发
### 1、全局安装s2
```bash
npm i -g @dpark/s2 --registry http://58.210.9.131:5088/npm
```
### 2、配置s2.config.json
```json
{
  "sso": { //业务系统命名空间
    "immediately": true, //脚本立即集成
    "js":[
      "http://localhost:8081/sso.js" //业务系统启动后的地址
    ]
  }
}

```

### 3、修改package.json
修改package.json文件中`@vue/cli-service`版本为`^3.12.1`,

### 4、修改vue.config.js
修改参考如下:
```javascript
const namespace = 'sso' //定义项目的命名空间
module.exports = {
  ...
  configureWebpack:  config => {
    config.entry = {
      [namespace]: ["./src/main.js"] //修改程序的主入口
    }
    return {
      output: {
        library: namespace,
        filename: process.env.NODE_ENV === 'production'
          ? `biz/${namespace}/js/[id].[contenthash:4].js`//修改输出文件
          : '[id].js' ,
        chunkFilename: `biz/${namespace}/js/${namespace}.vendors.[contenthash:4].js`,
        
      }
    }
   ...
  },
  devServer: {
    port: 8081 //定义开发服务端口
  }
}
```

### 启动项目
```bash
s2 run
```

## 线上部署

### 部署s2

获取最新的框架发布包的`@park/s2`,部署到nginx下

框架发布包地址:
```bash
http://58.210.9.131:5088/git/dpark/s2-dist
```

### 部署业务系统

1. 拷贝业务系统`dist/biz`目录下的所有内容到`s2`的发布包目录`biz`下。**如果之前部署过，需要先删除之前部署**

2. 在s2发布包目录下运行`s2 c`
