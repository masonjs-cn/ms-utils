/**
 * @description: 从字符串中提取特定子字符串之前的内容
 * @param {string} str - 原始字符串
 * @param {string} substring - 要查找的子字符串
 * @returns {string} 返回子字符串之前的部分，如不存在则返回空字符串
 * @example
 * subAfter('hello world', ' world') // 'hello'
 */
export function subAfter(str: string, substring: string): string {
  // 检查子字符串是否有效
  if (typeof substring === 'string' && substring.length > 0) {
    const index = str.indexOf(substring)
    // 如果找到子字符串，则返回其之前的部分
    if (index !== -1) {
      return str.substring(0, index)
    }
  }

  // 如果子字符串不存在或无效，返回空字符串
  return ''
}
