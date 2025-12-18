import { formatCommafy } from '..'

describe('formatCommafy: ', () => {
  it(`formatCommafy(10000) should return '10,000.00'`, () => {
    expect(formatCommafy(10000)).toBe('10,000')
  })

  it(`formatCommafy(10000, 0) should return '10,000'`, () => {
    expect(formatCommafy(10000)).toBe('10,000')
  })

  it(`formatCommafy(10000.123) should return '10,000.123'`, () => {
    expect(formatCommafy(10000.123)).toBe('10,000.123')
  })

  it(`formatCommafy(10000.126) should return '10,000.126'`, () => {
    expect(formatCommafy(10000.126)).toBe('10,000.126')
  })

  it(`formatCommafy(10000.126) should return '10,000.126'`, () => {
    expect(formatCommafy(10000.126)).toBe('10,000.126')
  })
})
