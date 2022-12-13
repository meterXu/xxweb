### JeecgLogin

:::demo

```html
<template>
    <div style="width: 100%;height: 500px">
        <JeecgLogin :config="config"></JeecgLogin>
    </div>
</template>
<script>
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
                }
            }
        }
    }
</script>
```
:::

### 属性
| 属性  | 类型   | 必填  |
|-----|------|-----|
| xxx | xxxx | xxx |
| xxx | xxxx | xxx |