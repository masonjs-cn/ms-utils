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

  it('deepClone(Map) should return new Map instance', () => {
    const map = new Map<any, any>([
      ['key1', 'value1'],
      ['key2', { nested: 'object' }]
    ])
    const cloned = deepClone(map)
    expect(cloned).not.toBe(map)
    expect(cloned instanceof Map).toBe(true)
    expect(cloned.get('key1')).toEqual('value1')
    expect(cloned.get('key2')).not.toBe(map.get('key2'))
    expect(cloned.get('key2')).toEqual({ nested: 'object' })
  })

  it('deepClone(Set) should return new Set instance', () => {
    const set = new Set([1, 2, { a: 3 }])
    const cloned = deepClone(set)
    expect(cloned).not.toBe(set)
    expect(cloned instanceof Set).toBe(true)
    expect(cloned.size).toBe(3)
    expect(cloned.has(1)).toBe(true)
    expect(cloned.has(2)).toBe(true)
    const setArray = Array.from(cloned)
    expect(setArray[2]).not.toBe(Array.from(set)[2])
    expect(setArray[2]).toEqual({ a: 3 })
  })

  it('deepClone should handle Symbol properties', () => {
    const sym1 = Symbol('sym1')
    const sym2 = Symbol('sym2')
    const obj: any = {
      normal: 'normal',
      [sym1]: 'symbol1',
      [sym2]: { nested: 'symbol2' }
    }
    const cloned = deepClone(obj)
    expect(cloned).not.toBe(obj)
    expect(cloned.normal).toEqual('normal')
    expect(cloned[sym1]).toEqual('symbol1')
    expect(cloned[sym2]).not.toBe(obj[sym2])
    expect(cloned[sym2]).toEqual({ nested: 'symbol2' })
  })

  it('deepClone should handle Map with circular references', () => {
    const map = new Map()
    const obj: any = { a: 1 }
    map.set('obj', obj)
    obj.self = map
    const cloned = deepClone(map)
    expect(cloned).not.toBe(map)
    expect(cloned instanceof Map).toBe(true)
    const clonedObj = cloned.get('obj')
    expect(clonedObj).not.toBe(obj)
    expect(clonedObj.a).toEqual(1)
    expect(clonedObj.self).toBe(cloned)
  })

  it('deepClone should handle Set with circular references', () => {
    const set = new Set()
    const obj: any = { a: 1 }
    set.add(obj)
    obj.self = set
    const cloned = deepClone(set)
    expect(cloned).not.toBe(set)
    expect(cloned instanceof Set).toBe(true)
    const clonedObj = Array.from(cloned)[0] as any
    expect(clonedObj).not.toBe(obj)
    expect(clonedObj.a).toEqual(1)
    expect(clonedObj.self).toBe(cloned)
  })

  it('deepClone should handle Map with object keys', () => {
    const keyObj1 = { id: 1 }
    const keyObj2 = { id: 2 }
    const map = new Map<any, any>()
    map.set(keyObj1, 'value1')
    map.set(keyObj2, 'value2')
    map.set('stringKey', 'value3')

    const cloned = deepClone(map) as Map<any, any>
    expect(cloned).not.toBe(map)
    expect(cloned instanceof Map).toBe(true)
    expect(cloned.size).toBe(3)

    // 检查对象键是否被正确克隆
    const clonedKeys = Array.from(cloned.keys())
    const hasClonedKey1 = clonedKeys.some((key: any) => key.id === 1)
    const hasClonedKey2 = clonedKeys.some((key: any) => key.id === 2)
    expect(hasClonedKey1).toBe(true)
    expect(hasClonedKey2).toBe(true)
    expect(cloned.get('stringKey')).toBe('value3')
  })

  it('deepClone should handle Map with nested objects as keys', () => {
    const nestedKey = { level1: { level2: { id: 1 } } }
    const map = new Map<any, any>()
    map.set(nestedKey, 'nested value')

    const cloned = deepClone(map) as Map<any, any>
    expect(cloned).not.toBe(map)
    const clonedKey = Array.from(cloned.keys())[0] as any
    expect(clonedKey).not.toBe(nestedKey)
    expect(clonedKey.level1.level2.id).toBe(1)
    expect(cloned.get(clonedKey)).toBe('nested value')
  })

  it('deepClone should handle Set with nested objects', () => {
    const nestedObj1 = { a: { b: { c: 1 } } }
    const nestedObj2 = { a: { b: { c: 2 } } }
    const set = new Set([nestedObj1, nestedObj2])

    const cloned = deepClone(set)
    expect(cloned).not.toBe(set)
    expect(cloned instanceof Set).toBe(true)
    expect(cloned.size).toBe(2)

    const clonedArray = Array.from(cloned)
    expect(clonedArray[0]).not.toBe(nestedObj1)
    expect(clonedArray[0]).toEqual(nestedObj1)
    expect(clonedArray[1]).not.toBe(nestedObj2)
    expect(clonedArray[1]).toEqual(nestedObj2)
  })

  it('deepClone should handle objects with null and undefined values', () => {
    const obj = {
      nullValue: null,
      undefinedValue: undefined,
      emptyString: '',
      zero: 0,
      falseValue: false,
      nested: {
        nullValue: null,
        undefinedValue: undefined
      }
    }

    const cloned = deepClone(obj)
    expect(cloned).not.toBe(obj)
    expect(cloned.nullValue).toBe(null)
    expect(cloned.undefinedValue).toBe(undefined)
    expect(cloned.emptyString).toBe('')
    expect(cloned.zero).toBe(0)
    expect(cloned.falseValue).toBe(false)
    expect(cloned.nested.nullValue).toBe(null)
    expect(cloned.nested.undefinedValue).toBe(undefined)
  })

  it('deepClone should handle objects with getter properties', () => {
    const obj: any = {}
    Object.defineProperty(obj, 'getterProp', {
      get: () => 'getter value',
      enumerable: true,
      configurable: true
    })
    obj.normalProp = 'normal value'

    const cloned = deepClone(obj)
    expect(cloned).not.toBe(obj)
    // getter 属性会被转换为普通属性
    expect(cloned.getterProp).toBe('getter value')
    expect(cloned.normalProp).toBe('normal value')
  })

  it('deepClone should handle RegExp with special flags', () => {
    const regex1 = new RegExp('test', 'gimuy')
    const regex2 = /^test$/s
    const regex3 = new RegExp('\\d+', 'g')

    const cloned1 = deepClone(regex1)
    const cloned2 = deepClone(regex2)
    const cloned3 = deepClone(regex3)

    expect(cloned1).not.toBe(regex1)
    expect(cloned1.source).toBe(regex1.source)
    expect(cloned1.flags).toBe(regex1.flags)

    expect(cloned2).not.toBe(regex2)
    expect(cloned2.source).toBe(regex2.source)
    expect(cloned2.flags).toBe(regex2.flags)

    expect(cloned3).not.toBe(regex3)
    expect(cloned3.source).toBe(regex3.source)
    expect(cloned3.flags).toBe(regex3.flags)
  })

  it('deepClone should handle Date with various timestamps', () => {
    const dates = [
      new Date(0), // Unix epoch
      new Date('2020-01-01'),
      new Date(999999999999), // 大时间戳
      new Date('invalid') // Invalid date
    ]

    dates.forEach((date) => {
      const cloned = deepClone(date)
      expect(cloned).not.toBe(date)
      expect(cloned instanceof Date).toBe(true)
      expect(cloned.getTime()).toBe(date.getTime())
    })
  })

  it('deepClone should handle mixed complex structures', () => {
    const complex = {
      map: new Map<any, any>([
        ['key1', { value: 1 }],
        [{ id: 2 }, 'value2']
      ]),
      set: new Set([1, { a: 2 }, [3, 4]]),
      array: [new Date('2020-01-01'), /test/g, new Map([['nested', 'value']]), new Set([1, 2, 3])],
      date: new Date('2020-01-01'),
      regex: /test/gi,
      symbol: Symbol('test'),
      nested: {
        map: new Map(),
        set: new Set()
      }
    }

    const cloned = deepClone(complex) as typeof complex
    expect(cloned).not.toBe(complex)
    expect((cloned.map as Map<any, any>).size).toBe(2)
    expect((cloned.set as Set<any>).size).toBe(3)
    expect(cloned.array.length).toBe(4)
    expect(cloned.array[0] instanceof Date).toBe(true)
    expect(cloned.array[1] instanceof RegExp).toBe(true)
    expect(cloned.array[2] instanceof Map).toBe(true)
    expect(cloned.array[3] instanceof Set).toBe(true)
    expect(cloned.date instanceof Date).toBe(true)
    expect(cloned.regex instanceof RegExp).toBe(true)
    expect((cloned.nested.map as Map<any, any>) instanceof Map).toBe(true)
    expect((cloned.nested.set as Set<any>) instanceof Set).toBe(true)
  })

  it('deepClone should handle empty Map and Set', () => {
    const emptyMap = new Map()
    const emptySet = new Set()

    const clonedMap = deepClone(emptyMap)
    const clonedSet = deepClone(emptySet)

    expect(clonedMap).not.toBe(emptyMap)
    expect(clonedMap instanceof Map).toBe(true)
    expect(clonedMap.size).toBe(0)

    expect(clonedSet).not.toBe(emptySet)
    expect(clonedSet instanceof Set).toBe(true)
    expect(clonedSet.size).toBe(0)
  })

  it('deepClone should handle objects with only Symbol properties', () => {
    const sym1 = Symbol('sym1')
    const sym2 = Symbol('sym2')
    const obj: any = {
      [sym1]: 'value1',
      [sym2]: 'value2'
    }

    const cloned = deepClone(obj)
    expect(cloned).not.toBe(obj)
    expect(cloned[sym1]).toBe('value1')
    expect(cloned[sym2]).toBe('value2')
    expect(Object.keys(cloned).length).toBe(0) // Symbol 属性不计入 keys
    expect(Object.getOwnPropertySymbols(cloned).length).toBe(2)
  })
})
