/**
 * @description: 从字符串中提取特定子字符串后面的内容
 * @param {string} str - 原始字符串
 * @param {string} substring - 要查找的子字符串
 * @returns {string} 返回子字符串后面的部分，如不存在则返回空字符串
 * @example
 * subBefore('hello world', 'hello ') // 'world'
 */
export function subBefore(str: string, substring: string): string {
  // 判断子字符串是否有效
  if (typeof substring === 'string' && substring.length > 0) {
    const index = str.lastIndexOf(substring)
    // 如果找到子字符串，则返回其之后的部分
    if (index !== -1) {
      return str.substring(index + substring.length)
    }
  }

  // 如果子字符串不存在或无效，返回空字符串
  return ''
}
