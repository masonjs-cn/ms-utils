import { getValueType, formatBytes, downFile } from '..'

describe('util functions: ', () => {
  describe('getValueType: ', () => {
    it('getValueType should return correct type string', () => {
      expect(getValueType(null)).toBe('[object Null]')
      expect(getValueType(undefined)).toBe('[object Undefined]')
      expect(getValueType(1)).toBe('[object Number]')
      expect(getValueType('string')).toBe('[object String]')
      expect(getValueType(true)).toBe('[object Boolean]')
      expect(getValueType([])).toBe('[object Array]')
      expect(getValueType({})).toBe('[object Object]')
      expect(getValueType(() => {})).toBe('[object Function]')
    })
  })

  describe('formatBytes: ', () => {
    it('formatBytes should format bytes correctly', () => {
      expect(formatBytes(0)).toBe('0 Bytes')
      expect(formatBytes(1024)).toBe('1 KB')
      expect(formatBytes(1048576)).toBe('1 MB')
      expect(formatBytes(1073741824)).toBe('1 GB')
    })

    it('formatBytes should handle decimal places', () => {
      expect(formatBytes(1536, 2)).toBe('1.5 KB')
      expect(formatBytes(1536, 0)).toBe('2 KB')
    })

    it('formatBytes should handle negative decimals', () => {
      expect(formatBytes(1024, -1)).toBe('1 KB')
    })
  })

  describe('downFile: ', () => {
    let createElementSpy: jest.SpyInstance
    let clickSpy: jest.SpyInstance
    const mockCreateObjectURL = jest.fn(() => 'blob:url')

    beforeEach(() => {
      // Mock URL.createObjectURL
      global.URL.createObjectURL = mockCreateObjectURL
      createElementSpy = jest.spyOn(document, 'createElement')
      clickSpy = jest.fn()
      createElementSpy.mockReturnValue({
        href: '',
        setAttribute: jest.fn(),
        click: clickSpy
      } as any)
    })

    afterEach(() => {
      createElementSpy.mockRestore()
      mockCreateObjectURL.mockClear()
    })

    it('downFile should download blob file', () => {
      const blob = new Blob(['test'], { type: 'text/plain' })
      const result = downFile(blob, 'test', 'txt')
      expect(result).toBeTruthy()
      expect(createElementSpy).toHaveBeenCalledWith('a')
      expect(mockCreateObjectURL).toHaveBeenCalled()
      expect(clickSpy).toHaveBeenCalled()
    })

    it('downFile should return false for non-blob input', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      const result = downFile({} as any, 'test', 'txt')
      expect(result).toBeFalsy()
      expect(consoleSpy).toHaveBeenCalled()
      consoleSpy.mockRestore()
    })
  })
})
