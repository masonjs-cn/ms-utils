import { ValueType } from '../../constant/enums'
import { getValueType } from '../../func/utils/getValueType'

/**
 * @description: 判断值是否为数字类型
 * @param {any} value - 要判断的值
 * @returns {boolean} 如果是数字返回 true，否则返回 false
 * @example
 * isNumber(123) // true
 * isNumber('123') // false
 * isNumber(NaN) // false
 */
export const isNumber = (value: any) => {
  return getValueType(value) === ValueType.NUMBER
}
