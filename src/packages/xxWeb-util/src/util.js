"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cookie = exports.Ss = exports.Ls = void 0;
exports.isExternal = isExternal;
exports.isEmpty = isEmpty;
exports.alterStoreValue = alterStoreValue;
exports.getLsValue = getLsValue;
exports.setLsValue = setLsValue;
exports.cloneObject = cloneObject;
exports.randomNumber = randomNumber;
exports.randomString = randomString;
exports.randomUUID = randomUUID;
exports.getQueryVariable = getQueryVariable;
exports.getQuery = getQuery;
exports.generateRealUrl = generateRealUrl;
exports.ssoLoginOutUrl = ssoLoginOutUrl;
exports.redirectSsoLogin = redirectSsoLogin;
exports.doCopy = doCopy;
exports.deviceType = deviceType;
exports.formatDate = formatDate;
exports.mergeObject = mergeObject;
exports.expandFullProject = expandFullProject;
exports.downloadFileByUrl = downloadFileByUrl;
exports.downloadFileByBlob = downloadFileByBlob;
exports.GlobalOverride = GlobalOverride;
exports.sleep = sleep;
var lodash_es_1 = require("lodash-es");
var dayjs_1 = require("dayjs");
var project_js_1 = require("./project.js");
/**
 * 是否是外部地址
 */
function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path);
}
/**
 * 判断是否为空
 */
function isEmpty(str) {
    return str === null || str === undefined || str === '' || str === 'undefined' || str === 'null';
}
/**
 * 改变store值
 */
function alterStoreValue(value) {
    return isEmpty(value) ? null : value;
}
/**
 * 获取localStore值
 */
function getLsValue(value) {
    return isEmpty(value) ? '' : value.indexOf('{') > -1 ? JSON.parse(value) : value;
}
/**
 * 设置localStore值
 */
function setLsValue(value) {
    return isEmpty(value) ? '' : typeof (value) === 'object' ? JSON.stringify(value) : value;
}
/**
 * 深度克隆对象、数组
 */
function cloneObject(obj) {
    return JSON.parse(JSON.stringify(obj));
}
function randomNumber() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    // 生成 最小值 到 最大值 区间的随机数
    var random = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    if (arguments.length === 1) {
        var length_1 = args[0];
        // 生成指定长度的随机数字，首位一定不是 0
        var nums = __spreadArray([], Array(length_1).keys(), true).map(function (i) { return (i > 0 ? random(0, 9) : random(1, 9)); });
        return parseInt(nums.join(''));
    }
    else if (arguments.length >= 2) {
        var min = arguments[0], max = arguments[1];
        return random(min, max);
    }
    else {
        return Number.NaN;
    }
}
/**
 * 随机生成字符串
 */
function randomString(length, chats) {
    if (length === void 0) { length = 1; }
    if (chats === void 0) { chats = '0123456789qwertyuioplkjhgfdsazxcvbnm'; }
    var str = '';
    for (var i = 0; i < length; i++) {
        var num = randomNumber(0, chats.length - 1);
        str += chats[num];
    }
    return str;
}
/**
 * 随机生成uuid
 */
function randomUUID() {
    var chats = '0123456789abcdef';
    return randomString(32, chats);
}
/**
 * 获取url中的指定名称的参数
 */
function getQueryVariable(name) {
    var query;
    if (window.location.search) {
        query = window.location.search.substring(1);
    }
    else {
        var urlSection = window.location.href.split('?');
        query = urlSection.length >= 2 ? urlSection[1] : null;
    }
    if (query) {
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            if (pair[0] === name) {
                return decodeURIComponent(pair[1]);
            }
        }
    }
    return null;
}
/**
 * 获取url中的所有参数
 */
function getQuery() {
    var query;
    var res = {};
    if (window.location.search) {
        query = window.location.search.substring(1);
    }
    else {
        var urlSection = window.location.href.split('?');
        query = urlSection.length >= 2 ? urlSection[1] : null;
    }
    if (query) {
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            res[pair[0]] = decodeURIComponent(pair[1]);
        }
    }
    return res;
}
/**
 * 拼接url及参数
 */
function generateRealUrl(url, params) {
    var query = "";
    Object.keys(params).forEach(function (key) {
        query += "&".concat(key, "=").concat(params[key]);
    });
    query = query.substring(1, query.length);
    if (new RegExp("\/.*\\?", "g").test(url)) {
        return url + "&" + query;
    }
    else {
        return url + "?" + query;
    }
}
/**
 * 拼接sso退出登录地址
 */
function ssoLoginOutUrl(ssoBackUrl) {
    var params = {
        action: 'logout',
        redirect_url: encodeURIComponent("".concat(window.location.href))
    };
    return generateRealUrl(ssoBackUrl, params);
}
/**
 * 重定向至SSO登录地址
 */
function redirectSsoLogin(ssoBackUrl) {
    var redirectUrl = ssoLoginOutUrl(ssoBackUrl);
    window.open(redirectUrl, "_self");
}
/**
 * 复制字符串
 */
function doCopy(str, success, failed) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(str).then(function () {
            success && success();
        }, function (err) {
            failed && failed(err);
        });
    }
    else {
        try {
            var input = document.createElement('input');
            input.value = str;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
            success && success();
        }
        catch (err) {
            failed && failed(err);
        }
    }
}
/**
 * 获取设备类型
 */
function deviceType() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (/miniprogram/i.test(ua)) {
        return 'WxMini';
    }
    if (/micromessenger/i.test(ua)) {
        return 'WeChat';
    }
    else if (/android/i.test(ua)) {
        return 'Android';
    }
    else if (/iphone/i.test(ua)) {
        return 'iPhone';
    }
    else if (/ipad/i.test(ua)) {
        return 'iPad';
    }
    else if (/webos/i.test(ua)) {
        return 'webOS';
    }
    else if (/blackberry/i.test(ua)) {
        return 'BlackBerry';
    }
    else if (/iemobile/i.test(ua)) {
        return 'IEMobile';
    }
    else if (/opera mini/i.test(ua)) {
        return 'Opera Mini';
    }
    else {
        return 'Others';
    }
}
/**
 * 时间格式化
 */
function formatDate(date, format) {
    var _date = (0, dayjs_1.default)(date);
    return _date.format(format || 'YYYY-MM-DD HH:mm:ss');
}
/**
 * 对象合并
 */
function mergeObject(source, target) {
    return (0, lodash_es_1.merge)({}, source, target);
}
/**
 * 展开整个project配置
 */
function expandFullProject(data) {
    return (0, lodash_es_1.merge)({}, project_js_1.default, data);
}
/**
 * localStorage处理
 */
var Ls = /** @class */ (function () {
    function Ls(nameSpace) {
        this.nameSpace = nameSpace;
    }
    Ls.prototype.get = function (key) {
        return localStorage.getItem("".concat(this.nameSpace, "__") + key);
    };
    Ls.prototype.set = function (key, value) {
        localStorage.setItem("".concat(this.nameSpace, "__") + key, value);
    };
    Ls.prototype.remove = function (key) {
        localStorage.removeItem("".concat(this.nameSpace, "__") + key);
    };
    return Ls;
}());
exports.Ls = Ls;
/**
 * sessionStorage处理
 */
var Ss = /** @class */ (function () {
    function Ss(nameSpace) {
        this.nameSpace = nameSpace;
    }
    Ss.prototype.get = function (key) {
        return sessionStorage.getItem("".concat(this.nameSpace, "__") + key);
    };
    Ss.prototype.set = function (key, value) {
        sessionStorage.setItem("".concat(this.nameSpace, "__") + key, value);
    };
    Ss.prototype.remove = function (key) {
        sessionStorage.removeItem("".concat(this.nameSpace, "__") + key);
    };
    return Ss;
}());
exports.Ss = Ss;
/**
 * Cookie的处理
 */
var Cookie = /** @class */ (function () {
    function Cookie(path) {
        if (path === void 0) { path = '/'; }
        this.supplyCookieStore = 'cookieStore' in window;
        this.path = path;
    }
    Cookie.prototype.get = function (name) {
        if (this.supplyCookieStore) {
            return window.cookieStore.get(name);
        }
        else {
            return new Promise(function (resolve, reject) {
                var _a;
                try {
                    var value = "; ".concat(document.cookie);
                    var parts = value.split("; ".concat(name, "="));
                    if (parts.length === 2) {
                        resolve((_a = parts.pop()) === null || _a === void 0 ? void 0 : _a.split(';').shift());
                    }
                    else {
                        resolve(null);
                    }
                }
                catch (err) {
                    reject(err);
                }
            });
        }
    };
    Cookie.prototype.set = function (name, value, days) {
        var _this = this;
        if (this.supplyCookieStore) {
            return window.cookieStore.set({
                name: name,
                value: value,
                expires: new Date(Date.now() + days * 24 * 3600 * 1000),
                path: this.path
            });
        }
        else {
            return new Promise(function (resolve, reject) {
                try {
                    var expires = "";
                    if (days) {
                        var date = new Date();
                        date.setTime(date.getTime() + (days * 24 * 3600 * 1000));
                        expires = "; expires=" + date.toUTCString();
                    }
                    document.cookie = name + "=" + (value || "") + expires + "; path=".concat(_this.path);
                    resolve(null);
                }
                catch (err) {
                    reject(err);
                }
            });
        }
    };
    Cookie.prototype.remove = function (name) {
        if (this.supplyCookieStore) {
            return window.cookieStore.delete(name);
        }
        else {
            return new Promise(function (resolve, reject) {
                try {
                    document.cookie = name + '=; Max-Age=-99999999;';
                    resolve(null);
                }
                catch (err) {
                    reject(err);
                }
            });
        }
    };
    return Cookie;
}());
exports.Cookie = Cookie;
/**
 * 下载资源
 */
function downloadFileByUrl(name, url) {
    var a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
}
/**
 * 下载资源
 */
function downloadFileByBlob(name, blob) {
    if (!(blob instanceof Blob)) {
        console.error('blob is not instance of Blob');
    }
    else {
        var url = window.URL.createObjectURL(blob);
        downloadFileByUrl(name, url);
    }
}
/**
 * 全局对象重写
 */
function GlobalOverride(type) {
    if (type === void 0) { type = ['debounce']; }
    if (type.includes('debounce')) {
        //@ts-ignore
        Function.prototype.debounce = function (delay) {
            if (delay === void 0) { delay = 500; }
            var originalFunction = this;
            var timeoutId = window.debounceTimeoutId;
            //@ts-ignore
            return function () {
                var _this = this;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                return new Promise(function (resolve, reject) {
                    window.debounceTimeoutId = setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                        var res, err_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, originalFunction.apply(this, args)];
                                case 1:
                                    res = _a.sent();
                                    resolve(res);
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_1 = _a.sent();
                                    reject(err_1);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); }, delay);
                });
            };
        };
    }
}
/**
 * 等待函数
 */
function sleep(time) {
    if (time === void 0) { time = 100; }
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(time);
        }, time);
    });
}
