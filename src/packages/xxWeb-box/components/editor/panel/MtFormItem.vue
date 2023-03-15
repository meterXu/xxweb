<script>
import { get, set } from "lodash";
import MtIconDrop from './MtIconDrop'
import MtIconBind from './MtIconBind'
import ArrayControl from './ArrayControl'
import DataComponents from './DataComponents'
import MtIcon from "../view/MtIcon.vue";
import MtIconSelect from "../panel/MtIconSelect.vue";
export default {
  name: 'mtFormItem',
  functional: true,
  props: {
    fItem: Object,
    panel: Object,
    controlledObj: Object
  },
  components: { MtIconDrop, MtIconBind, ArrayControl, DataComponents, MtIconSelect },
  render(createElement, context) {
    const { Input, InputNumber, Select, Switch, Option, Radio, RadioGroup, ColorPicker, Tooltip } = require('element-ui')

    function getModelPro(proPath, type, controlledObj) {
      const parentProPath = proPath.substring(0, proPath.lastIndexOf('.'))
      const key = proPath.substring(proPath.lastIndexOf('.') + 1)
      const obj = get(controlledObj, parentProPath)
      if (!obj) {
        set(controlledObj, proPath, type === 'array-control' ? [] : null)
      } else if (obj[key] === undefined) {
        set(controlledObj, proPath, type === 'array-control' ? [] : null)
      }
      return {
        obj,
        key
      }
    }

    // 判断含有特殊样式的输入框，默认高度为28px，该函数返回的class不限制它的高度
    function hasSpecialClass(item) {
      // desc为有描述的input文本
      if (item.desc) {
        return true
      } else {
        return false
      }
    }
    const predefine = [
      '#ff4500',
      '#ff8c00',
      '#ffd700',
      '#90ee90',
      '#00ced1',
      '#1e90ff',
      '#c71585',
      'rgba(255, 69, 0, 0.68)',
      'rgb(255, 120, 0)',
      'hsv(51, 100, 98)',
      'hsva(120, 40, 94, 0.5)',
      'hsl(181, 100%, 37%)',
      'hsla(209, 100%, 56%, 0.73)',
      '#c7158577'
    ]
    // 处理绑定 数组值时 监听不到变化 不刷新问题 
    function autoChange(fItem) {
      // TODO: 需要在云平台中配置个 isChange
      if(fItem.autoChange && controlledObj.config.options) {
        controlledObj.config.options.isChange = !controlledObj.config.options.isChange;
      }
    }
    function renderItem(fItem, modelPro) {
      fItem.props = fItem.props || {};
      if(fItem.deep) {
        let arr = modelPro.key.split('.');
        for (let index = 0; index < arr.length-1; index++) {
          const key = arr[index];
          modelPro.obj = modelPro.obj[key];
        }
        modelPro.key = arr[arr.length -1];
      } // 深层次处理obj【】  xxx.xxx.xxx情况
      switch (fItem.type) {
        case 'number': {
          // {fItem.unit}
          // 预配置的前缀图标
          let PrependSlot = fItem.props.prepend ? (
            <MtIcon icon={fItem.props.prepend} size={16}></MtIcon>
          ) : ''
          // 底部文字介绍标识
          let DescBtm = fItem.desc ? (
            <div class='desc'>{fItem.desc}</div>
          ) : ''
          let number =
            (<div class={fItem.props.prepend ? 'prepend' : 'number-box'}>{PrependSlot}<el-input-number class={fItem.props['class']}
              controls-position={fItem.props['controls-position'] || 'right'}
              controls={fItem.props['controls']}
              value={modelPro.obj[modelPro.key]}
              onInput={$event => { modelPro.obj[modelPro.key] = $event;autoChange(fItem) }}
              size="mini"></el-input-number>{DescBtm}</div>)
          return number
        }
        case 'text': {
          return (<el-input value={modelPro.obj[modelPro.key]} onInput={$event => { modelPro.obj[modelPro.key] = $event;autoChange(fItem) }} size="mini" />)
        }
        case 'color': {
          return (
              <el-row>
                <el-col span={fItem.hasInput?4:24} class='text-col-twice'>
                  <el-color-picker value={modelPro.obj[modelPro.key]}
                                   onInput={$event => { modelPro.obj[modelPro.key] = $event;autoChange(fItem) }}
                                   onactive-change={$event=>{
                                     modelPro.obj[modelPro.key] = $event
                                   }}
                                   size="mini" show-alpha={true} predefine={predefine}></el-color-picker>
                </el-col>
                {fItem.hasInput&&(
                    <el-col span={20} className='text-col-twice'>
                      <el-input value={modelPro.obj[modelPro.key]} onInput={$event => {
                        modelPro.obj[modelPro.key] = $event;
                        autoChange(fItem)
                      }} size="mini"></el-input>
                    </el-col>
                )}

              </el-row>
          )
        }
        case 'textarea': {
          return (
            <el-input type="textarea" rows={4} value={modelPro.obj[modelPro.key]} onInput={$event => { modelPro.obj[modelPro.key] = $event }} size="mini" />
          )
        }
        case 'boolean': {
          return (
            <div class={modelPro.obj[modelPro.key] ? 'mt-boolean-active' : 'mt-boolean-inactive'}>
              <el-switch active-color={'#FFFFFF'} inactive-color={'#FFFFFF'} value={modelPro.obj[modelPro.key]} onInput={$event => { modelPro.obj[modelPro.key] = $event }} onChange={$event => { event.stopPropagation() }} size="mini">
              </el-switch>
            </div>
          )
        }
        case 'select': {
          if (fItem.data.isPath) {
            let options = []
            fItem.data.dataArr.forEach(item => {
              options.push({
                label: item.label,
                options: modelPro.obj[item.data] || []
              })
            })
            return (
              <el-select value={modelPro.obj[modelPro.key]} onInput={$event => { modelPro.obj[modelPro.key] = $event }} size="mini">
                {options.map(item => <el-option-group label={item.label} key={item.label}>{
                  item.options.map(o => <el-option label={o.name} value={o.id}>{o.name}</el-option>)
                }</el-option-group>)}
              </el-select>
            )
          } else {
            return (
              <el-select value={modelPro.obj[modelPro.key]} onInput={$event => { modelPro.obj[modelPro.key] = $event }} size="mini">
                {fItem.data.map(item => <el-option label={item.text} value={item.value}>{item.text}</el-option>)}
              </el-select>
            )
          }
        }
        case 'IconSelect': {
          return (
            <MtIconSelect value={modelPro.obj[modelPro.key]} items={fItem.data} onChange={$event => { modelPro.obj[modelPro.key] = $event }}></MtIconSelect>
          )
        }
        case 'radio': {
          return (
            <el-radio-group value={modelPro.obj[modelPro.key]} onInput={$event => { modelPro.obj[modelPro.key] = $event }} size="mini">
              {fItem.data.map(item => <el-radio label={item.value}>
                {item.text}
              </el-radio>)}
            </el-radio-group>
          )
        }
        case 'checkbox': {
          return (
            <el-checkbox-group value={modelPro.obj[modelPro.key]} onInput={$event => { modelPro.obj[modelPro.key] = [...$event] }} size="mini">
              {fItem.data.map(item => <el-checkbox label={item.value}>
                {item.text}
              </el-checkbox>)}
            </el-checkbox-group>
          )
        }
        case 'slider': {
          return (
            <el-slider value={modelPro.obj[modelPro.key]}
              onInput={$event => { modelPro.obj[modelPro.key] = $event }} size="mini"
              show-tooltip={fItem.props['show-tooltip']}
              format-tooltip={fItem.props['format-tooltip']}
              step={fItem.props['step']}
              show-stops={fItem.props['show-stops']}
              max={fItem.props['max']}
              min={fItem.props['min']}
              range={fItem.props['range']}
              marks={fItem.props['marks']}
            ></el-slider>
          )
        }
        // 图标 绑定元素同比例
        case 'icon-bind': {
          return (
            <MtIconBind value={modelPro.obj[modelPro.key]} onChange={$event => { modelPro.obj[modelPro.key] = $event }} items={fItem.data}></MtIconBind>
          )
        }
        case 'icon-drop': {
          return (
            <MtIconDrop value={modelPro.obj[modelPro.key]} onChange={$event => { modelPro.obj[modelPro.key] = $event }} size="mini" items={fItem.data}></MtIconDrop>
          )
        }
        case 'horizontal-control': {
          let rendered = []
          fItem.props.forEach((item) => {
            if (item.span) {
              rendered.push(
                <el-col span={item.span} class={['text-col', hasSpecialClass(item) ? 'text-col-height' : '']}>
                  {renderItem(item, {
                    obj: modelPro.obj[modelPro.key],
                    key: item.key
                  })}
                </el-col>
              )
            } else {
              rendered.push(
                <div class='text-style-col'>
                  {renderItem(item, {
                    obj: modelPro.obj[modelPro.key],
                    key: item.key
                  })}
                </div>
              )
            }
          })
          return (createElement('el-row', {
            attrs: {
              class: "horizontal-control text-style-row"
            }
          }, rendered
          ))
        }
        // div组件 通过外部div 配置样式 适应于部分场景
        case 'div-control': {
          let rendered = []
          fItem.props.forEach((item) => {
            rendered.push(renderItem(item, {
              obj: modelPro.obj,   //这里不动obj  确保div层不影响数据穿透
              key: modelPro.key
            }))
          })
          return (createElement('div', {
            attrs: {
              class: "div-control " + fItem['class']
            }
          }, rendered.map((item) => {
            return (
              <div>
                {item}
              </div>
            )
          })
          ))
        }
        case 'empty_number': {
          let number =
            (<el-input-number class={fItem.props['class']}
              controls={false}
              value={modelPro.obj[modelPro.key]}
              onInput={$event => { modelPro.obj[modelPro.key] = $event }}
              size="mini"></el-input-number>)
          return (
            <div class="empty_number">
              <div class="empty_number_name">{fItem.name} </div> {number} {fItem.unit}
            </div>
          )
        }
        case 'array-control': {
          modelPro.obj[modelPro.key] = modelPro.obj[modelPro.key]
          // activeKey 活动的标题
          // key 列表数据
          return (
            <ArrayControl value={modelPro.obj[modelPro.key]} activeKey={modelPro.obj[fItem.activeKey.slice(fItem.activeKey.lastIndexOf('.') + 1)
            ]} onChange={$event => { modelPro.obj[modelPro.key] = $event }} onchangeActive={$event => { modelPro.obj[fItem.activeKey.slice(fItem.activeKey.lastIndexOf('.') + 1)] = $event }} size="mini"></ArrayControl>
          )
        }
        case 'data-components': {
          return (
            <DataComponents ref="dataComponents" on={context.data.on} value={modelPro.obj[modelPro.key]} formoption={fItem.FormOption} onChange={$event => { modelPro.obj[modelPro.key] = $event }} size="mini"></DataComponents>
          )
        }
        case 'img-dialog': {
          return (null)
        }
        case 'img-select': {
          return (null)
        }
        case 'code-dialog': {
          return (null)
        }
        case 'code': {
          return (null)
        }
        // 空占位符
        case 'space': {
          return ''
        }
        case 'div': {
          return (
            <div class="mt-emptyDiv" style={{ width: 'auto', height: fItem.style.height + 'px' }}></div>
          )
        }
        case 'span': {
          return (
            <span class="mt-emptySpan">{fItem.value}</span>
          )
        }
        default: {
          return (
            <Input value={modelPro.obj[modelPro.key]} onInput={$event => { modelPro.obj[modelPro.key] = $event }} size="mini" />
          )
        }
      }
    }

    const { fItem, controlledObj } = context.props
    const modelPro = getModelPro(fItem.key, fItem.type, controlledObj)
    return renderItem(fItem, modelPro)
  }
}
</script>

<style lang="less">
.text-col {
  margin-bottom: 8px;
  line-height: 28px;
  height: 28px;
  padding-right: 4px;

  .text-col-twice {
    padding-right: 0;
  }
}

.text-col-height {
  height: auto;
}

.text-col-twice {
  line-height: 28px;
  height: 28px;
  height: 28px;
  padding-right: 4px;
}

.el-row {
  width: 100%;
}

.el-input-number {
  width: 100%;
}

.desc {
  text-align: center;
  font-size: 12px;
  line-height: 18px;
  color: #666;
}

.el-form-item__content {
  display: flex;
}

.prepend {
  position: relative;
  display: flex;

  .mt-icon {
    position: absolute;
    top: 50%;
    z-index: 999;
    left: 2px;
    transform: translate(0, -50%);
    color: #999;
  }

  .el-input {
    .el-input__inner {
      padding-left: 16px !important;
    }
  }


}

.el-input-number.is-without-controls .el-input__inner {
  padding-left: 2px;
  padding-right: 20px;
  text-align: left;
}
</style>