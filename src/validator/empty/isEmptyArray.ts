import { ValueType } from '../../constant/enums'
import { getValueType } from '../../func/utils/getValueType'
import { isArray } from '../type/isArray'

/**
 * @description: 判断值是否为空数组
 * @param {Array<any>} value - 要判断的值
 * @returns {boolean} 如果是空数组返回 true，否则返回 false
 * @example
 * isEmptyArray([]) // true
 * isEmptyArray([1, 2]) // false
 * isEmptyArray('array') // false
 */
export const isEmptyArray = (value: Array<any>) => {
  if (!isArray(value)) {
    // console.error(`value 必须是一个数组`)
    return false
  }
  return getValueType(value) === ValueType.ARRAY && value.length === 0
}
