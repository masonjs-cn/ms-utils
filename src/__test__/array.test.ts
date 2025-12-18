import { arrayEqual, arrayUnique } from '..'

describe('arrayEqual', () => {
  it('[0,1,2] compared with [0,1] should return false', () => {
    expect(arrayEqual([0, 1, 2], [0, 1])).toBeFalsy()
  })

  it('[0,1,2] compared with [0,1,2] should return true', () => {
    expect(arrayEqual([0, 1, 2], [0, 1, 2])).toBeTruthy()
  })

  it('empty arrays should return true', () => {
    expect(arrayEqual([], [])).toBeTruthy()
  })

  it('arrays with same reference should return true', () => {
    const arr = [1, 2, 3]
    expect(arrayEqual(arr, arr)).toBeTruthy()
  })

  it('arrays with different values should return false', () => {
    expect(arrayEqual([1, 2, 3], [1, 2, 4])).toBeFalsy()
  })

  it('arrays with same values in different order should return false', () => {
    expect(arrayEqual([1, 2, 3], [3, 2, 1])).toBeFalsy()
  })

  it('arrays with nested arrays should compare by reference', () => {
    const nested = [2, 3]
    expect(arrayEqual([1, nested], [1, nested])).toBeTruthy()
    // arrayEqual does shallow comparison, so different array instances return false
    expect(arrayEqual([1, [2, 3]], [1, [2, 3]])).toBeFalsy()
  })

  it('arrays with objects should compare by reference', () => {
    const obj = { a: 1 }
    expect(arrayEqual([obj], [obj])).toBeTruthy()
    expect(arrayEqual([{ a: 1 }], [{ a: 1 }])).toBeFalsy()
  })
})

describe('arrayUnique', () => {
  it(`[1, 1, 2, 'a', 'a', 'bcd'] should return [1,2,'a','bcd']`, () => {
    expect(arrayEqual(arrayUnique([1, 1, 2, 'a', 'a', 'bcd']), [1, 2, 'a', 'bcd'])).toBeTruthy()
  })

  it('empty array should return empty array', () => {
    expect(arrayUnique([])).toEqual([])
  })

  it('array with no duplicates should return same array', () => {
    expect(arrayUnique([1, 2, 3])).toEqual([1, 2, 3])
  })

  it('array with all same elements should return single element', () => {
    expect(arrayUnique([1, 1, 1, 1])).toEqual([1])
  })

  it('should throw error for non-array input', () => {
    expect(() => arrayUnique(null as any)).toThrow(TypeError)
    expect(() => arrayUnique(undefined as any)).toThrow(TypeError)
    expect(() => arrayUnique('string' as any)).toThrow(TypeError)
    expect(() => arrayUnique({} as any)).toThrow(TypeError)
  })
})
