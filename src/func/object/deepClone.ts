import { isArray } from '../../validator/type/isArray'

/**
 * @description: 深拷贝函数，支持多种数据类型
 * @param {T} tSource - 要克隆的源数据
 * @param {WeakMap} cache - 用于处理循环引用的缓存（内部使用）
 * @return {T} 深拷贝后的数据
 * @example
 * const obj = { a: 1, b: { c: 2 } }
 * const cloned = deepClone(obj)
 */
export const deepClone = <T>(tSource: T, cache = new WeakMap()): T => {
  // 处理基本类型
  if (tSource === null || typeof tSource !== 'object') {
    return tSource
  }

  // 处理循环引用
  if (cache.has(tSource)) {
    return cache.get(tSource) as T
  }

  // 处理 Date
  if (tSource instanceof Date) {
    return new Date(tSource.getTime()) as T
  }

  // 处理 RegExp
  if (tSource instanceof RegExp) {
    return new RegExp(tSource.source, tSource.flags) as T
  }

  // 处理 Map
  if (tSource instanceof Map) {
    const cloned = new Map()
    cache.set(tSource, cloned)
    tSource.forEach((value, key) => {
      cloned.set(deepClone(key, cache), deepClone(value, cache))
    })
    return cloned as T
  }

  // 处理 Set
  if (tSource instanceof Set) {
    const cloned = new Set()
    cache.set(tSource, cloned)
    tSource.forEach((value) => {
      cloned.add(deepClone(value, cache))
    })
    return cloned as T
  }

  // 处理 Array 和 Object
  const res: any = isArray(tSource) ? [] : {}
  cache.set(tSource, res)

  // 处理普通属性和 Symbol 属性
  const allKeys = [...Object.keys(tSource), ...Object.getOwnPropertySymbols(tSource)]

  for (const key of allKeys) {
    const value = (tSource as any)[key]
    if (typeof value === 'object' && value !== null) {
      res[key] = deepClone(value, cache)
    } else {
      res[key] = value
    }
  }

  return res as T
}
