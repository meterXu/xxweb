<template>
  <Breadcrumb separator-class="el-icon-arrow-right">
    <BreadcrumbItem>系统页面</BreadcrumbItem>
    <BreadcrumbItem :to="{ path: '/page/1' }">页面1</BreadcrumbItem>
  </Breadcrumb>
</template>

<script>
import {Breadcrumb,BreadcrumbItem} from 'element-ui'
export default {
  name: "HeadBreadcrumb",
  components:{Breadcrumb,BreadcrumbItem}
}
</script>

<style scoped>

</style>