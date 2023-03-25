### ProPanel

:::demo

```html
<template>
    <div style="width: 300px;height: 100%">
        <ProPanel :controlledObj="activeItem" :config="panelConfig"></ProPanel>
    </div>
</template>
<script>
export default {
    data(){
        return {
            activeItem:{
                "id": 1673490800977,
                "type": "dom",
                "chart": "text",
                "config": {
                    "box": {
                        "show":true,
                        "width": 417,
                        "height": 38,
                        "x": 766,
                        "y": 10,
                        "zIndex": 100,
                        "name":"文字"
                    },
                    "type": "text",
                    "theme": "dark",
                    "options": {
                        "text": {
                            "fontFamily": "微软雅黑",
                            "content": "智慧城市",
                            "fontSize": 30,
                            "color": null,
                            "tips": [1,2,4],
                            "fontWeight": "normal"
                        },
                        "boxSpace": {
                            "lineHeight": 40,
                            "textAlign": "center"
                        },
                        "background": {
                            "color": "transparent"
                        },
                        "border": {
                            "width": 0,
                            "style": "solid",
                            "color": "transparent"
                        }
                    }
                }
            },
            panelConfig:[
                {
                    type: '属性',
                    icon:'el-icon-s-operation',
                    con: {
                        key: 'config.options',
                        name: '选项',
                        sub: [
                            {key: 'config.box.show', name: '显示', type: 'boolean'},
                            {key: 'config.box.name', name: '名称', type: 'text',show:'$config.options.text.fontSize===30'},
                            {key: 'config.options.text.content', name: '内容', type: 'text'},
                            {key: 'config.options.text.fontSize', name: '大小', type: 'number'},
                            {key: 'config.options.text.fontSize', name: '大小', type: 'slider'},
                            {key: 'config.options.text.tips', name: '标签', type: 'checkbox',data:[{text: '🌧️', value: 1},{text: '🌞', value: 2},{text: '⚡️', value: 3}]},
                            {key: 'config.options.text.fontWeight', name: '粗细', type: 'select', data: [{text: '正常', value: 'normal'}, {text: '加粗', value: 'bold'}, {text: '细化', value: 'lighter'}]},
                            {key: 'config.options.text.color', name: '颜色', type: 'color'},
                            {key: 'config.options.background.color', name: '背景色', type: 'color'},
                            {key: 'config.options.boxSpace.lineHeight', name: '行高', type: 'number'},
                            {key: 'config.options.boxSpace.textAlign', name: '对其方式', type: 'select', data: [{text: '居左对齐', value: 'left'}, {text: '居中对齐', value: 'center'}, {text: '居右对齐', value: 'right'}]},
                            {key: 'config.options.border.width', name: '边框粗细', type: 'number'},
                            {key: 'config.options.border.color', name: '边框颜色', type: 'color'}
                        ]
                    }
                }
            ]
        }
    }
}
</script>
```
:::

## 属性
| prop   | remark | default |
|--------|--------|---------|
| controlledObj | 受控对象   | null    |
| config   | 控制选项   | []      |