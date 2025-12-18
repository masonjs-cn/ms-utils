import { REGEXP_COLOR } from '../../constant/regexp'

/**
 * @description: 验证字符串是否为有效的颜色值（16进制、rgb 或 rgba）
 * @param {string} value - 要验证的字符串
 * @returns {boolean} 如果是有效的颜色值返回 true，否则返回 false
 * @example
 * isColor('#ffffff') // true
 * isColor('rgb(255, 255, 255)') // true
 * isColor('rgba(255, 255, 255, 0.5)') // true
 * isColor('invalid') // false
 */
export const isColor = (value: string) => {
  return REGEXP_COLOR.test(value)
}
