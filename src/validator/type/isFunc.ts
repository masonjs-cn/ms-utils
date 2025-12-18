import { ValueType } from '../../constant/enums'
import { getValueType } from '../../func/utils/getValueType'

/**
 * @description: 判断值是否为函数类型
 * @param {any} value - 要判断的值
 * @returns {boolean} 如果是函数返回 true，否则返回 false
 * @example
 * isFunc(() => {}) // true
 * isFunc(function() {}) // true
 * isFunc('function') // false
 */
export const isFunc = (value: any) => {
  return getValueType(value) === ValueType.FUNCTION
}
