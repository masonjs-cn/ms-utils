/**
 * @description: 小数精度运算, 运算结果四舍五入
 * @param {number} f - 要处理的数字
 * @param {number} [digit=1] - 精确到{digit}位小数，如果运算结果为整数或小数位小于digit不补零
 * @return {number} 格式化后的数字
 * @throws {TypeError} 如果 f 不是有效数字则抛出错误
 * @throws {TypeError} 如果 digit 不是整数或为负数则抛出错误
 * @example
 * formatFloat(1.23456, 2) // 1.23
 */
const formatFloat = (f: number, digit = 1): number => {
  if (typeof f !== 'number' || isNaN(f)) {
    throw new TypeError('First parameter must be a valid number')
  }
  if (typeof digit !== 'number' || isNaN(digit) || !Number.isInteger(digit) || digit < 0) {
    throw new TypeError('Second parameter must be a non-negative integer')
  }
  // Math.pow(指数，幂指数)
  const m = Math.pow(10, digit)
  // Math.round（） 四舍五入
  return Math.round(f * m) / m
}

export { formatFloat }
