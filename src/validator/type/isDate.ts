import { typeOf } from './typeOf'

/**
 * @description: 判断值是否为日期对象
 * @param {unknown} value - 要判断的值
 * @returns {boolean} 如果是日期对象返回 true，否则返回 false
 * @example
 * isDate(new Date()) // true
 * isDate('2024-01-01') // false
 */
export const isDate = (value: unknown): value is Date => typeOf(value) === 'date'
