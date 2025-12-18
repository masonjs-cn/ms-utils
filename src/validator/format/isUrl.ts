import { REGEXP_URL } from '../../constant/regexp'

/**
 * @description: 验证字符串是否为有效的 URL 地址
 * @param {string} value - 要验证的字符串
 * @returns {boolean} 如果是有效的 URL 返回 true，否则返回 false
 * @example
 * isUrl('https://www.example.com') // true
 * isUrl('invalid-url') // false
 */
export const isUrl = (value: string) => {
  return REGEXP_URL.test(value)
}
