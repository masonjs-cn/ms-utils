import { REGEXP_LETTER_NUMBER } from '../../constant/regexp'

/**
 * @description: 验证字符串是否只包含字母、数字和下划线
 * @param {string} value - 要验证的字符串
 * @returns {boolean} 如果只包含字母、数字和下划线返回 true，否则返回 false
 * @example
 * isLetterNumber('abc123') // true
 * isLetterNumber('abc_123') // true
 * isLetterNumber('abc-123') // false
 */
export const isLetterNumber = (value: string) => {
  return REGEXP_LETTER_NUMBER.test(value)
}
