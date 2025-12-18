import { REGEXP_LETTER_NUMBER_ZH_UNDERLINE } from '../../constant/regexp'

/**
 * @description: 验证字符串是否只包含字母、数字、汉字和下划线
 * @param {string} value - 要验证的字符串
 * @returns {boolean} 如果只包含字母、数字、汉字和下划线返回 true，否则返回 false
 * @example
 * isLetterNumberZhUnderline('用户名123') // true
 * isLetterNumberZhUnderline('user_name') // true
 * isLetterNumberZhUnderline('user-name') // false
 */
export const isLetterNumberZhUnderline = (value: string) => {
  return REGEXP_LETTER_NUMBER_ZH_UNDERLINE.test(value)
}
