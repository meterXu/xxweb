/**
 * 邮箱
 */
export function isEmail(s:string) {
    return new RegExp('^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$').test(s)
}

/**
 * 座机号码
 */
export function isMobile(s:string) {
    return new RegExp('0\\d{2,3}-\\d{7,8}(-\\d{1,6})?').test(s)
}

/**
 * 手机号码
 */
export function isPhone(s:string) {
    return new RegExp('^[1]([3-9])[0-9]{9}').test(s)
}

/**
 * URL地址
 */
export function isURL(s:string) {
    return new RegExp('^http[s]?:\\/\\/.*').test(s)
}
