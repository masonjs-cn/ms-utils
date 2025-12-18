import { deepClone } from '..'

describe('deepClone: ', () => {
  it('deepClone(undefined) should return undefined', () => {
    expect(deepClone(undefined)).toEqual(undefined)
  })

  it('deepClone(null) should return null', () => {
    expect(deepClone(null)).toEqual(null)
  })

  it(`deepClone('string') should return 'string'`, () => {
    expect(deepClone('string')).toEqual('string')
  })

  it('deepClone(number) should return number', () => {
    expect(deepClone(123)).toEqual(123)
    expect(deepClone(0)).toEqual(0)
    expect(deepClone(-1)).toEqual(-1)
  })

  it('deepClone(boolean) should return boolean', () => {
    expect(deepClone(true)).toEqual(true)
    expect(deepClone(false)).toEqual(false)
  })

  it('deepClone(Date) should return new Date instance', () => {
    const date = new Date('2020-01-01')
    const cloned = deepClone(date)
    expect(cloned).not.toBe(date)
    expect(cloned.getTime()).toEqual(date.getTime())
  })

  it('deepClone(RegExp) should return new RegExp instance', () => {
    const regex = /test/gi
    const cloned = deepClone(regex)
    expect(cloned).not.toBe(regex)
    expect(cloned.source).toEqual(regex.source)
    expect(cloned.flags).toEqual(regex.flags)
  })

  it('deepClone(array) should return deep cloned array', () => {
    const arr = [1, 2, [3, 4]]
    const cloned = deepClone(arr)
    expect(cloned).not.toBe(arr)
    expect(cloned).toEqual(arr)
    expect(cloned[2]).not.toBe(arr[2])
  })

  it(`deepClone(object) should return deep cloned object`, () => {
    const data = { name: 'ryo', foo: 'bar', arr: [1, 2, [3, 4, { k: 5 }]] }
    const cloned = deepClone(data)
    expect(cloned).not.toBe(data)
    expect(JSON.stringify(cloned)).toEqual(JSON.stringify(data))
    expect(cloned.arr).not.toBe(data.arr)
    expect(cloned.arr[2]).not.toBe(data.arr[2])
  })

  it('deepClone should handle circular references', () => {
    const obj: any = { a: 1 }
    obj.self = obj
    const cloned = deepClone(obj)
    expect(cloned).not.toBe(obj)
    expect(cloned.a).toEqual(1)
    expect(cloned.self).toBe(cloned)
    expect(cloned.self).not.toBe(obj)
  })

  it('deepClone should handle nested circular references', () => {
    const obj: any = { a: { b: 1 } }
    obj.a.circular = obj
    const cloned = deepClone(obj)
    expect(cloned).not.toBe(obj)
    expect(cloned.a.b).toEqual(1)
    expect(cloned.a.circular).toBe(cloned)
  })

  it('deepClone should handle empty objects and arrays', () => {
    expect(deepClone({})).toEqual({})
    expect(deepClone([])).toEqual([])
  })

  it('deepClone should preserve object prototype chain', () => {
    class TestClass {
      constructor(public value: number) {}
    }
    const obj = new TestClass(1)
    const cloned = deepClone(obj)
    expect(cloned).toEqual({ value: 1 })
  })
})
