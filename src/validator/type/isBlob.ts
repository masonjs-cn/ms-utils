import { getValueType } from '../../func/utils/getValueType'
import { ValueType } from '../../constant/enums'

/**
 * @description: 判断值是否为 Blob 对象
 * @param {any} value - 要判断的值
 * @returns {boolean} 如果是 Blob 对象返回 true，否则返回 false
 * @example
 * isBlob(new Blob()) // true
 * isBlob('blob') // false
 */
export const isBlob = (value: any) => {
  return getValueType(value) === ValueType.BLOB
}
