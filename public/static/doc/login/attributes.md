### 属性

|prop| remark           |
|---|------------------|
|config| 配置               |
|remember| 初始是显示记住密码，默认true |
|placeholder| input描述，{username:'请输入用户名/邮箱/手机号',password:"请输入密码"}         |
|rules| 验证规则             |
|form| 表单               |

### 事件
|methodName| methodParams                | remark |
|---|-----------------------------|------|
|login| valid:Boolean,loginState:{loading:false} | 登录   |



### 插槽

| slotName | slotProps | remark   |
|----------|-----------|----------|
| default  | ---       | 整个登录内容区域 |
| form-item-prefix  | ---       | 表单前置内容   |
| form-item-suffix  |---| 表单后置内容   |
|form-login-btn|---| 表单按钮内容   |
|form-login-btn-other|---| 额外表单按钮   |
