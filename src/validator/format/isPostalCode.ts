import { REGEXP_POSTAL_CODE } from '../../constant/regexp'

/**
 * @description: 验证字符串是否为有效的中国大陆邮政编码
 * @param {string} value - 要验证的字符串
 * @returns {boolean} 如果是有效的邮政编码返回 true，否则返回 false
 * @example
 * isPostalCode('100000') // true
 * isPostalCode('12345') // false
 */
export const isPostalCode = (value: string) => {
  return REGEXP_POSTAL_CODE.test(value)
}
