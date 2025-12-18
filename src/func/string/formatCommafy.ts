import { isEmpty } from '../../validator/empty/isEmpty'

/**
 * @description: 将数字格式化为千分位格式（添加逗号分隔符）
 * @param {undefined | string | number} num - 要格式化的数字
 * @returns {string} 格式化后的字符串，如果输入为空则返回空字符串
 * @example
 * formatCommafy(1234567) // '1,234,567'
 * formatCommafy(1234.56) // '1,234.56'
 * formatCommafy('') // ''
 */
export const formatCommafy = (num: undefined | string | number): string => {
  if (isEmpty(num)) return ''
  num = '' + num
  if (/^.*\..*$/.test(num)) {
    const pointIndex = num.lastIndexOf('.')
    let intPart = num.substring(0, pointIndex)
    const pointPart = num.substring(pointIndex + 1, num.length)
    intPart = intPart + ''
    const re = /(-?\d+)(\d{3})/
    while (re.test(intPart)) {
      intPart = intPart.replace(re, '$1,$2')
    }
    num = intPart + '.' + pointPart
  } else {
    num = num + ''
    const re = /(-?\d+)(\d{3})/
    while (re.test(num)) {
      num = num.replace(re, '$1,$2')
    }
  }
  return num
}
