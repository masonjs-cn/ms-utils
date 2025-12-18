import { REGEXP_LETTER_NUMBER_UNDERLINE } from '../../constant/regexp'

/**
 * @description: 验证字符串是否只包含字母、数字和下划线（至少一个字符）
 * @param {string} value - 要验证的字符串
 * @returns {boolean} 如果只包含字母、数字和下划线返回 true，否则返回 false
 * @example
 * isLetterNumberUnderline('abc123') // true
 * isLetterNumberUnderline('user_name') // true
 * isLetterNumberUnderline('') // false
 */
export const isLetterNumberUnderline = (value: string) => {
  return REGEXP_LETTER_NUMBER_UNDERLINE.test(value)
}
