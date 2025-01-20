import {ACCESS_TOKEN,USER_INFO} from './mutation-types.js'
import CryptoJS from 'crypto-js'
import moment from 'moment'

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
            && (obj[key] == null || obj[key] === undefined || obj[key] === '')) {
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
 * 获取url中的参数
 * @param variable
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
 * 获取url中的参数
 * @returns {String | null|string}
 */
export function getQuery() {
    let query = ''
    let res = {}
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
            res[pair[0]] = decodeURIComponent(pair[1])
        }
    }
    return res
}

/**
 * 拼接url及参数
 * @param url
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
export function ssoLoginOutUrl(ssoBackUrl){
    let params = {
        action:'logout',
        redirect_url:encodeURIComponent(`${window.location.href}`)
    };
    return generateRealUrl(ssoBackUrl,params);
}

/**
 * 重定向至SSO登录地址
 * @param {String} ssoBackUrl
 */
export function redirectSsoLogin(ssoBackUrl){
    const redirectUrl = ssoLoginOutUrl(ssoBackUrl)
    window.open(redirectUrl,"_self")
}

/**
 * 通用退出登录
 * @param {function} callback
 */
export function logOut(callback){
    let _ls = new ls(project)
    _ls.remove(ACCESS_TOKEN)
    _ls.remove(USER_INFO)
    callback&&callback()
}

export function isMobile (device) {
    return device === 'mobile'
}
export function isDesktop (device) {
    return device === 'desktop'
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
