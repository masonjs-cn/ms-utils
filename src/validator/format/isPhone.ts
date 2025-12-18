import { REGEXP_PHONE } from '../../constant/regexp'

/**
 * @description: 验证字符串是否为有效的中国大陆手机号码
 * @param {string} value - 要验证的字符串
 * @returns {boolean} 如果是有效的手机号码返回 true，否则返回 false
 * @example
 * isPhone('13800138000') // true
 * isPhone('12345678901') // false
 */
export const isPhone = (value: string) => {
  return REGEXP_PHONE.test(value)
}
