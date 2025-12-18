/**
 * @description: 将字节数格式化为可读的字符串
 * @param {number} bytes - 要格式化的字节数
 * @param {number} [decimals=2] - 要保留的小数位数，默认为 2
 * @return {string} 格式化后的字符串
 * @throws {TypeError} 如果 bytes 不是有效数字则抛出错误
 * @throws {Error} 如果 bytes 是负数则抛出错误
 * @example
 * formatBytes(1024) // '1 KB'
 * formatBytes(1024, 0) // '1 KB'
 */
export const formatBytes = (bytes: number, decimals = 2): string => {
  if (typeof bytes !== 'number' || isNaN(bytes)) {
    throw new TypeError('Bytes must be a valid number')
  }
  if (bytes < 0) {
    throw new Error('Bytes must be a non-negative number')
  }

  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}
