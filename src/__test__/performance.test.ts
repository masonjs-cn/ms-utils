import { deepClone, debounce, throttle } from '..'

/**
 * 创建大型对象用于性能测试
 */
function createLargeObject(size: number): Record<string, any> {
  const obj: Record<string, any> = {}
  for (let i = 0; i < size; i++) {
    obj[`key${i}`] = {
      id: i,
      name: `Item ${i}`,
      nested: {
        value: i * 2,
        array: Array.from({ length: 10 }, (_, j) => j),
        deep: {
          level: 3,
          data: `data-${i}`
        }
      }
    }
  }
  return obj
}

/**
 * 创建大型数组用于性能测试
 */
function createLargeArray(size: number): any[] {
  return Array.from({ length: size }, (_, i) => ({
    id: i,
    data: Array.from({ length: 100 }, (_, j) => `item-${i}-${j}`),
    nested: {
      value: i,
      items: Array.from({ length: 50 }, (_, k) => ({ index: k, value: i * k }))
    }
  }))
}

describe('Performance Tests', () => {
  describe('deepClone performance', () => {
    it('should handle large objects efficiently (10000 properties)', () => {
      const largeObj = createLargeObject(10000)
      const start = performance.now()
      const cloned = deepClone(largeObj)
      const duration = performance.now() - start

      expect(cloned).not.toBe(largeObj)
      expect(cloned).toEqual(largeObj)
      expect(duration).toBeLessThan(500) // 应在 500ms 内完成
    })

    it('should handle large arrays efficiently (1000 items)', () => {
      const largeArray = createLargeArray(1000)
      const start = performance.now()
      const cloned = deepClone(largeArray)
      const duration = performance.now() - start

      expect(cloned).not.toBe(largeArray)
      expect(cloned).toEqual(largeArray)
      expect(duration).toBeLessThan(100) // 应在 100ms 内完成
    })

    it('should handle complex nested structures efficiently', () => {
      const complexObj = {
        map: new Map(Array.from({ length: 1000 }, (_, i) => [`key${i}`, { value: i, nested: { data: i * 2 } }])),
        set: new Set(Array.from({ length: 1000 }, (_, i) => ({ id: i, value: `item-${i}` }))),
        array: createLargeArray(500),
        nested: createLargeObject(500)
      }

      const start = performance.now()
      const cloned = deepClone(complexObj)
      const duration = performance.now() - start

      expect(cloned).not.toBe(complexObj)
      expect(cloned.map.size).toBe(complexObj.map.size)
      expect(cloned.set.size).toBe(complexObj.set.size)
      expect(duration).toBeLessThan(200) // 复杂结构应在 200ms 内完成
    })

    it('should handle circular references efficiently', () => {
      const obj: any = createLargeObject(1000)
      // 添加循环引用
      obj.self = obj
      obj.nested = obj

      const start = performance.now()
      const cloned = deepClone(obj)
      const duration = performance.now() - start

      expect(cloned).not.toBe(obj)
      expect(cloned.self).toBe(cloned)
      expect(duration).toBeLessThan(100) // 应在 100ms 内完成
    })
  })

  describe('debounce performance', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.runOnlyPendingTimers()
      jest.useRealTimers()
    })

    it('should handle rapid calls efficiently', () => {
      const callback = jest.fn()
      const debounced = debounce(callback, 100)

      const start = performance.now()
      // 模拟快速连续调用
      for (let i = 0; i < 1000; i++) {
        debounced(i)
      }
      const duration = performance.now() - start

      expect(duration).toBeLessThan(50) // 1000 次调用应在 50ms 内完成
      expect(callback).not.toHaveBeenCalled()

      jest.advanceTimersByTime(100)
      expect(callback).toHaveBeenCalledTimes(1)
      expect(callback).toHaveBeenCalledWith(999)
    })

    it('should handle multiple debounced functions efficiently', () => {
      const callbacks = Array.from({ length: 100 }, () => jest.fn())
      const debouncedFunctions = callbacks.map((cb) => debounce(cb, 100))

      const start = performance.now()
      debouncedFunctions.forEach((fn, i) => {
        for (let j = 0; j < 100; j++) {
          fn(i, j)
        }
      })
      const duration = performance.now() - start

      expect(duration).toBeLessThan(100) // 100 个函数各调用 100 次应在 100ms 内完成
      jest.advanceTimersByTime(100)
      callbacks.forEach((cb, i) => {
        expect(cb).toHaveBeenCalledTimes(1)
        expect(cb).toHaveBeenCalledWith(i, 99)
      })
    })
  })

  describe('throttle performance', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.runOnlyPendingTimers()
      jest.useRealTimers()
    })

    it('should handle rapid calls efficiently', () => {
      const callback = jest.fn()
      const throttled = throttle(callback, 100)

      const start = performance.now()
      // 模拟快速连续调用
      for (let i = 0; i < 1000; i++) {
        throttled(i)
      }
      const duration = performance.now() - start

      expect(duration).toBeLessThan(50) // 1000 次调用应在 50ms 内完成
      expect(callback).toHaveBeenCalledTimes(1) // 立即执行一次

      jest.advanceTimersByTime(100)
      expect(callback).toHaveBeenCalledTimes(2) // 延迟执行一次
    })

    it('should handle multiple throttled functions efficiently', () => {
      const callbacks = Array.from({ length: 100 }, () => jest.fn())
      const throttledFunctions = callbacks.map((cb) => throttle(cb, 100))

      const start = performance.now()
      throttledFunctions.forEach((fn, i) => {
        for (let j = 0; j < 100; j++) {
          fn(i, j)
        }
      })
      const duration = performance.now() - start

      expect(duration).toBeLessThan(100) // 100 个函数各调用 100 次应在 100ms 内完成
      callbacks.forEach((cb) => {
        expect(cb).toHaveBeenCalledTimes(1) // 每个函数立即执行一次
      })

      jest.advanceTimersByTime(100)
      callbacks.forEach((cb) => {
        expect(cb).toHaveBeenCalledTimes(2) // 延迟执行一次
      })
    })

    it('should handle long-running throttled calls efficiently', () => {
      const callback = jest.fn()
      const throttled = throttle(callback, 100)

      const start = performance.now()
      // 模拟长时间运行的大量调用
      for (let i = 0; i < 10000; i++) {
        throttled(i)
        if (i % 1000 === 0) {
          jest.advanceTimersByTime(100)
        }
      }
      const duration = performance.now() - start

      expect(duration).toBeLessThan(2000) // 应在合理时间内完成（考虑定时器操作的开销）
      expect(callback.mock.calls.length).toBeGreaterThan(5) // 应该执行多次
    })
  })
})
