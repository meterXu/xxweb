### PigLogin

:::demo

```html
<template>
    <div style="width: 1300px;height: 800px">
        <PigLogin :config="config" @login="login"></PigLogin>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                config:{
                    logo: "https://dev.dpark.com.cn/iplatform/files/s2-logo/logo.png",
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
