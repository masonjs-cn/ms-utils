import { typeOf } from './typeOf'

/**
 * @description: 判断值是否为字符串类型
 * @param {unknown} value - 要判断的值
 * @returns {boolean} 如果是字符串返回 true，否则返回 false
 * @example
 * isString('hello') // true
 * isString(123) // false
 */
export const isString = (value: unknown): value is string => typeOf(value) === 'string'
