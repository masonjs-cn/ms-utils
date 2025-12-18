import { isObject } from '../type/isObject'

/**
 * @description: 判断值是否为空对象（没有任何属性的对象）
 * @param {any} value - 要判断的值
 * @returns {boolean} 如果是空对象返回 true，否则返回 false
 * @example
 * isEmptyObject({}) // true
 * isEmptyObject({ a: 1 }) // false
 * isEmptyObject([]) // false
 */
export const isEmptyObject = (value: any) => {
  if (!isObject(value)) {
    // console.error('value 必须是一个对象')
    return false
  }
  const temp = 0
  return Object.keys(value).length === temp
}
