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
})
