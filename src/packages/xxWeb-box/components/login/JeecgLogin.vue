<template>
  <div class="jeecg-user-login">
    <div class="container">
      <div class="top">
        <div class="header">
          <a href="/">
            <img v-if="config.logo" :src="config.logo" class="logo" alt="logo">
            <span class="title">{{ this.$route.query.title?this.$route.query.title:config.login.title }}</span>
          </a>
        </div>
        <div class="desc">
          {{ config.login.desc }}
        </div>
      </div>
      <div class="main">
        <Form>
          <Tabs v-model="activeName">
            <TabPane label="系统登录" name="first">
              xxx
            </TabPane>
          </Tabs>
        </Form>
      </div>
      <template v-if="config.footer">
        <div class="footer">
          <template v-if="config.footer.links">
            <div class="links">
              <template v-for="link in config.footer.links">
                <a :key="link.name" :href="link.href" :target="link.target">{{ link.name }}</a>
              </template>
            </div>
          </template>
          <template v-if="config.footer.copyright">
            <div class="copyright" v-if="config.footer.copyright">
              Copyright &copy; {{ config.footer.copyright.year }} <a :href="config.footer.copyright.href" :target="config.footer.copyright.target">{{ config.footer.copyright.content }}</a>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import '../../assets/css/jeecg-login.less'
import {Form,FormItem,Tabs,TabPane} from 'element-ui'
export default {
  name: "JeecgLogin",
  props:['config'],
  components:{
    Form,
    FormItem,
    Tabs,
    TabPane
  },
  data(){
    return {
      activeName:'first'
    }
  }
}
</script>

<style scoped>

</style>
