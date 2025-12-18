import { typeOf } from './typeOf'

/**
 * @description: 判断值是否为数组类型
 * @param {unknown} value - 要判断的值
 * @returns {boolean} 如果是数组返回 true，否则返回 false
 * @example
 * isArray([1, 2, 3]) // true
 * isArray('array') // false
 */
export const isArray = (value: unknown): value is Array<any> => value !== null && typeOf(value) === 'array'
