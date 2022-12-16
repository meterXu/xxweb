### NoAuthority2

:::demo

```html
<template>
    <div style="width: 100%;height: 600px">
        <NoAuthority2 :link="link"/>
    </div>
</template>
<script>
import {NoAuthority2} from '@dpark/s2-xxweb-box'
export default {
    data(){
        return {
            link:{
                home: window.location.pathname
            }
        }
    },
    components:{
        NoAuthority2
    }
}
</script>
```
:::
