### JeecgLogin

:::demo

```html
<template>
    <div style="width: 100%;height: 600px">
        <JeecgLogin :config="config" @login="login"></JeecgLogin>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                config:{
                    logo: "https://dev.dpark.com.cn/iplatform/files/s2-logo/logo-white.png",
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
        },
        methods:{
            login(valid,loginState){
                if(valid){
                    console.log(valid)
                    console.log(loginState)
                }
            }
        }
    }
</script>
```
:::
