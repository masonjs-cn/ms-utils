import { REGEXP_MOBILE } from '../../constant/regexp'

/**
 * @description: 判断当前设备是否为移动设备
 * @returns {boolean} 如果是移动设备返回 true，否则返回 false
 * @example
 * isMobile() // true (在移动设备上)
 * isMobile() // false (在桌面设备上)
 */
export const isMobile = () => {
  return REGEXP_MOBILE.test(navigator.userAgent)
}
