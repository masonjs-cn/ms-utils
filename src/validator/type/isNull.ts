import { getValueType } from '../../func/utils/getValueType'
import { ValueType } from '../../constant/enums'

/**
 * @description: 判断值是否为 null
 * @param {any} value - 要判断的值
 * @returns {boolean} 如果是 null 返回 true，否则返回 false
 * @example
 * isNull(null) // true
 * isNull(undefined) // false
 * isNull(0) // false
 */
export const isNull = (value: any) => {
  return getValueType(value) === ValueType.NULL
}
