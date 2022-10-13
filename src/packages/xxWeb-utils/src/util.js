import {ACCESS_TOKEN} from './mutation-types'
import CryptoJS from 'crypto-js'
import moment from 'moment'

export function timeFix() {
    const time = new Date()
    const hour = time.getHours()
    return hour < 9 ? '早上好' : (hour <= 11 ? '上午好' : (hour <= 13 ? '中午好' : (hour < 20 ? '下午好' : '晚上好')))
}

export function welcome() {
    const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
    let index = Math.floor((Math.random()*arr.length))
    return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent() {
    let event = document.createEvent('HTMLEvents')
    event.initEvent('resize', true, true)
    event.eventType = 'message'
    window.dispatchEvent(event)
}

/**
 * 过滤对象中为空的属性
 * @param obj
 * @returns {*}
 */
export function filterObj(obj) {
    if (!(typeof obj == 'object')) {
        return;
    }

    for ( let key in obj) {
        if (obj.hasOwnProperty(key)
            && (obj[key] == null || obj[key] == undefined || obj[key] === '')) {
            delete obj[key];
        }
    }
    return obj;
}

/**
 * 深度克隆对象、数组
 * @param obj 被克隆的对象
 * @return 克隆后的对象
 */
export function cloneObject(obj) {
    return JSON.parse(JSON.stringify(obj))
}

/**
 * 随机生成数字
 *
 * 示例：生成长度为 12 的随机数：randomNumber(12)
 * 示例：生成 3~23 之间的随机数：randomNumber(3, 23)
 *
 * @param1 最小值 | 长度
 * @param2 最大值
 * @return int 生成后的数字
 */
export function randomNumber() {
    // 生成 最小值 到 最大值 区间的随机数
    const random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    if (arguments.length === 1) {
        let [length] = arguments
        // 生成指定长度的随机数字，首位一定不是 0
        let nums = [...Array(length).keys()].map((i) => (i > 0 ? random(0, 9) : random(1, 9)))
        return parseInt(nums.join(''))
    } else if (arguments.length >= 2) {
        let [min, max] = arguments
        return random(min, max)
    } else {
        return Number.NaN
    }
}

/**
 * 随机生成字符串
 * @param length 字符串的长度
 * @param chats 可选字符串区间（只会生成传入的字符串中的字符）
 * @return string 生成的字符串
 */
export function randomString(length, chats) {
    if (!length) length = 1
    if (!chats) chats = '0123456789qwertyuioplkjhgfdsazxcvbnm'
    let str = ''
    for (let i = 0; i < length; i++) {
        let num = randomNumber(0, chats.length - 1)
        str += chats[num]
    }
    return str
}

/**
 * 随机生成uuid
 * @return string 生成的uuid
 */
export function randomUUID() {
    let chats = '0123456789abcdef'
    return randomString(32, chats)
}

/**
 * 下划线转驼峰
 * @param string
 * @returns {*}
 */
export function underLine2CamelCase(string){
    return string.replace( new RegExp("_([a-z])",'g'), function( all, letter ) {
        return letter.toUpperCase();
    });
}

/**
 * 判断是否显示办理按钮
 * @param bpmStatus
 * @returns {*}
 */
export function showDealBtn(bpmStatus){
    if(bpmStatus!="1"&&bpmStatus!="3"&&bpmStatus!="4"){
        return true;
    }
    return false;
}

/**
 * 增强CSS，可以在页面上输出全局css
 * @param css 要增强的css
 * @param id style标签的id，可以用来清除旧样式
 */
export function cssExpand(css, id) {
    let style = document.createElement('style')
    style.type = "text/css"
    style.innerHTML = `@charset "UTF-8"; ${css}`
    // 清除旧样式
    if (id) {
        let $style = document.getElementById(id)
        if ($style != null) $style.outerHTML = ''
        style.id = id
    }
    // 应用新样式
    document.head.appendChild(style)
}


/** 用于js增强事件，运行JS代码，可以传参 */
// options 所需参数：
//    参数名         类型            说明
//    vm             VueComponent    vue实例
//    event          Object          event对象
//    jsCode         String          待执行的js代码
//    errorMessage   String          执行出错后的提示（控制台）
export function jsExpand(options = {}) {

    // 绑定到window上的keyName
    let windowKeyName = 'J_CLICK_EVENT_OPTIONS'
    if (typeof window[windowKeyName] != 'object') {
        window[windowKeyName] = {}
    }

    // 随机生成JS增强的执行id，防止冲突
    let id = randomString(16, 'qwertyuioplkjhgfdsazxcvbnm'.toUpperCase())
    // 封装按钮点击事件
    let code = `
    (function (o_${id}) {
      try {
        (function (globalEvent, vm) {
          ${options.jsCode}
        })(o_${id}.event, o_${id}.vm)
      } catch (e) {
        o_${id}.error(e)
      }
      o_${id}.done()
    })(window['${windowKeyName}']['EVENT_${id}'])
  `
    // 创建script标签
    const script = document.createElement('script')
    // 将需要传递的参数挂载到window对象上
    window[windowKeyName]['EVENT_' + id] = {
        vm: options.vm,
        event: options.event,
        // 当执行完成时，无论如何都会调用的回调事件
        done() {
            // 执行完后删除新增的 script 标签不会撤销执行结果（已产生的结果不会被撤销）
            script.outerHTML = ''
            delete window[windowKeyName]['EVENT_' + id]
        },
        // 当js运行出错的时候调用的事件
        error(e) {
            console.group(`${options.errorMessage || '用户自定义JS增强代码运行出错'}（${new Date()}）`)
            console.error(e)
            console.groupEnd()
        }
    }
    // 将事件挂载到document中
    script.innerHTML = code
    document.body.appendChild(script)
}

/**
 * 如果值不存在就 push 进数组，反之不处理
 * @param array 要操作的数据
 * @param value 要添加的值
 * @param key 可空，如果比较的是对象，可能存在地址不一样但值实际上是一样的情况，可以传此字段判断对象中唯一的字段，例如 id。不传则直接比较实际值
 * @returns {boolean} 成功 push 返回 true，不处理返回 false
 */
export function pushIfNotExist(array, value, key) {
    for (let item of array) {
        if (key && (item[key] === value[key])) {
            return false
        } else if (item === value) {
            return false
        }
    }
    array.push(value)
    return true
}

/**
 * 可用于判断是否成功
 * @type {symbol}
 */
export const succeedSymbol = Symbol()
/**
 * 可用于判断是否失败
 * @type {symbol}
 */
export const failedSymbol = Symbol()

/**
 * 使 promise 无论如何都会 resolve，除非传入的参数不是一个Promise对象或返回Promise对象的方法
 * 一般用在 Promise.all 中
 *
 * @param promise 可传Promise对象或返回Promise对象的方法
 * @returns {Promise<any>}
 */
export function alwaysResolve(promise) {
    return new Promise((resolve, reject) => {
        let p = promise
        if (typeof promise === 'function') {
            p = promise()
        }
        if (p instanceof Promise) {
            p.then(data => {
                resolve({ type: succeedSymbol, data })
            }).catch(error => {
                resolve({ type: failedSymbol, error })
            })
        } else {
            reject('alwaysResolve: 传入的参数不是一个Promise对象或返回Promise对象的方法')
        }
    })
}

/**
 * 根据一定的规则生成route name
 * @param path
 * @returns {String}
 */
export function getRoutesName(path){
    if(path){
        const rxs = [{
            rx:new RegExp('\/','g'),
            tx:'-'
        },{
            rx:new RegExp(':','g'),
            tx:'@'
        },{
            rx:new RegExp('^-','g'),
            tx:''
        }]
        rxs.forEach(c=>{
            path=path.replace(c.rx,c.tx)
        })
        return path
    }else{
        return ""
    }

}

/**
 * 解析路由信息
 * @param routes
 * @returns {Array}
 */
export function parseRoutes(routes){
    if(routes){
        const funRx = new RegExp("(?<=^@)\\w*(?=\\()",'g')
        const paramRx = new RegExp("(?<=\\()\\w*(?=\\)$)","g")
        routes.forEach(c=>{
            if(c.name&&funRx.test(c.name)){
                const funName = c.name.match(funRx)[0]
                switch (funName){
                    case "getRoutesName":{
                        c.name= getRoutesName(c[c.name.match(paramRx)[0]])
                    }
                }
            }
            if(c.children){
                c.children = parseRoutes(c.children)
            }
        })
        return routes
    }else{
        return []
    }
}

export function getOriginByNameSpace(namespace) {
    const script = document.querySelector("script[src*='" + namespace + ".js']")
    if (script) {
        let origin = script.getAttribute('src')
        origin = origin.replace(`/${namespace}.js`, '')
        return origin
    }
    return null
}


/**
 * 获取图片路径
 * @param {*} path
 * @returns
 */
export function getAssetsImg(path) {
    const regex = new RegExp("\\w*(?=\\/img\\/)","g")
    const matchs = path.match(regex)
    if (matchs) {
        const namespace = matchs[0]
        if (namespace) {
            const origin = getOriginByNameSpace(namespace)
            if (origin) {
                return `${origin}/${path}`
            } else {
                return `./${path}`
            }
        } else {
            return `./${path}`
        }
    } else {
        return `./${path}`
    }
}


/**
 * 获取url中的参数
 * @param variable
 * @param name
 * @returns {String | null|string}
 */
export function getQueryVariable(variable) {
    let query = ''
    if (window.location.search) {
        query = window.location.search.substring(1)
    } else {
        const urlSection = window.location.href.split('?')
        query = urlSection.length >= 2 ? urlSection[1] : null
    }
    if (query) {
        let vars = query.split('&')
        for (let i = 0; i < vars.length; i++) {
            let pair = vars[i].split('=')
            if (pair[0] === variable) { return decodeURIComponent(pair[1]) }
        }
    }
    return null
}

/**
 * 拼接url及参数
 * @param params
 * @returns {String}
 */
export function generateRealUrl(url,params){
    let query="";
    Object.keys(params).forEach((key)=>{
        query+=`&${key}=${params[key]}`;
    });
    query = query.substring(1,query.length);
    if(url.match(new RegExp("\/.*\\?"),"g")) {
        return url+"&"+query
    }else {
        return url+"?"+query
    }
}

/**
 * 拼接sso退出登录地址
 * @param ssoBackUrl
 * @param query
 * @returns {String}
 */
export function ssoLoginOutUrl(ssoBackUrl,query){
    let queryArray= []
    Object.keys(query).filter(c=>c!=='path').forEach(c=>{
        queryArray.push(`${c}=${query[c]}`)
    })
    let params = {"redirect_url":encodeURIComponent(`${window.location.origin}${window.location.pathname}#${query.path||''}${queryArray.length>0?'?='+queryArray.join('&'):''}`)};
    if(ssoBackUrl.lastIndexOf('?')>-1){
        ssoBackUrl+='&action=logout'
    }else{
        ssoBackUrl+='?action=logout'
    }
    const redirectUrl = generateRealUrl(ssoBackUrl,params);
    return redirectUrl;
}

/**
 * 重定向至SSO登录地址
 * @param {Object} project
 * @param {Object} vue
 */
export function redirectSsoLogin(project,vue){
    let _ls = new ls(project)
    let xx = _ls.get(ACCESS_TOKEN)
    if(xx){
        vue.$router.push({ path: project.redirect.index})
    }else{
        const redirectUrl = ssoLoginOutUrl(project.variable.ssoAuth,vue.$route.query)
        window.open(redirectUrl,"_self")
    }
}

/**
 * 通用退出登录
 * @param {Object} vue
 */
export function logOut(vue){
    let _ls = new ls(project)
    _ls.remove(ACCESS_TOKEN)
    _ls.remove(USER_INFO)
    if(vue.$router&&vue.$route){
        vue.$router.replace({
            path:vue.project.redirect.login||vue.prototype.$project.redirect.login,
            query:{
                path:vue.$route.path
            }
        })
    }else{
        window.location.reload()
    }
}

export function oAuthMenu2S2(data,customIcon) {
    let menusArr = []
    data.forEach((e)=>{
        let menus = {}
        let meta = {}
        let regx = /^(http:)|(https:)/mg
        meta.title = e.name
        if(customIcon){
            customIcon(meta,e.icon)
        }else{
            meta.icon = e.icon
        }
        meta.keepAlive = e.keepAlive=="1"?true: false
        if(e.children.length) {
            menus.children=oAuthMenu2S2(e.children,customIcon)
        }
        menus.meta = meta
        menus.path = e.path
        menus.id = e.id
        menus.name = getRoutesName(e.path)
        if(regx.test(e.redirect)) {
            menus.route = 2
            menus.meta.url=e.redirect
        } else {
            menus.route = 1
        }
        menusArr.push(menus)
    })
    return menusArr
}

export function isMobile (device) {
    return device === 'mobile'
}
export function isDesktop (device) {
    return device === 'desktop'
}
export function getArrayMenu(pemObj) {
    let routes =  window.s2.router.getRoutes()
    const sorKeys = Object.keys(pemObj).map(c => { return parseInt(c) }).sort((a, b) => {
        return a - b
    })
    let pemArrayRes = []
    sorKeys.forEach(c => {
        setRouteMeta(pemObj[c.toString()],routes)
        pemArrayRes = pemArrayRes.concat(pemObj[c.toString()])
    })
    return pemArrayRes
}

function setRouteMeta(pers,routes){
    pers.forEach(per=>{
        let route = routes.find(c=>c.name===per.name)
        if(route){
            per.meta = Object.assign(per.meta,route.meta)
        }
        if(per.children){
            setRouteMeta(per.children,routes)
        }
    })
}

export function formatDate(datetime,format){
    return new moment(datetime).format(format)
}
// aes_cbc_128
export function aes_encrypt_cbc_128(text) {
    let key = CryptoJS.enc.Utf8.parse('[B@65330df71%@12')
    let iv = CryptoJS.enc.Utf8.parse('1122334455667788')
    const encrypted = CryptoJS.AES.encrypt(text, key, {
        iv,
        padding: CryptoJS.pad.Pkcs7,
        mode:CryptoJS.mode.CBC
    });
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}


export function aes_decrypt_cbc_128(base64) {
    let  key = CryptoJS.enc.Utf8.parse('[B@65330df71%@12')
    let iv = CryptoJS.enc.Utf8.parse('1122334455667788')
    const decrypt = CryptoJS.AES.decrypt(base64, key, {
        iv,
        padding: CryptoJS.pad.Pkcs7,
        mode:CryptoJS.mode.CBC
    });
    return decrypt.toString(CryptoJS.enc.Utf8);
}

// aes_ecb_128
export function aes_encrypt_ecb_128(text) {
    text = CryptoJS.enc.Utf8.parse(text);
    let k = CryptoJS.enc.Utf8.parse('[B@65330df71%@12')
    const encrypted = CryptoJS.AES.encrypt(text, k, {
        padding: CryptoJS.pad.Pkcs7,
        mode:CryptoJS.mode.ECB
    });
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

export function aes_decrypt_ecb_128(base64) {
    let k = CryptoJS.enc.Utf8.parse('[B@65330df71%@12')
    const decrypt = CryptoJS.AES.decrypt(base64, k, {
        padding: CryptoJS.pad.Pkcs7,
        mode:CryptoJS.mode.ECB
    });
    return decrypt.toString(CryptoJS.enc.Utf8);
}
// aes_cbc_256
export function aes_encrypt_cbc_256(text) {
    let key = CryptoJS.enc.Base64.parse('[B@65330df71%@12')
    let iv = CryptoJS.enc.Base64.parse('1122334455667788')
    const encrypted = CryptoJS.AES.encrypt(text, key, {
        iv,
        padding: CryptoJS.pad.Pkcs7,
        mode:CryptoJS.mode.CBC
    });
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

export function aes_decrypt_cbc_256(base64) {
    let key = CryptoJS.enc.Base64.parse('[B@65330df71%@12')
    let iv = CryptoJS.enc.Base64.parse('1122334455667788')
    const decrypt = CryptoJS.AES.decrypt(base64, key, {
        iv,
        padding: CryptoJS.pad.Pkcs7,
        mode:CryptoJS.mode.CBC
    });
    return decrypt.toString(CryptoJS.enc.Utf8);
}
// aes_ecb_256
export function aes_encrypt_ecb_256(text) {
    let key = CryptoJS.enc.Base64.parse('[B@65330df71%@12');
    const encrypted = CryptoJS.AES.encrypt(text, key, {
        padding: CryptoJS.pad.Pkcs7,
        mode:CryptoJS.mode.ECB
    });
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

export function aes_decrypt_ecb_256(base64) {
    let  key = CryptoJS.enc.Base64.parse('[B@65330df71%@12')
    const decrypt = CryptoJS.AES.decrypt(base64, key, {
        padding: CryptoJS.pad.Pkcs7,
        mode:CryptoJS.mode.ECB
    });
    return decrypt.toString(CryptoJS.enc.Utf8);
}

export function ls(project){
    this.project = project
    this.get=function (key){
        return localStorage.getItem(`${this.project.namespace}__`+key)
    }

    this.set=function (key,value){
        localStorage.setItem(`${this.project.namespace}__`+key,value)
    }

    this.remove=function (key){
        localStorage.removeItem(`${this.project.namespace}__`+key)
    }
}
