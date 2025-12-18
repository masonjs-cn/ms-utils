import { REGEXP_PORT } from '../../constant/regexp'

/**
 * @description: 验证数字是否为有效的端口号（0-65535）
 * @param {number} value - 要验证的数字
 * @returns {boolean} 如果是有效的端口号返回 true，否则返回 false
 * @example
 * isPort(8080) // true
 * isPort(65536) // false
 * isPort(-1) // false
 */
export const isPort = (value: number) => {
  return REGEXP_PORT.test(`${value}`)
}
