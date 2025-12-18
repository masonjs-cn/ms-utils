/**
 * @description: 判断字符串是否为有效的 JSON 格式
 * @param {any} str - 要判断的值
 * @returns {boolean} 如果是有效的 JSON 字符串返回 true，否则返回 false
 * @example
 * isJSON('{"a": 1}') // true
 * isJSON('[1, 2, 3]') // true
 * isJSON('invalid json') // false
 * isJSON('') // false
 */
export const isJSON = (str: any) => {
  if (typeof str === 'string') {
    try {
      const obj = JSON.parse(str)
      if (typeof obj === 'object' && obj) {
        return true
      } else {
        return false
      }
    } catch (e) {
      console.error('error:' + str + '!!!' + e)
      return false
    }
  }
  return false
}
