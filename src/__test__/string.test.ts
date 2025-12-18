import { subBefore, subAfter } from '..'

describe('string functions: ', () => {
  describe('subBefore: ', () => {
    it('subBefore("hello world", " ") should return "world"', () => {
      expect(subBefore('hello world', ' ')).toBe('world')
    })

    it('subBefore("test@example.com", "@") should return "example.com"', () => {
      expect(subBefore('test@example.com', '@')).toBe('example.com')
    })

    it('subBefore("abc", "d") should return ""', () => {
      expect(subBefore('abc', 'd')).toBe('')
    })

    it('subBefore("abc", "") should return ""', () => {
      expect(subBefore('abc', '')).toBe('')
    })

    it('subBefore should handle multiple occurrences', () => {
      expect(subBefore('hello world test', ' ')).toBe('test')
    })
  })

  describe('subAfter: ', () => {
    it('subAfter("hello world", " ") should return "hello"', () => {
      expect(subAfter('hello world', ' ')).toBe('hello')
    })

    it('subAfter("test@example.com", "@") should return "test"', () => {
      expect(subAfter('test@example.com', '@')).toBe('test')
    })

    it('subAfter("abc", "d") should return ""', () => {
      expect(subAfter('abc', 'd')).toBe('')
    })

    it('subAfter("abc", "") should return ""', () => {
      expect(subAfter('abc', '')).toBe('')
    })

    it('subAfter should handle first occurrence', () => {
      expect(subAfter('hello world test', ' ')).toBe('hello')
    })
  })
})
