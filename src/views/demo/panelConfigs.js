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
                        {key: 'config.box.show', name: '显示', type: 'boolean'},
                        {key: 'config.box.name', name: '名称', type: 'text'},
                        {key: 'config.options.text.content', name: '内容', type: 'text'},
                        {key: 'config.options.text.textStyle', name: '内容风格', type: 'horizontal-control',props:[
                                {key:'fontSize',name:'大小',type:'number'},
                                {key:'color',name:'颜色',type:'color'},
                                {key:'fontWeight',name:'粗细',type:'icon-drop',data:[{icon:'TextBoldNormal',text: '正常', value: 'normal'}, {icon:'TextBold',text: '加粗', value: 'bold'}]},
                                {key:'fontStyle',name:'风格',type:'icon-drop',data:[{icon:'TextItalicNormal',text: '正常', value: 'normal'}, {icon:'TextItalic',text: '斜体', value: 'italic'}]}
                            ]},
                        {key: 'config.options.verticalList', name: '垂直控件', type: 'vertical-control'},
                        {key: 'config.options.text.tips', name: '标签', type: 'checkbox',data:[{text: '🌧', value: 1},{text: '🌞', value: 2},{text: '⚡️', value: 3}]},
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

    },
    eCharts:{
        gauge:[
            {
                type: '属性',
                icon:'el-icon-s-operation',
                con: {
                    key: 'config.options',
                    name: '选项',
                    sub: [
                        {key: 'config.box.show', name: '显示', type: 'boolean'},
                        {key: 'config.box.name', name: '名称', type: 'text'},
                        // {key: 'config.options.text.content', name: '内容', type: 'text'},
                        // {key: 'config.options.text.fontSize', name: '大小', type: 'number'},
                        // {key: 'config.options.text.fontWeight', name: '粗细', type: 'select', data: [{text: '正常', value: 'normal'}, {text: '加粗', value: 'bold'}, {text: '细化', value: 'lighter'}]},
                        // {key: 'config.options.text.color', name: '颜色', type: 'color'},
                        // {key: 'config.options.background.color', name: '背景色', type: 'color'},
                        // {key: 'config.options.boxSpace.lineHeight', name: '行高', type: 'number'},
                        // {key: 'config.options.boxSpace.textAlign', name: '对其方式', type: 'select', data: [{text: '居左对齐', value: 'left'}, {text: '居中对齐', value: 'center'}, {text: '居右对齐', value: 'right'}]},
                        // {key: 'config.options.border.width', name: '边框粗细', type: 'number'},
                        // {key: 'config.options.border.color', name: '边框颜色', type: 'color'}
                    ]
                }
            }
        ]
    }
}
