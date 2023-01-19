import {get} from "lodash";

export default {
    name: 'mtFormItem',
    functional: true,
    props: {
        fItem: Object,
        panel: Object,
        controlledObj: Object
    },
    render(createElement, context) {
        const {Input,InputNumber,Select,Switch,Option,Radio,RadioGroup} =require('element-ui')
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

        function renderItem(fItem, modelPro) {
            switch (fItem.type) {
                case 'number': {
                    return (
                        <span>
                            <InputNumber value={modelPro.obj[modelPro.key]} onInput={$event => {modelPro.obj[modelPro.key] = $event}} size="mini"></InputNumber> {fItem.unit || 'px'}
                        </span>
                    )
                }
                case 'text': {
                    return (<Input value={modelPro.obj[modelPro.key]} onInput={$event => {modelPro.obj[modelPro.key] = $event}} size="mini"/>)
                }
                case 'color': {
                    return null
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
                case 'code': {
                    return (null)
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
                case 'img-selector':{
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