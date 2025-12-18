/**
 * @description: 节流函数选项
 */
export interface ThrottleOptions {
  /** 是否在开始时执行，默认为 true */
  leading?: boolean
  /** 是否在结束时执行，默认为 true */
  trailing?: boolean
}

/**
 * @description: 节流函数，限制函数执行频率
 * @param {Function} func - 要节流的函数
 * @param {number} wait - 等待时间（毫秒）
 * @param {ThrottleOptions} [options={ leading: true, trailing: true }] - 节流选项
 * @return {Function} 返回节流后的函数
 * @throws {TypeError} 如果 func 不是函数则抛出错误
 * @throws {TypeError} 如果 wait 不是有效数字则抛出错误
 * @throws {Error} 如果 wait 是负数则抛出错误
 * @example
 * const throttledFn = throttle(() => console.log('throttled'), 1000)
 * const throttledFn2 = throttle(() => console.log('throttled'), 1000, { leading: false })
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: ThrottleOptions = { leading: true, trailing: true }
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
  let previous = 0
  const { leading = true, trailing = true } = options

  return function throttled(this: ThisParameterType<T>, ...args: Parameters<T>) {
    // 如果 leading 和 trailing 都为 false，函数完全不执行
    if (!leading && !trailing) {
      return
    }

    const now = Date.now()
    if (!previous && !leading) previous = now
    const remaining = wait - (now - previous)

    if (remaining <= 0 || remaining > wait) {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
      previous = now
      if (leading) {
        func.apply(this, args)
      }
    } else if (!timeoutId && trailing) {
      timeoutId = setTimeout(() => {
        previous = !leading ? 0 : Date.now()
        timeoutId = null
        func.apply(this, args)
      }, remaining)
    }
  }
}
