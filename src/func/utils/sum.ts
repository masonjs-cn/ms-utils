import { plus } from '../calculate/calculate'

/**
 * @description: 计算多个数字的和
 * @param {...number} args - 要相加的数字
 * @return {number} 所有数字的和
 * @throws {TypeError} 如果参数中包含非数字类型则抛出错误
 * @example
 * sum(1, 2, 3) // 6
 */
export function sum(...args: number[]): number {
  if (args.length === 0) {
    return 0
  }
  // 验证所有参数都是有效数字
  for (const arg of args) {
    if (typeof arg !== 'number' || isNaN(arg)) {
      throw new TypeError('All arguments must be valid numbers')
    }
  }
  return args.reduce((prev, total) => plus(total, prev), 0)
}
