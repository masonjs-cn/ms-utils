import { REGEXP_APPLE_DEVICE } from '../constant/regexp'

/**
 * @description: 判断当前设备是否为苹果设备（Mac、iPhone、iPod、iPad）
 * @returns {boolean} 如果是苹果设备返回 true，否则返回 false
 * @example
 * isAppleDevice() // true (在苹果设备上)
 * isAppleDevice() // false (在其他设备上)
 */
export const isAppleDevice = () => {
  return REGEXP_APPLE_DEVICE.test(typeof navigator !== 'undefined' ? navigator.platform : '')
}
