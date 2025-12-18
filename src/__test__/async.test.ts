import { sleep, uuid } from '..'

describe('async functions: ', () => {
  describe('sleep: ', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.runOnlyPendingTimers()
      jest.useRealTimers()
    })

    it('sleep should resolve after specified time', async () => {
      const promise = sleep(1000)
      jest.advanceTimersByTime(1000)
      const result = await promise
      expect(result).toBe('')
    })

    it('sleep should return a promise', () => {
      const result = sleep(100)
      expect(result).toBeInstanceOf(Promise)
    })
  })

  describe('uuid: ', () => {
    it('uuid should return a string', () => {
      expect(typeof uuid()).toBe('string')
    })

    it('uuid should return correct format', () => {
      const id = uuid()
      expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
    })

    it('uuid should generate unique values', () => {
      const ids = Array.from({ length: 100 }, () => uuid())
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(100)
    })

    it('uuid should have correct length', () => {
      expect(uuid().length).toBe(36)
    })
  })
})
