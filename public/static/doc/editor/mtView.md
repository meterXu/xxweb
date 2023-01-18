### mtView

:::demo

```html
<template>
    <div style="width: 100%;height: 600px">
        <MtView :config="config">
            <template v-slot="{scale,view}">
                <div style="background-color: #fff;width: 800px;height: 600px;position: relative">
                    <div style="position: absolute;top:200px;left: 200px;width: 100px;height: 100px;background: #9e29ec"></div>
                    <div style="position: absolute;top:200px;left: 400px;width: 100px;height: 100px;background: #71e056;border-radius: 50%"></div>
                </div>
            </template>
        </MtView>
    </div>
</template>
<script>
export default {
    data(){
        return {
            config:{
                theme:'dark',
                isRuler:true,
                isScale:true,
                isDrag:true,
                isNavigate:true,
                containerPadding:30,
                backgroundClass:'default-bg',
                navigateConf:{
                    canvasWidth:224,
                    canvasHeight:160
                }
            }
        }
    }
}
</script>
```
:::

## 属性:config
| prop   | remark    | default    |
|--------|-----------|------------|
| theme | 主题        | dark       |
| isRuler   | 是否有标尺     | true       |
| isScale   | 是否可以缩放    | true       |
| isDrag   | 内容是否可以拖动  | true       |
| isNavigate   | 是否显示导航    | true       |
| containerPadding   | 设置返回首页的链接 | 30(px)     |
| backgroundClass   | 设置返回首页的链接 | default-bg |
| navigateConf   | 设置返回首页的链接 | {canvasWidth:224,canvasHeight:160}         |


## 插槽
| slotName          | slotProps | remark |
|-------------------|-----------|--------|
| default | ---       | 视窗内容   |