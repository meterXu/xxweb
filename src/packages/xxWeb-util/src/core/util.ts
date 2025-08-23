import {merge, parseInt} from 'lodash-es'
import dayjs from 'dayjs'
import {project,type Project} from './project.js'

/**
 * 是否是外部地址
 * @param path 被判断的数值
 */
export function isExternal(path:string) {
    return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * 判断是否为空
 * null|undefined|''|'null'都是null
 * @param str 被判断的数值
 */
export function isEmpty(str?:any):boolean{
    return str===null||str===undefined||str===''||str==='undefined'||str==='null'
}

/**
 * 改变store值
 * 空或者空字符串会转换成null，其他不变
 * @param value 任何数值
 */
export function alterStoreValue(value?:any){
    return isEmpty(value)?null:value
}

/**
 * 获取localStore值
 * @param value 字符串或序列化后的对象
 * @returns 字符串或者对象
 */
export function getLsValue(value?:string|null){
    //@ts-ignore
    return isEmpty(value)?'':value.indexOf('{')>-1?JSON.parse(value):value
}

/**
 * 设置localStore值
 * @param value 可以是字符串也可以是对象，对象会进行序列号
 */
export function setLsValue(value?:string|object){
    return isEmpty(value)?'':typeof(value)==='object'?JSON.stringify(value):value
}

/**
 * 深度克隆对象、数组
 * @param obj 被克隆的对象
 */
export function cloneObject(obj:object) {
    return JSON.parse(JSON.stringify(obj))
}

/**
 * 随机生成数字
 * 示例：生成长度为 12 的随机数：randomNumber(12)
 * 示例：生成 3~23 之间的随机数：randomNumber(3, 23)
 * @param1 最小值 | 长度
 * @param2 最大值
 * @return int 生成后的数字
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
 * @param length 字符串的长度
 * @param chats 可选字符串区间（只会生成传入的字符串中的字符）
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
 * 获取当前url query中的指定名称的值
 * @param name 参数名
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
 * 获取当前url中的query参数
 * @returns query对象
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
 * @param url url地址
 * @param params 转化成query参数的对象
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
 * @param ssoUrl sso地址
 */
export function ssoLoginOutUrl(ssoUrl:string) {
    let params = {
        action: 'logout',
        redirect_url: encodeURIComponent(`${window.location.href}`)
    };
    return generateRealUrl(ssoUrl, params);
}

/**
 * 重定向至SSO登录地址
 * @param ssoUrl sso地址
 */
export function redirectSsoLogin(ssoUrl:string) {
    const redirectUrl = ssoLoginOutUrl(ssoUrl)
    window.open(redirectUrl, "_self")
}

/**
 * 复制字符串
 * @param str 需要复制的字符串
 */
export function doCopy(str:string) {
    return new Promise((resolve, reject) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(str).then(() => {
                    resolve(str)
                },
                err => {
                    reject(err)
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
                resolve(str)
            } catch (err) {
                reject(err)
            }
        }
    })
}

/**
 * 获取设备类型
 * @returns WeChat,Android,iPhone,iPad,webOS,BlackBerry,IEMobile,Opera Mini,Others
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
 * @param date 日期对象
 * @param format 格式化字符串，默认：YYYY-MM-DD HH:mm:ss
 */
export function formatDate(date:Date, format:string='YYYY-MM-DD HH:mm:ss') {
    const _date = dayjs(date);
    return _date.format(format);
}

/**
 * 对象合并
 * @param source 源对象
 * @param target 目标对象
 */
export function mergeObject(source:object,target:object){
    return merge({},source,target)
}

/**
 * 展开整个project配置
 * @param data project对象
 */
export function expandFullProject(data:object):Project{
    return merge({},project,data)
}

/**
 * localStorage处理
 */
export class Ls {
    private readonly nameSpace: string;

    /**
     * localStorage处理构造函数
     * @param nameSpace 命名空间
     */
    constructor(nameSpace: string) {
        this.nameSpace = nameSpace;
    }

    /**
     * 获取相应localStorage的值
     * @param key 键
     */
    get(key:string):string|null {
        return localStorage.getItem(`${this.nameSpace}__` + key)
    }

    /**
     * 设置相应localStorage处理的值
     * @param key 键
     * @param value 值
     */
    set(key:string, value:string):void {
        localStorage.setItem(`${this.nameSpace}__` + key, value)
    }

    /**
     * 删除相应localStorage
     * @param key 键
     */
    remove(key:string):void {
        localStorage.removeItem(`${this.nameSpace}__` + key)
    }
}

/**
 * sessionStorage处理
 */
export class Ss {
    private readonly nameSpace: string;

    /**
     * sessionStorage处理构造函数
     * @param nameSpace 命名空间
     */
    constructor(nameSpace: string) {
        this.nameSpace = nameSpace;
    }

    /**
     * 获取相应sessionStorage的值
     * @param key 键
     */
    get(key:string):string|null {
        return sessionStorage.getItem(`${this.nameSpace}__` + key)
    }

    /**
     * 设置相应sessionStorage的值
     * @param key 键
     * @param value 值
     */
    set(key:string, value:string) {
        sessionStorage.setItem(`${this.nameSpace}__` + key, value)
    }

    /**
     * 删除相应的sessionStorage
     * @param key 键
     */
    remove(key:string) {
        sessionStorage.removeItem(`${this.nameSpace}__` + key)
    }
}

/**
 * Cookie的处理
 */
export class Cookie {
    private readonly path:string;

    /**
     * cookie处理构造函数
     * @param path 默认作用路径
     */
    constructor(path:string='/'){
        this.path = path
    }
    private  readonly supplyCookieStore = 'cookieStore' in window

    /**
     * 获取对应cookie的值
     * @param name cookie名称
     */
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

    /**
     * 设置相应cookie的值
     * @param name 名称
     * @param value 值
     * @param days 过期天数
     */
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

    /**
     * 删除相应cookie
     * @param name 名称
     */
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
 * @param name 文件名
 * @param url 下载路径
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
 * @param name 文件名
 * @param blob 二进制数据对象
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
 * @param {Array} type
 */
export function GlobalOverride(type:string[]=['debounce']){
    if(type.includes('debounce')){
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
 * @param time 等待时间（毫秒）
 */
export function sleep(time=100){
    return new Promise(resolve => {
        setTimeout(()=>{
            resolve(time)
        },time)
    })
}


/**
 * 页面尺寸变化改变文档根字体大小
 * @param designWidth 设计稿尺寸
 * @param documentFontSize 根字体大小
 * @param delay 执行延迟（毫秒）
 * @param limitWidthHook 宽度限制钩子
 */
export function resizeFontSize(designWidth:number,documentFontSize:number=16,delay:number=100,limitWidthHook?:(width:number)=>number):Promise<number> {
    return new Promise((resolve,reject) => {
        try {
            const baseFontSize = Math.round(designWidth*10000/documentFontSize)/10000
            window.pageSizeTimer&&clearTimeout(window.pageSizeTimer);
            window.pageSizeTimer = setTimeout(() => {
                let width = document.body.clientWidth;
                width=limitWidthHook?limitWidthHook(width):width;
                const widthNum = width / baseFontSize;
                document.documentElement.style.fontSize = widthNum + 'px';
                resolve(widthNum);
            }, delay);
        }catch(err){
            reject(err);
        }
    })
}
