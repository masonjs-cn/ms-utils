import { isArray } from '../../validator/type/isArray'

/**
 * @description: 比较两个数组是否相等（浅比较）
 * @param {Array} arr1 - 第一个数组
 * @param {Array} arr2 - 第二个数组
 * @return {boolean} 如果数组相等返回 true，否则返回 false
 * @example
 * arrayEqual([1, 2, 3], [1, 2, 3]) // true
 */
const arrayEqual = <T>(arr1: T[], arr2: T[]): boolean => {
  if (arr1 === arr2) return true
  if (arr1.length != arr2.length) return false

  let i = 0
  const len = arr1.length

  while (i < len) {
    if (arr1[i] !== arr2[i]) return false
    i++
  }

  return true
}

/**
 * @description: 数组去重
 * @param {Array} arr - 要去重的数组
 * @return {Array} 返回去重后的新数组
 * @throws {TypeError} 如果参数不是数组则抛出错误
 * @example
 * arrayUnique([1, 2, 2, 3]) // [1, 2, 3]
 */
const arrayUnique = <T>(arr: T[]): T[] => {
  if (!isArray(arr)) {
    throw new TypeError('please input an array as a parameter')
  }
  return [...new Set(arr)]
}

export { arrayEqual, arrayUnique }
