import * as ObjectUtils from "./ObjectUtils";

/**
 * 手机号验证，1开头，11位数字
 * @param expr
 * @return {boolean}
 */
const validateMobile = (expr) => {
    const pattern = /^1\d{10}$/;
    return pattern.test(expr);
}


/**
 * 短信动态验证码验证，6位数字
 * @param expr
 * @return {boolean}
 */
const validateSMSCaptcha = (expr) => {
    const pattern = /^\d{6}$/;
    return pattern.test(expr);
}

/**
 * 密码格式验证，最小3个字符,最大40个字符
 * @param expr
 * @return {boolean}
 */
const validatePassword = (expr) => {
    return ObjectUtils.isNonBlankString(expr) && expr.length > 3 && expr.length <= 40;
}

/**
 * 电子邮箱格式验证
 * @param expr
 * @return {boolean}
 */
const validateEmail = (expr) => {
    const pattern = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    return pattern.test(expr);
}


export default {
    validateMobile,
    validateSMSCaptcha,
    validatePassword,
    validateEmail,
}