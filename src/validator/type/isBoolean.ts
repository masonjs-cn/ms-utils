import { typeOf } from './typeOf'

/**
 * @description: 判断值是否为布尔类型
 * @param {unknown} value - 要判断的值
 * @returns {boolean} 如果是布尔值返回 true，否则返回 false
 * @example
 * isBoolean(true) // true
 * isBoolean(false) // true
 * isBoolean(0) // false
 */
export const isBoolean = (value: unknown): value is boolean => typeOf(value) === 'boolean'
