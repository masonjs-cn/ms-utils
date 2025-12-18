/**
 * @description: 检查数组是否包含另一个数组的所有元素
 * @param {Array} childArray - 要检查的子数组
 * @param {Array} parentArray - 父数组
 * @return {boolean} 如果父数组包含所有子数组的元素返回 true，否则返回 false
 * @example
 * isIncludeAllChildren([1, 2], [1, 2, 3]) // true
 * isIncludeAllChildren([1, 4], [1, 2, 3]) // false
 */
export function isIncludeAllChildren<T>(childArray: T[], parentArray: T[]): boolean {
  return childArray.every((child) => parentArray.includes(child))
}
