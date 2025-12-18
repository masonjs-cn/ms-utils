import { formatBytes } from '..'

describe('formatBytes', () => {
  it('0', () => {
    expect(formatBytes(0)).toEqual('0 Bytes')
  })

  it('1024', () => {
    expect(formatBytes(1024)).toEqual('1 KB')
  })

  it('123456789', () => {
    expect(formatBytes(123456789)).toEqual('117.74 MB')
  })

  it('should throw error for negative numbers', () => {
    expect(() => formatBytes(-1)).toThrow('Bytes must be a non-negative number')
  })

  it('should throw error for NaN', () => {
    expect(() => formatBytes(NaN)).toThrow('Bytes must be a valid number')
  })

  it('should throw error for invalid type', () => {
    expect(() => formatBytes('invalid' as any)).toThrow('Bytes must be a valid number')
  })
})
