/**
 * @description: 判断值是否为对象类型（不包括数组、null等）
 * @param {any} value - 要判断的值
 * @returns {boolean} 如果是纯对象返回 true，否则返回 false
 * @example
 * isObject({ a: 1 }) // true
 * isObject([1, 2]) // false
 * isObject(null) // false
 */
export const isObject = (value: any) => {
  return Object.prototype.toString.call(value) === '[object Object]'
}
