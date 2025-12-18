import { isObject } from '../../validator/type/isObject'
import { isArray } from '../../validator/type/isArray'

type Query = {
  [key: string]: any
}

/**
 * @description: 将 URL 中的查询字符串部分解析为对象
 * @param {string} url - 包含查询字符串的 URL，如果为空则使用当前页面的 URL
 * @returns {Query} 返回解析后的查询参数对象
 * @example
 * parseQueryString('https://example.com?name=john&age=30')
 * // { name: 'john', age: '30' }
 */
const parseQueryString = (url: string): Query => {
  url = !!url ? url : window.location.href
  if (url.indexOf('?') === -1) {
    return {}
  }
  const search: string = url.substring(url.indexOf('?') + 1)
  if (search === '') {
    return {}
  }
  const d: string[] = search.split('&')
  const query: Query = {}
  for (let i = 0; i < d.length; i++) {
    const pair = d[i].split('=')
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '')
  }
  return query
}

/**
 * @description: 将对象序列化为 URL 查询字符串
 * @param {Query} obj - 要序列化的对象
 * @returns {string} 返回查询字符串，如果对象为空则返回空字符串
 * @example
 * stringfyQueryString({ name: 'john', age: 30 })
 * // 'name=john&age=30'
 * stringfyQueryString({ tags: ['a', 'b'] })
 * // 'tags[0]=a&tags[1]=b'
 */
const stringfyQueryString = (obj: Query): string => {
  if (!isObject(obj)) return ''
  const pairs: string[] = []

  for (const key in obj) {
    const item = obj[key]

    if (isArray(item)) {
      for (let i = 0; i < item.length; ++i) {
        pairs.push(encodeURIComponent(key + '[' + i + ']') + '=' + encodeURIComponent(item[i]))
      }
      continue
    }

    pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(item))
  }

  return pairs.join('&')
}

export { parseQueryString, stringfyQueryString }
