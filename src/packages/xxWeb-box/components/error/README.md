# 错误处理

```vue
<template>
  <NotFound :link="link"/>
</template>
<script>
import {NotFound} from '@dpark/s2-xxweb-box'
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