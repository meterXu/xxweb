import {merge} from 'lodash-es'
/**
 * 是否是外部地址
 * @param path
 * @return {boolean}
 */
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * 判断是否为空
 * @param {String} str
 * @returns {boolean}
 */
export function isEmpty(str){
    return str===null||str===undefined||str===''||str==='undefined'||str==='null'
}

/**
 * 改变store值
 * @param {String|Null} value
 * @returns {String|Null}
 */
export function alterStoreValue(value){
    return isEmpty(value)?null:value
}

/**
 * 获取localStore值
 * @param {String} value
 * @returns {String|Object}
 */
export function getLsValue(value){
    return isEmpty(value)?'':value.indexOf('{')>-1?JSON.parse(value):value
}

/**
 * 设置localStore值
 * @param {String|Object} value
 * @returns {String}
 */
export function setLsValue(value){
    return isEmpty(value)?'':typeof(value)==='object'?JSON.stringify(value):value
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
 * 获取url中的指定名称的参数
 * @param name
 * @returns {String | null|string}
 */
export function getQueryVariable(name) {
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
            if (pair[0] === name) {
                return decodeURIComponent(pair[1])
            }
        }
    }
    return null
}

/**
 * 获取url中的所有参数
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
 * @param {String} url
 * @param {Object} params
 * @returns {String}
 */
export function generateRealUrl(url, params) {
    let query = "";
    Object.keys(params).forEach((key) => {
        query += `&${key}=${params[key]}`;
    });
    query = query.substring(1, query.length);
    if (new RegExp("\/.*\\?", "g").test(url)) {
        return url + "&" + query
    } else {
        return url + "?" + query
    }
}

/**
 * 拼接sso退出登录地址
 * @param ssoBackUrl
 * @returns {String}
 */
export function ssoLoginOutUrl(ssoBackUrl) {
    let params = {
        action: 'logout',
        redirect_url: encodeURIComponent(`${window.location.href}`)
    };
    return generateRealUrl(ssoBackUrl, params);
}

/**
 * 重定向至SSO登录地址
 * @param {String} ssoBackUrl
 */
export function redirectSsoLogin(ssoBackUrl) {
    const redirectUrl = ssoLoginOutUrl(ssoBackUrl)
    window.open(redirectUrl, "_self")
}

/**
 * 复制字符串
 * @param {String} str
 * @param {Function} success
 * @param {Function} failed
 */
export function doCopy(str, success, failed) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(str).then(() => {
                success && success()
            },
            err => {
                failed && failed(err)
            }
        )
    } else {
        try {
            const input = document.createElement('input')
            input.value = str
            document.body.appendChild(input)
            input.select()
            document.execCommand('copy')
            document.body.removeChild(input)
            success && success()
        } catch (err) {
            failed && failed(err)
        }
    }
}

/**
 * 获取设备类型
 * @return {string}
 */
export function deviceType() {
    const ua = window.navigator.userAgent.toLowerCase()
    if (/miniprogram/i.test(ua)) {
        return 'WxMini'
    }
    if (/micromessenger/i.test(ua)) {
        return 'WeChat'
    } else if (/android/i.test(ua)) {
        return 'Android'
    } else if (/iphone/i.test(ua)) {
        return 'iPhone'
    } else if (/ipad/i.test(ua)) {
        return 'iPad'
    } else if (/webos/i.test(ua)) {
        return 'webOS'
    } else if (/blackberry/i.test(ua)) {
        return 'BlackBerry'
    } else if (/iemobile/i.test(ua)) {
        return 'IEMobile'
    } else if (/opera mini/i.test(ua)) {
        return 'Opera Mini'
    } else {
        return 'Others'
    }
}

/**
 * 时间格式化
 * @param {Object} moment
 * @param {Date} datetime
 * @param {String} format
 * @return {String}
 */
export function formatDate(moment,datetime, format) {
    return new moment(datetime).format(format)
}

/**
 * 对象合并
 * @param {Object} source
 * @param {Object} target
 * @returns {Object}
 */
export function mergeObject(source,target){
    return merge({},source,target)
}

/**
 * 展开整个project配置
 * @param data
 * @returns {Object}
 */
export function expandFullProject(data){
    const project = async ()=>import("../project.js");
    return merge({},project,data)
}

/**
 * localStorage处理
 * @param {String} nameSpace
 * @return {Object}
 */
export function Ls(nameSpace) {
    this.get = function (key) {
        return localStorage.getItem(`${nameSpace}__` + key)
    }
    this.set = function (key, value) {
        localStorage.setItem(`${nameSpace}__` + key, value)
    }
    this.remove = function (key) {
        localStorage.removeItem(`${nameSpace}__` + key)
    }
}

/**
 * Cookie的处理
 * @param {String} path
 * @return {Object}
 */
export function Cookie(path = '/') {
    let supplyCookieStore = 'cookieStore' in window
    this.get = function (name) {
        if (supplyCookieStore) {
            return window.cookieStore.get(name)
        } else {
            return new Promise((resolve, reject) => {
                try{
                    const value = `; ${document.cookie}`;
                    const parts = value.split(`; ${name}=`);
                    if (parts.length === 2){
                        resolve(parts.pop().split(';').shift())
                    } else{
                        resolve(null)
                    }
                }catch (err){
                    reject(err)
                }
            })
        }
    }
    this.set = function (name, value, days) {
        if (supplyCookieStore) {
            return window.cookieStore.set({
                name: name,
                value: value,
                expires: new Date(Date.now() + days*24*3600*1000),
                path: path
            })
        } else {
            return new Promise((resolve, reject) => {
                try{
                    let expires = "";
                    if (days) {
                        const date = new Date();
                        date.setTime(date.getTime() + (days*24*3600*1000));
                        expires = "; expires=" + date.toUTCString();
                    }
                    document.cookie = name + "=" + (value || "") + expires + `; path=${path}`;
                    resolve()
                }catch (err){
                    reject(err)
                }
            })
        }
    }
    this.remove = function (name) {
        if (supplyCookieStore) {
            return window.cookieStore.delete(name)
        }else{
            return new Promise((resolve, reject) => {
                try {
                    document.cookie = name + '=; Max-Age=-99999999;';
                    resolve()
                }catch (err){
                    reject(err)
                }
            })
        }

    }
}

/**
 * 下载资源
 * @param {String} name
 * @param {String} url
 */
export function downloadFileByUrl(name,url){
    document.createElement('a')
    a.href=url
    a.download=name
    document.body.appendChild(a)
    a.click()
}

/**
 * 下载资源
 * @param {String} name
 * @param {Blob} blob
 */
export function downloadFileByBlob(name,blob){
    if (!(blob instanceof Blob)) {
        console.error('blob is not instance of Blob')
    }else{
        const url = window.URL.createObjectURL(blob)
        downloadFileByUrl(name,url)
    }
}

/**
 * 全局对象重写
 */
export function GlobalOverride(){
    Function.prototype.debounce=function (delay=500){
        const originalFunction = this;
        let timeoutId = window.debounceTimeoutId;
        return function (...args) {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            return new Promise((resolve, reject) => {
                window.debounceTimeoutId = setTimeout(async () => {
                    try{
                        let res = await originalFunction.apply(this, args);
                        resolve(res);
                    }catch (err){
                        reject(err);
                    }
                }, delay);
            })

        };
    }
}

/**
 * 等待函数
 * @param time 等待时长，默认1001x g * @returns {Promise<unknown>}
 */
export function sleep(time=100){
    return new Promise(resolve => {
        setTimeout(()=>{
            resolve(time)
        },time)
    })
}