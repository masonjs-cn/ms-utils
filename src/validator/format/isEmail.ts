import { REGEXP_EMAIL } from '../../constant/regexp'

/**
 * @description: 验证字符串是否为有效的邮箱地址
 * @param {string} value - 要验证的字符串
 * @returns {boolean} 如果是有效的邮箱地址返回 true，否则返回 false
 * @example
 * isEmail('test@example.com') // true
 * isEmail('invalid-email') // false
 */
export const isEmail = (value: string) => {
  return REGEXP_EMAIL.test(value)
}
