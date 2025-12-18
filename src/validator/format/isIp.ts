import { REGEXP_IP } from '../../constant/regexp'

/**
 * @description: 验证字符串是否为有效的 IP 地址（IPv4）
 * @param {any} value - 要验证的值
 * @returns {boolean} 如果是有效的 IP 地址返回 true，否则返回 false
 * @example
 * isIp('192.168.1.1') // true
 * isIp('256.1.1.1') // false
 */
export const isIp = (value: any) => {
  return REGEXP_IP.test(value)
}
