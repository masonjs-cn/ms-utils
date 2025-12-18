import { getKeyList, filterNull, isEqual, isEqualObject, isEqualArray, intersection } from '..'

describe('object functions: ', () => {
  describe('getKeyList: ', () => {
    it('getKeyList should extract values from object array', () => {
      const items = [
        { id: 1, name: 'a' },
        { id: 2, name: 'b' },
        { id: 3, name: 'a' }
      ]
      expect(getKeyList(items, 'id')).toEqual([1, 2, 3])
      expect(getKeyList(items, 'name', true)).toEqual(['a', 'b'])
      expect(getKeyList(items, 'name', false)).toEqual(['a', 'b', 'a'])
    })

    it('getKeyList should handle empty array', () => {
      expect(getKeyList([], 'id')).toEqual([])
    })

    it('getKeyList should filter null and undefined', () => {
      const items = [
        { id: 1, name: 'a' },
        { id: null, name: 'b' },
        { id: undefined, name: 'c' }
      ]
      expect(getKeyList(items, 'id')).toEqual([1])
    })
  })

  describe('filterNull: ', () => {
    it('filterNull should remove null and undefined values', () => {
      const params = {
        a: 1,
        b: null,
        c: undefined,
        d: 'test'
      }
      const result = filterNull(params)
      expect(result).toEqual({ a: 1, d: 'test' })
    })

    it('filterNull should handle nested objects', () => {
      const params = {
        a: 1,
        b: {
          c: null,
          d: 'test'
        }
      }
      const result = filterNull(params)
      expect(result).toEqual({ a: 1, b: { d: 'test' } })
    })

    it('filterNull should return empty object for empty object', () => {
      expect(filterNull({})).toEqual({})
    })

    it('filterNull should return same value for non-object', () => {
      expect(filterNull(null as any)).toBeNull()
      expect(filterNull(undefined as any)).toBeUndefined()
      expect(filterNull('string' as any)).toBe('string')
    })
  })

  describe('isEqual: ', () => {
    it('isEqual should compare primitive values', () => {
      expect(isEqual(1, 1)).toBeTruthy()
      expect(isEqual('a', 'a')).toBeTruthy()
      expect(isEqual(true, true)).toBeTruthy()
      expect(isEqual(1, 2)).toBeFalsy()
    })

    it('isEqual should compare objects', () => {
      expect(isEqual({ a: 1 }, { a: 1 })).toBeTruthy()
      expect(isEqual({ a: 1 }, { a: 2 })).toBeFalsy()
      expect(isEqual({ a: 1, b: 2 }, { a: 1 })).toBeFalsy()
    })

    it('isEqual should compare arrays', () => {
      expect(isEqual([1, 2, 3], [1, 2, 3])).toBeTruthy()
      expect(isEqual([1, 2, 3], [1, 2, 4])).toBeFalsy()
    })

    it('isEqual should compare nested structures', () => {
      expect(isEqual({ a: { b: 1 } }, { a: { b: 1 } })).toBeTruthy()
      expect(isEqual([1, [2, 3]], [1, [2, 3]])).toBeTruthy()
    })
  })

  describe('isEqualObject: ', () => {
    it('isEqualObject should compare objects', () => {
      expect(isEqualObject({ a: 1 }, { a: 1 })).toBeTruthy()
      expect(isEqualObject({ a: 1 }, { a: 2 })).toBeFalsy()
    })

    it('isEqualObject should return true for same reference', () => {
      const obj = { a: 1 }
      expect(isEqualObject(obj, obj)).toBeTruthy()
    })
  })

  describe('isEqualArray: ', () => {
    it('isEqualArray should compare arrays', () => {
      expect(isEqualArray([1, 2, 3], [1, 2, 3])).toBeTruthy()
      expect(isEqualArray([1, 2, 3], [1, 2, 4])).toBeFalsy()
    })

    it('isEqualArray should return false for different lengths', () => {
      expect(isEqualArray([1, 2], [1, 2, 3])).toBeFalsy()
    })
  })

  describe('intersection: ', () => {
    it('intersection should find common elements', () => {
      expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3])
    })

    it('intersection should handle multiple arrays', () => {
      expect(intersection([1, 2, 3], [2, 3, 4], [3, 4, 5])).toEqual([3])
    })

    it('intersection should return empty array for no common elements', () => {
      expect(intersection([1, 2], [3, 4])).toEqual([])
    })

    it('intersection should handle empty arrays', () => {
      expect(intersection([], [1, 2])).toEqual([])
      expect(intersection([1, 2], [])).toEqual([])
    })
  })
})
