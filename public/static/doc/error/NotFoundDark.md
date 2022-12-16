### NotFoundDark

:::demo

```html
<template>
    <div style="width: 100%;height: 600px">
        <NotFoundDark :link="link"/>
    </div>
</template>
<script>
import {NotFound} from '@dpark/s2-xxweb-box'
export default {
    data(){
        return {
            link:{
                home: window.location.pathname
            }
        }
    },
    components:{
        NotFoundDark
    }
}
</script>
```
:::
