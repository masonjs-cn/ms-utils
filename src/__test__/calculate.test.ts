import { strip, plus, minus, times, divide, round, digitLength, float2Fixed } from '..'

describe('calculate functions: ', () => {
  describe('strip: ', () => {
    it('strip should correct floating point precision', () => {
      expect(strip(0.09999999999999998)).toBe(0.1)
      expect(strip(0.1 + 0.2)).toBe(0.3)
    })

    it('strip should handle integers', () => {
      expect(strip(123)).toBe(123)
      expect(strip(0)).toBe(0)
    })
  })

  describe('digitLength: ', () => {
    it('digitLength should return correct decimal places', () => {
      expect(digitLength(1.23)).toBe(2)
      expect(digitLength(1.23456)).toBe(5)
      expect(digitLength(123)).toBe(0)
    })

    it('digitLength should handle scientific notation', () => {
      expect(digitLength(1e-5)).toBe(5)
    })
  })

  describe('float2Fixed: ', () => {
    it('float2Fixed should convert float to integer', () => {
      expect(float2Fixed(1.23)).toBe(123)
      expect(float2Fixed(0.1)).toBe(1)
    })
  })

  describe('plus: ', () => {
    it('plus should accurately add numbers', () => {
      expect(plus(0.1, 0.2)).toBe(0.3)
      expect(plus(1, 2, 3)).toBe(6)
      expect(plus(0.1, 0.2, 0.3)).toBe(0.6)
    })

    it('plus should handle negative numbers', () => {
      expect(plus(-1, 2)).toBe(1)
      expect(plus(1, -2)).toBe(-1)
    })
  })

  describe('minus: ', () => {
    it('minus should accurately subtract numbers', () => {
      expect(minus(0.3, 0.1)).toBe(0.2)
      expect(minus(1, 0.9)).toBe(0.1)
    })

    it('minus should handle negative results', () => {
      expect(minus(1, 2)).toBe(-1)
    })
  })

  describe('times: ', () => {
    it('times should accurately multiply numbers', () => {
      expect(times(0.1, 0.2)).toBe(0.02)
      expect(times(2, 3, 4)).toBe(24)
    })

    it('times should handle zero', () => {
      expect(times(0, 100)).toBe(0)
      expect(times(100, 0)).toBe(0)
    })
  })

  describe('divide: ', () => {
    it('divide should accurately divide numbers', () => {
      expect(divide(0.3, 0.1)).toBe(3)
      expect(divide(10, 2)).toBe(5)
    })

    it('divide should handle decimal results', () => {
      expect(divide(1, 3)).toBeCloseTo(0.3333333333333333, 15)
    })

    it('divide should throw error for division by zero', () => {
      expect(() => divide(10, 0)).toThrow('Division by zero is not allowed')
      expect(() => divide(1, 0)).toThrow('Division by zero is not allowed')
    })
  })

  describe('round: ', () => {
    it('round should round to specified decimal places', () => {
      expect(round(1.23456, 2)).toBe(1.23)
      expect(round(1.235, 2)).toBe(1.24)
      expect(round(1.234, 2)).toBe(1.23)
    })

    it('round should handle negative numbers', () => {
      expect(round(-1.235, 2)).toBe(-1.24)
    })

    it('round should handle zero decimal places', () => {
      expect(round(1.5, 0)).toBe(2)
      expect(round(1.4, 0)).toBe(1)
    })

    it('round should throw error for invalid decimal parameter', () => {
      expect(() => round(1.23, 1.5)).toThrow('Decimal parameter must be an integer')
      expect(() => round(1.23, NaN)).toThrow('Decimal parameter must be an integer')
    })
  })

  describe('createOperation error handling: ', () => {
    it('should throw error when no arguments provided', () => {
      expect(() => plus()).toThrow('At least one number is required')
      expect(() => minus()).toThrow('At least one number is required')
      expect(() => times()).toThrow('At least one number is required')
      expect(() => divide()).toThrow('At least one number is required')
    })
  })
})
