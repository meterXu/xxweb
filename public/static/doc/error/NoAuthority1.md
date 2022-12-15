### NoAuthority1

:::demo

```html
<template>
    <div style="width: 100%;height: 600px">
        <NoAuthority1 :link="link"/>
    </div>
</template>
<script>
import {NoAuthority1} from '@dpark/s2-xxweb-box'
export default {
    data(){
        return {
            link:{
                home: window.location.pathname
            }
        }
    },
    components:{
        NoAuthority1
    }
}
</script>
```
:::
