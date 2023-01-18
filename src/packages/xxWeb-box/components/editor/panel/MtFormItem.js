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
        function getModelProp(proPath, controlledObj,key) {
            let modelObj = null
            if(controlledObj){
                const proDeep = proPath.split('/')
                proDeep.forEach(pro => {
                    if (modelObj) {
                        modelObj = modelObj[pro]
                    } else {
                        modelObj = pro?controlledObj.config[pro]:controlledObj.config
                    }
                })
            }
            return modelObj

        }

        function renderItem(fItem, modelObj) {
            switch (fItem.type) {
                case 'number': {
                    return (
                        <span>
                            <InputNumber value={modelObj[fItem.key]} onInput={$event => {modelObj[fItem.key] = $event}} size="mini"></InputNumber> {fItem.unit || 'px'}
                        </span>
                    )
                }
                case 'text': {
                    return (<Input value={modelObj[fItem.key]} onInput={$event => {modelObj[fItem.key] = $event}} size="mini"/>)
                }
                case 'color': {
                    return null
                }
                case 'textarea': {
                    return (
                        <Input type="textarea" rows={4} value={modelObj[fItem.key]} onInput={$event => {modelObj[fItem.key] = $event}} size="mini"/>
                    )
                }
                case 'boolean': {
                    return (
                        <Switch value={modelObj[fItem.key]} onInput={$event => {modelObj[fItem.key] = $event}} size="mini">
                        </Switch>
                    )
                }
                case 'select': {
                    return (
                        <Select size="small" value={modelObj[fItem.key]} onInput={$event => {modelObj[fItem.key] = $event}} size="mini">
                            {fItem.data.map(item=><Option value={item.value}>{item.text}</Option>)}
                        </Select>
                    )
                }
                case 'code': {
                    return (null)
                }
                case 'radio':{
                    return (
                        <RadioGroup value={modelObj[fItem.key]} onInput={$event => {modelObj[fItem.key] = $event}} size="mini">
                            {fItem.data.map(item=><Radio label={item.value}>
                                <Icon type={item.icon}></Icon>
                                <span>{item.text}</span>
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
                        <Input value={modelObj[fItem.key]} onInput={$event => {modelObj[fItem.key] = $event}} size="mini"/>
                    )
                }
            }
        }

        const {fItem, panel, controlledObj} = context.props
        const modelObj = getModelProp(panel.key, controlledObj,fItem.key)
        return renderItem(fItem, modelObj)
    }
}