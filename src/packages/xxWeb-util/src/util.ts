import {merge} from 'lodash-es'
import dayjs from 'dayjs'
import project from './project.js'
/**
 * 是否是外部地址
 */
export function isExternal(path:string) {
    return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * 判断是否为空
 */
export function isEmpty(str:string|null|undefined){
    return str===null||str===undefined||str===''||str==='undefined'||str==='null'
}

/**
 * 改变store值
 */
export function alterStoreValue(value:string|null){
    return isEmpty(value)?null:value
}

/**
 * 获取localStore值
 */
export function getLsValue(value:string|null|undefined){
    return isEmpty(value)?'':value.indexOf('{')>-1?JSON.parse(value):value
}

/**
 * 设置localStore值
 */
export function setLsValue(value:string){
    return isEmpty(value)?'':typeof(value)==='object'?JSON.stringify(value):value
}

/**
 * 深度克隆对象、数组
 */
export function cloneObject(obj:object) {
    return JSON.parse(JSON.stringify(obj))
}

/**
 * 随机生成数字
 */
export function randomNumber(length?: number): number;
export function randomNumber(min: number, max: number): number;
export function randomNumber(...args: any[]) {
    // 生成 最小值 到 最大值 区间的随机数
    const random = (min:number, max:number) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    if (arguments.length === 1) {
        let [length] = args
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
 */
export function randomString(length:number = 1, chats:string = '0123456789qwertyuioplkjhgfdsazxcvbnm') {
    let str = ''
    for (let i = 0; i < length; i++) {
        let num = randomNumber(0, chats.length - 1)
        str += chats[num]
    }
    return str
}

/**
 * 随机生成uuid
 */
export function randomUUID() {
    let chats = '0123456789abcdef'
    return randomString(32, chats)
}

/**
 * 获取url中的指定名称的参数
 */
export function getQueryVariable(name:string|null) {
    let query
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
 */
export function getQuery():{[key:string]:any} {
    let query
    let res = {} as {[key:string]:any}
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
 */
export function generateRealUrl(url:string, params:{[key:string]:any}) {
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
 */
export function ssoLoginOutUrl(ssoBackUrl:string) {
    let params = {
        action: 'logout',
        redirect_url: encodeURIComponent(`${window.location.href}`)
    };
    return generateRealUrl(ssoBackUrl, params);
}

/**
 * 重定向至SSO登录地址
 */
export function redirectSsoLogin(ssoBackUrl:string) {
    const redirectUrl = ssoLoginOutUrl(ssoBackUrl)
    window.open(redirectUrl, "_self")
}

/**
 * 复制字符串
 */
export function doCopy(str:string, success:Function, failed:Function) {
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
 */
export function formatDate(date:Date, format:string) {
    const _date = dayjs(date);
    return _date.format(format||'YYYY-MM-DD HH:mm:ss');
}

/**
 * 对象合并
 */
export function mergeObject(source:object,target:object){
    return merge({},source,target)
}

/**
 * 展开整个project配置
 */
export function expandFullProject(data:object){
    return merge({},project,data)
}

/**
 * localStorage处理
 */
export class Ls {
    private readonly nameSpace: string;
    constructor(nameSpace: string) {
        this.nameSpace = nameSpace;
    }
    get(key:string):string|null {
        return localStorage.getItem(`${this.nameSpace}__` + key)
    }
    set(key:string, value:string):void {
        localStorage.setItem(`${this.nameSpace}__` + key, value)
    }
    remove(key:string):void {
        localStorage.removeItem(`${this.nameSpace}__` + key)
    }
}

/**
 * sessionStorage处理
 */
export class Ss {
    private readonly nameSpace: string;
    constructor(nameSpace: string) {
        this.nameSpace = nameSpace;
    }
    get(key:string):string|null {
        return sessionStorage.getItem(`${this.nameSpace}__` + key)
    }
    set(key:string, value:string) {
        sessionStorage.setItem(`${this.nameSpace}__` + key, value)
    }
    remove(key:string) {
        sessionStorage.removeItem(`${this.nameSpace}__` + key)
    }
}

/**
 * Cookie的处理
 */
export class Cookie {
    private readonly path:string;
    constructor(path:string='/'){
        this.path = path
    }
    private  readonly supplyCookieStore = 'cookieStore' in window
    get(name:string) {
        if (this.supplyCookieStore) {
            return window.cookieStore.get(name)
        } else {
            return new Promise((resolve, reject) => {
                try{
                    const value = `; ${document.cookie}`;
                    const parts = value.split(`; ${name}=`);
                    if (parts.length === 2){
                        resolve(parts.pop()?.split(';').shift())
                    } else{
                        resolve(null)
                    }
                }catch (err){
                    reject(err)
                }
            })
        }
    }
    set(name:string, value:string, days:number) {
        if (this.supplyCookieStore) {
            return window.cookieStore.set({
                name: name,
                value: value,
                expires: new Date(Date.now() + days*24*3600*1000),
                path: this.path
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
                    document.cookie = name + "=" + (value || "") + expires + `; path=${this.path}`;
                    resolve(null)
                }catch (err){
                    reject(err)
                }
            })
        }
    }
    remove(name:string) {
        if (this.supplyCookieStore) {
            return window.cookieStore.delete(name)
        }else{
            return new Promise((resolve, reject) => {
                try {
                    document.cookie = name + '=; Max-Age=-99999999;';
                    resolve(null)
                }catch (err){
                    reject(err)
                }
            })
        }

    }
}

/**
 * 下载资源
 */
export function downloadFileByUrl(name:string,url:string){
    const a  = document.createElement('a')
    a.href=url
    a.download=name
    document.body.appendChild(a)
    a.click()
}

/**
 * 下载资源
 */
export function downloadFileByBlob(name:string,blob:Blob){
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
export function GlobalOverride(type:string[]=['debounce']){
    if(type.includes('debounce')){
        //@ts-ignore
        Function.prototype.debounce=function (delay=500){
            const originalFunction = this;
            let timeoutId = window.debounceTimeoutId;
            //@ts-ignore
            return function (...args) {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                return new Promise((resolve, reject) => {
                    window.debounceTimeoutId = setTimeout(async () => {
                        try{
                            //@ts-ignore
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
}

/**
 * 等待函数
 */
export function sleep(time=100){
    return new Promise(resolve => {
        setTimeout(()=>{
            resolve(time)
        },time)
    })
}