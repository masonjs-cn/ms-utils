import { isArray } from '../validator/isArray'

export const deepClone = <T>(tSource: Record<string, any> | T, cache = new WeakMap()): T => {
  if (!(tSource instanceof Object)) return tSource
  if (cache.get(tSource)) return cache.get(tSource)

  if (tSource instanceof Date) return new Date(tSource) as T
  if (tSource instanceof RegExp) return new RegExp(tSource.source, tSource.flags) as T

  const res: Record<string, any> = isArray(tSource) ? [] : {}
  cache.set(tSource, res)

  for (const key in tSource) {
    if (Object.prototype.hasOwnProperty.call(tSource, key)) {
      if (typeof tSource[key] === 'object' && tSource[key] !== null) {
        res[key] = deepClone(tSource[key], cache)
      } else {
        res[key] = tSource[key]
      }
    }
  }
  return res as T
}
