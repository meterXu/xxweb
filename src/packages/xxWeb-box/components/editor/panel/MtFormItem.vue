<script>
import {get} from "lodash";
import MtIconDrop from './MtIconDrop'
import VerticalControl from './VerticalControl'
import DataComponents from './DataComponents'
export default {
  name: 'mtFormItem',
  functional: true,
  props: {
    fItem: Object,
    panel: Object,
    controlledObj: Object
  },
  components:{MtIconDrop,VerticalControl,DataComponents},
  render(createElement, context) {
    const {Input,InputNumber,Select,Switch,Option,Radio,RadioGroup,ColorPicker,Tooltip} =require('element-ui')
    function getModelPro(proPath, controlledObj){
      const parentProPath = proPath.substring(0,proPath.lastIndexOf('.'))
      const key = proPath.substring(proPath.lastIndexOf('.')+1)
      const obj = get(controlledObj,parentProPath)
      return {
        obj,
        key
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

    function renderItem(fItem, modelPro) {
      fItem.props = fItem.props||{}
      switch (fItem.type) {
        case 'number': {
          let number =
              (<el-input-number class={fItem.props['class']}
                                controls-position={fItem.props['controls-position']||'right'}
                                controls={fItem.props['controls']}
                                value={modelPro.obj[modelPro.key]}
                                onInput={$event => {modelPro.obj[modelPro.key] = $event}}
                                size="mini"></el-input-number>)

          return (
              <span>
                {number} {fItem.unit}
              </span>
          )
        }
        case 'text': {
          return (<el-input value={modelPro.obj[modelPro.key]} onInput={$event => {modelPro.obj[modelPro.key] = $event}} size="mini"/>)
        }
        case 'color': {
          return (<el-color-picker value={modelPro.obj[modelPro.key]} onInput={$event => {modelPro.obj[modelPro.key] = $event}} size="mini" show-alpha={true} predefine={predefine}></el-color-picker>)
        }
        case 'textarea': {
          return (
              <el-input type="textarea" rows={4} value={modelPro.obj[modelPro.key]} onInput={$event => {modelPro.obj[modelPro.key] = $event}} size="mini"/>
          )
        }
        case 'boolean': {
          return (
              <el-switch value={modelPro.obj[modelPro.key]} onInput={$event => {modelPro.obj[modelPro.key] = $event}} onChange={$event=>{event.stopPropagation()}} size="mini">
              </el-switch>
          )
        }
        case 'select': {
          if(fItem.data.isPath) {
            let options = []
            fItem.data.dataArr.forEach(item=>{
              options.push({
                label:item.label,
                options:modelPro.obj[item.data]
              })
            })
            return (
                <el-select value={modelPro.obj[modelPro.key]} onInput={$event => {modelPro.obj[modelPro.key] = $event}} size="mini">
                  {options.map(item=><el-option-group label={item.label} key={item.label}>{
                    item.options.map(o=><el-option label={o.name} value={o.id}>{o.name}</el-option>)
                  }</el-option-group>)}
                </el-select>
            )
            return
          } else {
            return (
                <el-select value={modelPro.obj[modelPro.key]} onInput={$event => {modelPro.obj[modelPro.key] = $event}} size="mini">
                  {fItem.data.map(item=><el-option label={item.text} value={item.value}>{item.text}</el-option>)}
                </el-select>
            )
          }
        }
        case 'radio':{
          return (
              <el-radio-group value={modelPro.obj[modelPro.key]} onInput={$event => {modelPro.obj[modelPro.key] = $event}} size="mini">
                {fItem.data.map(item=><el-radio label={item.value}>
                  {item.text}
                </el-radio>)}
              </el-radio-group>
          )
        }
        case 'checkbox':{
          return (
              <el-checkbox-group value={modelPro.obj[modelPro.key]} onInput={$event => {modelPro.obj[modelPro.key] = $event}} size="mini">
                {fItem.data.map(item=><el-checkbox label={item.value}>
                  {item.text}
                </el-checkbox>)}
              </el-checkbox-group>
          )
        }
        case 'slider': {
          return (
              <el-slider value={modelPro.obj[modelPro.key]}
                      onInput={$event => {modelPro.obj[modelPro.key] = $event}} size="mini"
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
        case 'icon-drop':{
          return (
              <MtIconDrop value={modelPro.obj[modelPro.key]} onChange={$event => {modelPro.obj[modelPro.key] = $event}} size="mini" items={fItem.data}></MtIconDrop>
          )
        }
        case 'horizontal-control':{
          let rendered = []
          fItem.props.forEach((item)=>{
            rendered.push(renderItem(item,{
                obj:modelPro.obj[modelPro.key],
                key:item.key
              }))
          })
          return (createElement('div',{
                attrs:{
                  class:"pro-panel text-style-row"
                }},rendered.map((item)=> {
                  return (<div class="text-style-col">
                    {item}
                  </div>)
                })
              ))
        }
        case 'vertical-control':{
          return (
              <VerticalControl value={modelPro.obj[modelPro.key]} onChange={$event => {modelPro.obj[modelPro.key] = $event}} size="mini"></VerticalControl>
          )
        }
        case 'data-components':{
          return (
              <DataComponents value={modelPro.obj[modelPro.key]} onChange={$event => {modelPro.obj[modelPro.key] = $event}} size="mini"></DataComponents>
          )
        }
        case 'inner-array':{
          return (null)
        }
        case 'img-dialog':{
          return (null)
        }
        case 'img-select':{
          return (null)
        }
        case 'code-dialog': {
          return (null)
        }
        case 'code': {
          return (null)
        }
        case 'div':{
          return (
              <div class="mt-emptyDiv" style={{width: 'auto',height: fItem.style.height+'px'}}></div>
          )
        }
        case 'span':{
          return (
              <span class="mt-emptySpan">{fItem.value}</span>
          )
        }
        default:{
          return (
              <Input value={modelPro.obj[modelPro.key]} onInput={$event => {modelPro.obj[modelPro.key] = $event}} size="mini"/>
          )
        }
      }
    }

    const {fItem, controlledObj} = context.props
    const modelPro = getModelPro(fItem.key,controlledObj)
    return renderItem(fItem, modelPro)
  }
}
</script>
<style lang="less">
.pro-panel .text-style-row{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.pro-panel .text-style-row,.text-style-col {
  height: 28px;
  line-height: 28px;
}
.pro-panel .text-style-col{
  margin-right: 4px;
  margin-bottom: 4px;
}
.pro-panel .el-input-number{
  position: relative;
  top: -1px;
}
.unit-px:after{
  position: absolute;
  right: 4px;
  top: 0;
  content: 'px';
  color: #666666;
  opacity: 0.5;
}
.unit-percent:after{
  position: absolute;
  right: 4px;
  top: 0;
  content: '%';
  color: #666666;
  opacity: 0.5;
}
.pro-panel .text-style-col .el-input__inner{
  padding-left:0 !important;
  padding-right: 0px !important;
  text-align: left;
  text-indent: 3px;
  height: 26px;
  line-height: 26px;
}
.pro-panel .text-style-col{
  .el-input-number__decrease{
    width: 12px!important;
  }
  .el-input-number__increase{
    width: 12px!important;
  }
  .el-input-number{
    width: 60px;
  }
  .el-select{
    width: 75px;
    .el-input__suffix{
      right: -2px;
    }
  }
}
</style>
