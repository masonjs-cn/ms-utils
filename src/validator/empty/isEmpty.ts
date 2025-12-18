import { isNaN } from '../type/isNaN'
import { isUndefined } from '../type/isUndefined'
import { isNull } from '../type/isNull'
import { isEmptyString } from './isEmptyString'
import { isEmptyArray } from './isEmptyArray'
import { isEmptyObject } from './isEmptyObject'

/**
 * @description: 判断值是否为空（包括空字符串、空数组、空对象、null、undefined、NaN）
 * @param {any} value - 要判断的值
 * @returns {boolean} 如果为空返回 true，否则返回 false
 * @example
 * isEmpty('') // true
 * isEmpty([]) // true
 * isEmpty({}) // true
 * isEmpty(null) // true
 * isEmpty(undefined) // true
 * isEmpty('hello') // false
 */
export const isEmpty = (value: any): boolean => {
  return (
    isNaN(value) ||
    isUndefined(value) ||
    isNull(value) ||
    isEmptyString(value) ||
    isEmptyArray(value) ||
    isEmptyObject(value)
  )
}
