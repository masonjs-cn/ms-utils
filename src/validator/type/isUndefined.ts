import { getValueType } from '../../func/utils/getValueType'
import { ValueType } from '../../constant/enums'

/**
 * @description: 判断值是否为 undefined
 * @param {any} value - 要判断的值
 * @returns {boolean} 如果是 undefined 返回 true，否则返回 false
 * @example
 * isUndefined(undefined) // true
 * isUndefined(null) // false
 * isUndefined('') // false
 */
export const isUndefined = (value: any) => {
  return getValueType(value) === ValueType.UNDEFINED
}
