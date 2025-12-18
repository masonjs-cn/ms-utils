type NumberType = number | string

/**
 * 将给定的数字更正为指定有效数字
 *
 * @param num The input number
 * @param precision An integer specifying the number of significant digits
 *
 * @example strip(0.09999999999999998) === 0.1 // true
 */
function strip(num: NumberType, precision = 15): number {
  return +parseFloat(Number(num).toPrecision(precision))
}

/**
 * 返回数字长度
 *
 * @param num The input number
 */
function digitLength(num: NumberType): number {
  // Get digit length of e
  const eSplit = num.toString().split(/[eE]/)
  const len = (eSplit[0].split('.')[1] || '').length - +(eSplit[1] || 0)
  return len > 0 ? len : 0
}

/**
 * 将给定数字转换为整数，支持科学记数法。
 * 如果是十进制，数字将按比例放大。
 *
 * @param num The input number
 */
function float2Fixed(num: NumberType): number {
  if (num.toString().indexOf('e') === -1) {
    return Number(num.toString().replace('.', ''))
  }
  const dLen = digitLength(num)
  return dLen > 0 ? strip(Number(num) * Math.pow(10, dLen)) : Number(num)
}

/**
 * 如果给定的数字超出范围，则记录一个警告。
 *
 * @param num The input number
 */
function checkBoundary(num: number) {
  if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
    console.warn(`${num} is beyond boundary when transfer to integer, the results may not be accurate`)
  }
}

/**
 * 来支持rest,拓展参数
 *
 * @param operation The original operation
 * @throws {Error} 如果没有提供参数则抛出错误
 */
function createOperation(operation: (n1: NumberType, n2: NumberType) => number): (...nums: NumberType[]) => number {
  return (...nums: NumberType[]) => {
    if (nums.length === 0) {
      throw new Error('At least one number is required')
    }
    const [first, ...others] = nums
    return others.reduce((prev, next) => operation(prev, next), first) as number
  }
}

/**
 * @description: 精准的乘法运算
 * @param {...number|string} nums - 要相乘的数字
 * @return {number} 相乘的结果
 * @example
 * times(0.1, 0.2) // 0.02
 * times(2, 3, 4) // 24
 */
const times = createOperation((num1, num2) => {
  const num1Changed = float2Fixed(num1)
  const num2Changed = float2Fixed(num2)
  const baseNum = digitLength(num1) + digitLength(num2)
  const leftValue = num1Changed * num2Changed

  checkBoundary(leftValue)

  return leftValue / Math.pow(10, baseNum)
})

/**
 * @description: 精准的加法运算
 * @param {...number|string} nums - 要相加的数字
 * @return {number} 相加的结果
 * @example
 * plus(0.1, 0.2) // 0.3
 * plus(1, 2, 3) // 6
 */
const plus = createOperation((num1, num2) => {
  // 取最大的小数位
  const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)))
  // 把小数都转为整数然后再计算
  return (times(num1, baseNum) + times(num2, baseNum)) / baseNum
})

/**
 * @description: 精准的减法运算
 * @param {...number|string} nums - 要相减的数字
 * @return {number} 相减的结果
 * @example
 * minus(0.3, 0.1) // 0.2
 * minus(1, 0.9) // 0.1
 */
const minus = createOperation((num1, num2) => {
  const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)))
  return (times(num1, baseNum) - times(num2, baseNum)) / baseNum
})

/**
 * @description: 精准的除法运算
 * @param {...number|string} nums - 要相除的数字
 * @return {number} 相除的结果
 * @throws {Error} 如果除数为 0 则抛出错误
 * @example
 * divide(0.3, 0.1) // 3
 * divide(10, 2) // 5
 */
const divide = createOperation((num1, num2) => {
  const num2Value = Number(num2)
  if (num2Value === 0) {
    throw new Error('Division by zero is not allowed')
  }
  const num1Changed = float2Fixed(num1)
  const num2Changed = float2Fixed(num2)

  checkBoundary(num1Changed)
  checkBoundary(num2Changed)

  // fix: 类似 10 ** -4 为 0.00009999999999999999，strip 修正
  return times(num1Changed / num2Changed, strip(Math.pow(10, digitLength(num2) - digitLength(num1))))
})

/**
 * @description: 精准的四舍五入
 * @param {number|string} num - 要四舍五入的数字
 * @param {number} decimal - 保留的小数位数（必须是整数）
 * @return {number} 四舍五入后的结果
 * @throws {TypeError} 如果 decimal 不是整数则抛出错误
 * @example
 * round(1.23456, 2) // 1.23
 * round(1.235, 2) // 1.24
 */
function round(num: NumberType, decimal: number): number {
  if (typeof decimal !== 'number' || isNaN(decimal) || !Number.isInteger(decimal)) {
    throw new TypeError('Decimal parameter must be an integer')
  }
  const base = Math.pow(10, decimal)
  let result = divide(Math.round(Math.abs(times(num, base))), base)

  if (Number(num) < 0 && result !== 0) {
    result = times(result, -1)
  }

  return result
}

export { strip, plus, minus, times, divide, round, digitLength, float2Fixed }
