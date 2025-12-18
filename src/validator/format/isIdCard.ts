import { REGEXP_ID_CARD } from '../../constant/regexp'

/**
 * @description: 验证字符串是否为有效的中国大陆身份证号码
 * @param {string} value - 要验证的字符串
 * @returns {boolean} 如果是有效的身份证号码返回 true，否则返回 false
 * @example
 * isIdCard('110101199003077777') // true
 * isIdCard('123456789012345678') // false
 */
export const isIdCard = (value: string) => {
  return REGEXP_ID_CARD.test(value)
}
