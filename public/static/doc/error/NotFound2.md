### NotFound2

:::demo

```html
<template>
    <div style="width: 100%;height: 600px">
        <NotFound2 :link="link"/>
    </div>
</template>
<script>
export default {
    data(){
        return {
            link:{
                home: window.location.pathname
            }
        }
    }
}
</script>
```
:::
