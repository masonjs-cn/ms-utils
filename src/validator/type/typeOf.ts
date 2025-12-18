/**
 * @description: 获取值的精确类型字符串
 * @param {any} data - 要获取类型的值
 * @returns {string} 返回类型字符串（如 'string', 'number', 'array', 'object' 等）
 * @example
 * typeOf('hello') // 'string'
 * typeOf([1, 2]) // 'array'
 * typeOf({}) // 'object'
 */
export const typeOf = (data: any) =>
  Object.prototype.toString
    .call(data)
    .replace(/\[\w+\s(\w+)\]/, '$1')
    .toLocaleLowerCase()
