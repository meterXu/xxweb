/**
 * 邮箱
 * @param {*} s
 */
export function isEmail(s) {
    return new RegExp('^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$').test(s)
}

/**
 * 座机号码
 * @param {*} s
 */
export function isMobile(s) {
    return new RegExp('0\\d{2,3}-\\d{7,8}(-\\d{1,6})?').test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export function isPhone(s) {
    return new RegExp('^[1]([3-9])[0-9]{9}').test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL(s) {
    return new RegExp('^http[s]?:\\/\\/.*').test(s)
}
