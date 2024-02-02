<template>
  <div class="xxWeb">
    <div class="wdp-login">
      <div class="container">
        <slot v-bind:config="config">
          <Row style="height: 100%">
            <Col style="height: 100%" :span="16">
              <slot name="login-container-left">
                <div class="left">
                  <div class="bg-header">
                    <img :src="config.logo" class="logo" alt="logo" />
                    <span class="title">{{ config.login.title }}</span>
                  </div>
                  <img
                    class="bg-img"
                    src="../../assets/imgs/login3/slogan.svg"
                    alt=""
                  />
                </div>
              </slot>
            </Col>
            <Col style="height: 100%" :span="8">
              <slot name="login-container-right">
                <div class="main">
                  <div class="login-header">
                    <span v-if="config.login" class="title">{{
                      config.login.title
                    }}</span>
                  </div>
                  <Tabs
                    v-model:value="loginState.activeName"
                    @tab-click="handleClick"
                  >
                    <TabPane name="password">
                      <template v-slot:label>
                        <span class="tab-pane-label">密码登录</span>
                      </template>
                      <Form
                        ref="loginForm-password"
                        :model="form.password"
                        :rules="rules.password"
                      >
                        <slot name="form-item-prefix"></slot>
                        <FormItem prop="username">
                          <Input
                            v-model="form.password.username"
                            @keyup.enter="login"
                            :placeholder="placeholder.username"
                          />
                        </FormItem>
                        <FormItem prop="password">
                          <Input
                            type="password"
                            v-model="form.password.password"
                            @keyup.enter="login"
                            :placeholder="placeholder.password"
                          />
                        </FormItem>
                        <FormItem prop="verificationCode">
                          <Row :gutter="10">
                            <Col :span="16"
                              ><Input
                                v-model="form.password.verificationCode"
                                @keyup.enter="login"
                                :placeholder="placeholder.verificationCode"
                            /></Col>
                            <Col :span="8">
                              <template class="vc-img">
                                <slot name="form-login-verificationCode">
                                  <img
                                    class="vc-img"
                                    src="../../assets/imgs/login3/verification-code.png"
                                  />
                                </slot>
                              </template>
                            </Col>
                          </Row>
                        </FormItem>
                        <slot name="form-item-suffix"></slot>
                      </Form>
                      <slot name="form-login-btn">
                        <Button
                          :loading="loginState.loading"
                          :disabled="loginState.loading"
                          class="login-btn"
                          type="primary"
                          @click="login"
                          >登 录
                        </Button>
                        <slot name="form-login-btn-other"></slot>
                      </slot>
                    </TabPane>
                    <TabPane name="message">
                      <template v-slot:label>
                        <span class="tab-pane-label">短信登录</span>
                      </template>
                      <Form
                        ref="loginForm-message"
                        :model="form.message"
                        :rules="rules.message"
                      >
                        <slot name="form-item-prefix"></slot>
                        <FormItem prop="phone">
                          <Input
                            v-model="form.message.phone"
                            @keyup.enter="login"
                            :placeholder="placeholder.phone"
                          />
                        </FormItem>
                        <FormItem prop="verificationCode">
                          <Input
                            v-model="form.message.verificationCode"
                            @keyup.enter="login"
                            :placeholder="placeholder.verificationCode"
                          />
                        </FormItem>
                        <slot name="form-item-suffix"></slot>
                      </Form>
                      <slot name="form-login-btn">
                        <Button
                          :loading="loginState.loading"
                          :disabled="loginState.loading"
                          class="login-btn"
                          type="primary"
                          @click="login"
                          >登 录
                        </Button>
                        <slot name="form-login-btn-other"></slot>
                      </slot>
                    </TabPane>
                  </Tabs>
                  <slot name="login-footer">
                    <div class="login-footer">
                      <span class="register" @click="registry">账号注册</span>
                      <span class="certified" @click="enterpriseCertification"
                        >企业认证</span
                      >
                      <span class="forgot-btn" @click="forgotPassword"
                        >忘记密码</span
                      >
                    </div>
                    <Divider direction="horizontal" content-position="center"
                      >第三方账号登录</Divider
                    >
                    <div class="third-party">
                      <img
                        class="third-party-img"
                        src="../../assets/imgs/login3/weixin.svg"
                        @click="wxLogin"
                      />
                    </div>
                  </slot>
                </div>
              </slot>
            </Col>
          </Row>
        </slot>
      </div>
      <div class="footer" v-if="config.footer.show">
        <template v-if="config.footer.copyright">
          <div class="copyright" v-if="config.footer.copyright">
            Copyright &copy; {{ config.footer.copyright.year }}
            <a
              :href="config.footer.copyright.href"
              :target="config.footer.copyright.target"
              >{{ config.footer.copyright.content }}</a
            >
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import '../../assets/css/login/wdp-login.less'
import {
  ElForm as Form,
  ElFormItem as FormItem,
  ElInput as Input,
  ElButton as Button,
  ElCheckbox as Checkbox,
  ElRow as Row,
  ElCol as Col,
  ElTabs as Tabs,
  ElTabPane as TabPane,
  ElDivider as Divider,
} from 'element-plus'

export default {
  name: 'WDPLogin',
  props: {
    config: {
      default() {
        return {}
      },
    },
    tips: { default: true },
    remember: { default: true },
    placeholder: {
      default() {
        return {
          username: '请输入用户名/邮箱/手机号',
          password: '请输入密码',
          phone: '请输入手机号码',
          verificationCode: '请输入验证码',
        }
      },
    },
    rules: {
      type: Object,
      default() {
        return {
          password: {
            username: [
              { required: true, message: '用户名不能为空', trigger: 'blur' },
            ],
            password: [
              { required: true, message: '密码不能为空', trigger: 'blur' },
            ],
            verificationCode: [
              { required: true, message: '验证码不能为空', trigger: 'blur' },
            ],
          },
          message: {
            phone: [
              { required: true, message: '验证码不能为空', trigger: 'blur' },
            ],
            verificationCode: [
              { required: true, message: '验证码不能为空', trigger: 'blur' },
            ],
          },
        }
      },
    },
    form: {
      type: Object,
      default() {
        return {
          remember: false,
          password: {
            username: null,
            password: null,
            verificationCode: null,
          },
          message: {
            phone: null,
            verificationCode: null,
          },
        }
      },
    },
  },
  data() {
    return {
      loginState: {
        loading: false,
        activeName: 'password',
      },
    }
  },
  model: {
    prop: 'form',
    event: 'change',
  },
  components: {
    Form,
    FormItem,
    Input,
    Button,
    Checkbox,
    Row,
    Col,
    Tabs,
    TabPane,
    Divider,
  },
  methods: {
    login() {
      this.$refs['loginForm-' + this.loginState.activeName].validate(
        (valid) => {
          this.$emit( 'login', valid, this.loginState)
        }
      )
    },
    handleClick(tab, event) {
      this.$emit( 'loginTypeChange', this.loginState.activeName)
    },
    registry() {
      this.$emit( 'registry')
    },
    enterpriseCertification() {
      this.$emit( 'enterpriseCertification')
    },
    forgotPassword() {
      this.$emit( 'forgotPassword')
    },
    wxLogin() {
      this.$emit( 'wxLogin')
    },
  },
  emits: [
    'login',
    'loginTypeChange',
    'registry',
    'enterpriseCertification',
    'forgotPassword',
    'wxLogin',
  ],
}
</script>
