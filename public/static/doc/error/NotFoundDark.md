### NotFoundDark

:::demo

```html
<template>
    <div style="width: 100%;height: 600px">
        <NotFoundDark :link="link"/>
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
