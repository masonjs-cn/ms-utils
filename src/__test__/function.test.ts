import { debounce, throttle } from '..'

describe(`debounce: `, () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it(`should return a new function and run it after wait time`, () => {
    const callback = jest.fn()
    const debounced = debounce(callback, 1000)
    debounced()
    debounced()
    expect(callback).not.toHaveBeenCalled()
    jest.advanceTimersByTime(1000)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it(`should cancel previous calls when called multiple times`, () => {
    const callback = jest.fn()
    const debounced = debounce(callback, 1000)
    debounced()
    jest.advanceTimersByTime(500)
    debounced()
    jest.advanceTimersByTime(500)
    expect(callback).not.toHaveBeenCalled()
    jest.advanceTimersByTime(500)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it(`should pass arguments to callback`, () => {
    const callback = jest.fn()
    const debounced = debounce(callback, 1000)
    debounced('arg1', 'arg2')
    jest.advanceTimersByTime(1000)
    expect(callback).toHaveBeenCalledWith('arg1', 'arg2')
  })

  it(`should handle immediate option`, () => {
    const callback = jest.fn()
    const debounced = debounce(callback, 1000, true)
    debounced()
    expect(callback).toHaveBeenCalledTimes(1)
    debounced()
    expect(callback).toHaveBeenCalledTimes(1)
    jest.advanceTimersByTime(1000)
    debounced()
    expect(callback).toHaveBeenCalledTimes(2)
  })

  it(`should throw error when func is not a function`, () => {
    expect(() => {
      debounce(null as any, 1000)
    }).toThrow(TypeError)
    expect(() => {
      debounce(undefined as any, 1000)
    }).toThrow(TypeError)
    expect(() => {
      debounce('not a function' as any, 1000)
    }).toThrow(TypeError)
    expect(() => {
      debounce(123 as any, 1000)
    }).toThrow(TypeError)
  })

  it(`should throw error when wait is not a valid number`, () => {
    const callback = jest.fn()
    expect(() => {
      debounce(callback, 'not a number' as any)
    }).toThrow(TypeError)
    expect(() => {
      debounce(callback, NaN)
    }).toThrow(TypeError)
    expect(() => {
      debounce(callback, null as any)
    }).toThrow(TypeError)
  })

  it(`should throw error when wait is negative`, () => {
    const callback = jest.fn()
    expect(() => {
      debounce(callback, -1)
    }).toThrow(Error)
    expect(() => {
      debounce(callback, -100)
    }).toThrow(Error)
  })

  it(`should handle zero wait time`, () => {
    const callback = jest.fn()
    const debounced = debounce(callback, 0)
    debounced()
    jest.advanceTimersByTime(0)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it(`should preserve this context`, () => {
    const obj: { value: number; method: () => void } = {
      value: 42,
      method: debounce(function (this: { value: number }) {
        expect(this.value).toBe(42)
      }, 100)
    }
    obj.method()
    jest.advanceTimersByTime(100)
  })
})

describe(`throttle: `, () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it(`should be called only once within the time limit`, () => {
    const cb = jest.fn()
    const throttled = throttle(cb, 1000)
    throttled()
    throttled()
    throttled()
    expect(cb).toHaveBeenCalledTimes(1)
  })

  it(`should be called again after the time limit`, () => {
    const cb = jest.fn()
    const throttled = throttle(cb, 1000)
    throttled()
    expect(cb).toHaveBeenCalledTimes(1)
    jest.advanceTimersByTime(1000)
    throttled()
    expect(cb).toHaveBeenCalledTimes(2)
  })

  it(`should call callback without arguments`, () => {
    const cb = jest.fn()
    const throttled = throttle(cb, 1000)
    throttled()
    expect(cb).toHaveBeenCalled()
  })

  it(`should handle multiple rapid calls`, () => {
    const cb = jest.fn()
    const throttled = throttle(cb, 1000)
    throttled()
    jest.advanceTimersByTime(500)
    throttled()
    jest.advanceTimersByTime(500)
    throttled()
    expect(cb).toHaveBeenCalledTimes(2)
  })

  it(`should handle leading option`, () => {
    const cb = jest.fn()
    const throttled = throttle(cb, 1000, { leading: true, trailing: false })
    throttled()
    expect(cb).toHaveBeenCalledTimes(1)
    jest.advanceTimersByTime(500)
    throttled()
    expect(cb).toHaveBeenCalledTimes(1)
    jest.advanceTimersByTime(500)
    throttled()
    expect(cb).toHaveBeenCalledTimes(2)
  })

  it(`should handle trailing option`, () => {
    const cb = jest.fn()
    const throttled = throttle(cb, 1000, { leading: false, trailing: true })
    throttled()
    expect(cb).not.toHaveBeenCalled()
    jest.advanceTimersByTime(1000)
    expect(cb).toHaveBeenCalledTimes(1)
  })

  it(`should handle both leading and trailing options`, () => {
    const cb = jest.fn()
    const throttled = throttle(cb, 1000, { leading: true, trailing: true })
    throttled()
    expect(cb).toHaveBeenCalledTimes(1)
    jest.advanceTimersByTime(500)
    throttled()
    expect(cb).toHaveBeenCalledTimes(1)
    jest.advanceTimersByTime(500)
    expect(cb).toHaveBeenCalledTimes(2)
  })

  it(`should handle neither leading nor trailing options`, () => {
    const cb = jest.fn()
    const throttled = throttle(cb, 1000, { leading: false, trailing: false })
    throttled()
    expect(cb).not.toHaveBeenCalled()
    jest.advanceTimersByTime(1000)
    throttled()
    expect(cb).not.toHaveBeenCalled()
  })

  it(`should throw error when func is not a function`, () => {
    expect(() => {
      throttle(null as any, 1000)
    }).toThrow(TypeError)
    expect(() => {
      throttle(undefined as any, 1000)
    }).toThrow(TypeError)
    expect(() => {
      throttle('not a function' as any, 1000)
    }).toThrow(TypeError)
    expect(() => {
      throttle(123 as any, 1000)
    }).toThrow(TypeError)
  })

  it(`should throw error when wait is not a valid number`, () => {
    const callback = jest.fn()
    expect(() => {
      throttle(callback, 'not a number' as any)
    }).toThrow(TypeError)
    expect(() => {
      throttle(callback, NaN)
    }).toThrow(TypeError)
    expect(() => {
      throttle(callback, null as any)
    }).toThrow(TypeError)
  })

  it(`should throw error when wait is negative`, () => {
    const callback = jest.fn()
    expect(() => {
      throttle(callback, -1)
    }).toThrow(Error)
    expect(() => {
      throttle(callback, -100)
    }).toThrow(Error)
  })

  it(`should handle zero wait time`, () => {
    const callback = jest.fn()
    const throttled = throttle(callback, 0)
    throttled()
    expect(callback).toHaveBeenCalledTimes(1)
    throttled()
    expect(callback).toHaveBeenCalledTimes(2)
  })

  it(`should preserve this context`, () => {
    const obj: { value: number; method: () => void } = {
      value: 42,
      method: throttle(function (this: { value: number }) {
        expect(this.value).toBe(42)
      }, 100)
    }
    obj.method()
    jest.advanceTimersByTime(100)
  })

  it(`should handle edge case when remaining time exceeds wait time`, () => {
    const callback = jest.fn()
    const throttled = throttle(callback, 1000)

    // 第一次调用
    throttled()
    expect(callback).toHaveBeenCalledTimes(1)

    // 模拟时间回退或异常情况（remaining > wait）
    jest.advanceTimersByTime(2000)
    throttled()
    expect(callback).toHaveBeenCalledTimes(2)
  })
})
