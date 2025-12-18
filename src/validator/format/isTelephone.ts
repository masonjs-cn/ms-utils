import { REGEXP_TELEPHONE } from '../../constant/regexp'

/**
 * @description: 验证字符串是否为有效的座机号码（固定电话）
 * @param {string} value - 要验证的字符串
 * @returns {boolean} 如果是有效的座机号码返回 true，否则返回 false
 * @example
 * isTelephone('010-12345678') // true
 * isTelephone('021-87654321') // true
 * isTelephone('12345678') // false
 */
export const isTelephone = (value: string) => {
  return REGEXP_TELEPHONE.test(value)
}
