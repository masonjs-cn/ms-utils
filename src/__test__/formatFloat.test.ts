import { formatFloat } from '..'

describe('formatFloat: ', () => {
  it('formatFloat(1+2) has a default digit 1, and it should return 3', () => {
    expect(formatFloat(1 + 2)).toEqual(3)
  })

  it('formatFloat(3/1) should return 0.3', () => {
    expect(formatFloat(1 / 3)).toEqual(0.3)
  })

  it(`formatFloat(2*1.23456) should return 2.5`, () => {
    expect(formatFloat(2 * 1.23456)).toEqual(2.5)
  })

  it(`formatFloat(2*1.23456, 2) should return 2.47`, () => {
    expect(formatFloat(2 * 1.23456, 2)).toEqual(2.47)
  })

  it(`formatFloat(2*1.23456, 3) should return 2.469`, () => {
    expect(formatFloat(2 * 1.23456, 3)).toEqual(2.469)
  })

  it(`formatFloat(2*1.23456, 4) should return 2.469`, () => {
    expect(formatFloat(2 * 1.23456, 4)).toEqual(2.4691)
  })

  it('should throw error for invalid first parameter', () => {
    expect(() => formatFloat(NaN)).toThrow('First parameter must be a valid number')
    expect(() => formatFloat('invalid' as any)).toThrow('First parameter must be a valid number')
  })

  it('should throw error for invalid digit parameter', () => {
    expect(() => formatFloat(1.23, -1)).toThrow('Second parameter must be a non-negative integer')
    expect(() => formatFloat(1.23, 1.5)).toThrow('Second parameter must be a non-negative integer')
    expect(() => formatFloat(1.23, NaN)).toThrow('Second parameter must be a non-negative integer')
  })
})
