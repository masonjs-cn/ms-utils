/**
 * @description: 验证给定的 URL 字符串是否有效
 * @param {string} url - 要验证的 URL
 * @returns {boolean} 如果 URL 有效返回 true，否则返回 false
 * @example
 * isValidURL('https://www.example.com') // true
 * isValidURL('invalid-url') // false
 */
function isValidURL(url: string): boolean {
  const pattern =
    /^((https|http|ftp|rtsp|mms):\/\/)(([0-9]{1,3}\.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6})(:[0-9]{1,5})?((\/?)|([/0-9a-z_!~*'().;?:@&=+$,%#-]+)+\/?)$/i

  return pattern.test(url)
}

/**
 * @description: 从给定的 URL 中提取查询参数并返回一个 Map 对象
 * @param {string} url - 包含查询字符串的 URL
 * @returns {Map<string, string>} 查询参数的 Map 对象，如果 URL 无效或没有查询参数则返回空 Map
 * @example
 * getQueryMap('https://example.com?name=john&age=30')
 * // Map { 'name' => 'john', 'age' => '30' }
 */
function getQueryMap(url: string): Map<string, string> {
  if (!isValidURL(url)) {
    console.error(`${url} 不符合超链接格式`)
    return new Map() // 返回空的 Map
  }

  const queryString = url.split('?')[1] // 获取查询字符串
  if (!queryString) return new Map() // 如果没有查询字符串，返回空的 Map

  const params = queryString.split('&')
  const queryMap = new Map<string, string>()

  for (const param of params) {
    const [key, value] = param.split('=') // 解构获取键值对
    if (key) {
      queryMap.set(decodeURIComponent(key), decodeURIComponent(value || '')) // 支持解码
    }
  }

  return queryMap
}

export { isValidURL, getQueryMap }
