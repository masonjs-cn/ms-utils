import { getValueType } from '../../func/utils/getValueType'
import { ValueType } from '../../constant/enums'

/**
 * @description: 判断值是否为空字符串
 * @param {any} value - 要判断的值
 * @returns {boolean} 如果是空字符串返回 true，否则返回 false
 * @example
 * isEmptyString('') // true
 * isEmptyString('hello') // false
 * isEmptyString(123) // false
 */
export const isEmptyString = (value: any) => {
  const temp = 0
  return getValueType(value) === ValueType.STRING && value.length === temp
}
