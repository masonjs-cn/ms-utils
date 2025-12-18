/**
 * @description: 计算多个数组的交集
 * @param {...Array} arrays - 要计算交集的多个数组
 * @return {Array} 返回所有数组的交集数组
 * @example
 * intersection([1, 2, 3], [2, 3, 4], [3, 4, 5]) // [3]
 */
export const intersection = <T>(...arrays: Array<T[]>): T[] => {
  return arrays.reduce((acc, curr) => {
    return acc.filter((item) => curr.includes(item))
  })
}
