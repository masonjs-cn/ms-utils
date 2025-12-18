/**
 * @description: 获取值的精确类型字符串（使用 Object.prototype.toString）
 * @param {any} value - 要获取类型的值
 * @returns {string} 返回类型字符串（如 '[object String]', '[object Array]' 等）
 * @example
 * getValueType('hello') // '[object String]'
 * getValueType([1, 2]) // '[object Array]'
 * getValueType({}) // '[object Object]'
 */
export const getValueType = (value: any) => {
  return Object.prototype.toString.call(value)
}
