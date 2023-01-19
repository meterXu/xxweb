export default {
    dom:{
        text:[
            {
                type: '属性',
                icon:'el-icon-s-operation',
                con: {
                    key: 'config.options',
                    name: '选项',
                    sub: [
                        {key: 'config.options.text.content', name: '文字', type: 'text'},
                        {key: 'config.options.text.fontSize', name: '大小', type: 'number'},
                        {key: 'config.options.text.fontWeight', name: '粗细', type: 'select', data: [{text: '正常', value: 'normal'}, {text: '加粗', value: 'bold'}, {text: '细化', value: 'lighter'}]},
                        {key: 'config.options.text.fontFamily', name: '字体', type: 'select', data: [{text: '微软雅黑', value: '微软雅黑'}, {text: '黑体', value: '黑体'}]},
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
    },
}