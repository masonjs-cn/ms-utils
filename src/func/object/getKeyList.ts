/**
 * @description: 从对象数组中提取指定键的值
 * @param {Array<Object>} items - 对象数组
 * @param {string} key - 需要提取的键
 * @param {boolean} [unique=true] - 是否返回唯一值，默认为 true
 * @return {Array} 返回提取的值数组
 * @example
 * getKeyList([{id: 1}, {id: 2}, {id: 1}], 'id') // [1, 2]
 */
export function getKeyList<T extends Record<string, any>, K extends keyof T>(
  items: T[],
  key: K,
  unique = true
): T[K][] {
  const values: T[K][] = []

  // 提取键值
  for (const item of items) {
    const value = item[key]
    if (value !== undefined && value !== null) {
      values.push(value)
    }
  }

  // 返回唯一值或所有值
  return unique ? Array.from(new Set(values)) : values
}
