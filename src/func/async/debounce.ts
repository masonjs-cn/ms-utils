/**
 * @description: 防抖函数，延迟执行直到停止调用后的一段时间
 * @param {Function} func - 要防抖的函数
 * @param {number} wait - 延迟时间，默认为 200 毫秒
 * @param {boolean} immediate - 是否立即执行，默认为 false
 * @return {Function} 返回一个防抖的函数
 * @throws {TypeError} 如果 func 不是函数则抛出错误
 * @throws {TypeError} 如果 wait 不是有效数字则抛出错误
 * @throws {Error} 如果 wait 是负数则抛出错误
 * @example
 * const debouncedFn = debounce(() => console.log('debounced'), 300)
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait = 200,
  immediate = false
): ((this: ThisParameterType<T>, ...args: Parameters<T>) => void) => {
  if (typeof func !== 'function') {
    throw new TypeError('First parameter must be a function')
  }
  if (typeof wait !== 'number' || isNaN(wait)) {
    throw new TypeError('Second parameter must be a valid number')
  }
  if (wait < 0) {
    throw new Error('Wait time must be a non-negative number')
  }

  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return function debounced(this: ThisParameterType<T>, ...args: Parameters<T>) {
    const context = this
    const callNow = immediate && !timeoutId // 是否立即调用

    // 清除之前的定时器
    if (timeoutId) clearTimeout(timeoutId)

    // 设置新的定时器
    timeoutId = setTimeout(() => {
      timeoutId = null // 重置定时器
      if (!immediate) {
        func.apply(context, args) // 非立即调用时执行
      }
    }, wait)

    if (callNow) {
      func.apply(context, args)
    }
  }
}
