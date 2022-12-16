### NotFound2

:::demo

```html
<template>
    <div style="width: 100%;height: 600px">
        <NotFound2 :link="link"/>
    </div>
</template>
<script>
import {NotFound2} from '@dpark/s2-xxweb-box'
export default {
    data(){
        return {
            link:{
                home: window.location.pathname
            }
        }
    },
    components:{
        NotFound2
    }
}
</script>
```
:::
