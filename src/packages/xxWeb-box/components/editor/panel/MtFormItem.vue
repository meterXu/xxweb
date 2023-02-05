<script>
import {get} from "lodash";

/*textStyle:{
fontStyle:"",
fontWeight:'',
fontSize:12,
color:''
}

    {key: 'config.options.title.textStyle', name: '标题风格', type: 'text-style',props:{
        size:{key:'fontSize',name:'大小',type:'number',data:[]},
        style:{key:'fontStyle',name:'风格',type:'select',data:[]},
        weight:{key:'fontWeight',name:'粗细',type:'select',data:[]},
        color:{key:'color',name:'颜色',type:'color'}
    }},



*/




export default {
  name: 'mtFormItem',
  functional: true,
  props: {
    fItem: Object,
    panel: Object,
    controlledObj: Object
  },
  render(createElement, context) {
    const {Input,InputNumber,Select,Switch,Option,Radio,RadioGroup,ColorPicker,Tooltip} =require('element-ui')
    const {get} = require('lodash')

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
          return (
              <span>
                <InputNumber controls-position="right" value={modelPro.obj[modelPro.key]} onInput={$event => {modelPro.obj[modelPro.key] = $event}} size="mini"></InputNumber> {fItem.unit}
              </span>
          )
        }
        case 'text': {
          return (<Input value={modelPro.obj[modelPro.key]} onInput={$event => {modelPro.obj[modelPro.key] = $event}} size="mini"/>)
        }
        case 'color': {
          return (<ColorPicker value={modelPro.obj[modelPro.key]} onInput={$event => {modelPro.obj[modelPro.key] = $event}} size="mini" show-alpha={true} predefine={predefine}></ColorPicker>)
        }
        case 'textarea': {
          return (
              <Input type="textarea" rows={4} value={modelPro.obj[modelPro.key]} onInput={$event => {modelPro.obj[modelPro.key] = $event}} size="mini"/>
          )
        }
        case 'boolean': {
          return (
              <Switch value={modelPro.obj[modelPro.key]} onInput={$event => {modelPro.obj[modelPro.key] = $event}} size="mini">
              </Switch>
          )
        }
        case 'select': {
          return (
              <Select size="small" value={modelPro.obj[modelPro.key]} onInput={$event => {modelPro.obj[modelPro.key] = $event}} size="mini">
                {fItem.data.map(item=><Option label={item.text} value={item.value}>{item.text}</Option>)}
              </Select>
          )
        }
        case 'radio':{
          return (
              <RadioGroup value={modelPro.obj[modelPro.key]} onInput={$event => {modelPro.obj[modelPro.key] = $event}} size="mini">
                {fItem.data.map(item=><Radio label={item.value}>
                  {item.text}
                </Radio>)}
              </RadioGroup>
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
          return (null)
        }
        case 'text-style':{
          let sizeRendered = null
          let colorRendered = null
          let weightRendered = null
          let styleRendered = null

          if(fItem.props.hasOwnProperty('size')){
            sizeRendered = renderItem(fItem.props['size'],{
              obj:modelPro.obj[modelPro.key],
              key:fItem.props['size'].key
            })
          }
          if(fItem.props.hasOwnProperty('color')){
            colorRendered = renderItem(fItem.props['color'],{
              obj:modelPro.obj[modelPro.key],
              key:fItem.props['color'].key
            })
          }
          if(fItem.props.hasOwnProperty('weight')){
            weightRendered = renderItem(fItem.props['weight'],{
              obj:modelPro.obj[modelPro.key],
              key:fItem.props['weight'].key
            })
          }
          if(fItem.props.hasOwnProperty('style')){
            styleRendered = renderItem(fItem.props['style'],{
              obj:modelPro.obj[modelPro.key],
              key:fItem.props['style'].key
            })
          }
          return (
              <el-row>
                {
                  sizeRendered&&(
                      <el-col span={6}>
                        {sizeRendered}
                      </el-col>
                  )
                }
                {
                  colorRendered&&(
                      <el-col span={6}>
                        {colorRendered}
                      </el-col>
                  )
                }
                {
                  weightRendered&&(
                      <el-col span={6}>
                        {weightRendered}
                      </el-col>
                  )
                }
                {
                  styleRendered&&(
                      <el-col span={6}>
                        {styleRendered}
                      </el-col>
                  )
                }
              </el-row>
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