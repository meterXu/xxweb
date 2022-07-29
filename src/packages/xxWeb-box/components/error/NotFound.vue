<template>
  <div class="xxWeb">
    <div class="not-found">
      <div class="code">404</div>
      <div class="info">OPPS，<br/>WE HAVE AN ERROR</div>
      <ul class="goHome">
        <li v-for="(item,index) in 8" :key="index" class="cloud">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import '../../assets/css/404.less'
export default {
  name: "NotFound"
}
</script>