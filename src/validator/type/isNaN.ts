/**
 * @description: 判断值是否为 NaN（Not a Number）
 * @param {any} value - 要判断的值
 * @returns {boolean} 如果是 NaN 返回 true，否则返回 false
 * @example
 * isNaN(NaN) // true
 * isNaN(Number('abc')) // true
 * isNaN(123) // false
 */
export const isNaN = (value: any) => {
  return Number.isNaN(value)
}
