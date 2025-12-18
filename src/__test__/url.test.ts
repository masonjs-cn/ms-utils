import { getQueryMap, isValidURL, isIncludeAllChildren } from '..'

describe('url functions: ', () => {
  describe('isValidURL: ', () => {
    it('isValidURL should validate http URLs', () => {
      expect(isValidURL('http://www.example.com')).toBeTruthy()
      expect(isValidURL('http://example.com/path')).toBeTruthy()
    })

    it('isValidURL should validate https URLs', () => {
      expect(isValidURL('https://www.example.com')).toBeTruthy()
    })

    it('isValidURL should reject invalid URLs', () => {
      expect(isValidURL('not-a-url')).toBeFalsy()
      expect(isValidURL('example')).toBeFalsy()
    })
  })

  describe('getQueryMap: ', () => {
    it('getQueryMap should parse query parameters', () => {
      const map = getQueryMap('http://example.com?name=test&age=20')
      expect(map.get('name')).toBe('test')
      expect(map.get('age')).toBe('20')
    })

    it('getQueryMap should handle empty query string', () => {
      const map = getQueryMap('http://example.com')
      expect(map.size).toBe(0)
    })

    it('getQueryMap should handle URL encoded parameters', () => {
      const map = getQueryMap('http://example.com?name=test%20value')
      expect(map.get('name')).toBe('test value')
    })

    it('getQueryMap should return empty map for invalid URL', () => {
      const map = getQueryMap('invalid-url')
      expect(map.size).toBe(0)
    })
  })

  describe('isIncludeAllChildren: ', () => {
    it('isIncludeAllChildren should check if parent includes all children', () => {
      expect(isIncludeAllChildren([1, 2], [1, 2, 3])).toBeTruthy()
      expect(isIncludeAllChildren([1, 2, 3], [1, 2, 3])).toBeTruthy()
    })

    it('isIncludeAllChildren should return false if not all included', () => {
      expect(isIncludeAllChildren([1, 2, 4], [1, 2, 3])).toBeFalsy()
    })

    it('isIncludeAllChildren should handle empty arrays', () => {
      expect(isIncludeAllChildren([], [1, 2, 3])).toBeTruthy()
      expect(isIncludeAllChildren([1, 2], [])).toBeFalsy()
    })
  })
})
