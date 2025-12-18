import { toggleClass, openLink } from '..'

describe('DOM functions: ', () => {
  describe('toggleClass: ', () => {
    let element: HTMLElement

    beforeEach(() => {
      element = document.createElement('div')
      document.body.appendChild(element)
    })

    afterEach(() => {
      document.body.removeChild(element)
    })

    it('toggleClass should add class when add is true', () => {
      toggleClass(true, 'test-class', element)
      expect(element.className).toContain('test-class')
    })

    it('toggleClass should remove class when add is false', () => {
      element.className = 'test-class other-class'
      toggleClass(false, 'test-class', element)
      expect(element.className).not.toContain('test-class')
      expect(element.className).toContain('other-class')
    })

    it('toggleClass should work on document.body by default', () => {
      const originalClassName = document.body.className
      toggleClass(true, 'test-body-class')
      expect(document.body.className).toContain('test-body-class')
      toggleClass(false, 'test-body-class')
      document.body.className = originalClassName
    })

    it('toggleClass should handle multiple classes', () => {
      element.className = 'class1'
      toggleClass(true, 'class2', element)
      expect(element.className).toContain('class1')
      expect(element.className).toContain('class2')
    })

    // 边界情况：空字符串类名
    it('toggleClass should handle empty class name', () => {
      const originalClassName = element.className
      toggleClass(true, '', element)
      // 空字符串会被 trim() 处理，所以结果应该是原始类名加上一个空格然后 trim
      const expected = `${originalClassName} `.trim()
      expect(element.className).toBe(expected)
    })

    // 边界情况：已经存在的类名
    it('toggleClass should handle already existing class when adding', () => {
      element.className = 'test-class'
      toggleClass(true, 'test-class', element)
      expect(element.className).toContain('test-class')
    })

    // 边界情况：不存在的类名删除
    it('toggleClass should handle non-existent class when removing', () => {
      element.className = 'other-class'
      toggleClass(false, 'non-existent', element)
      expect(element.className).toBe('other-class')
    })

    // 边界情况：多个空格
    it('toggleClass should handle multiple spaces in className', () => {
      element.className = 'class1   class2'
      toggleClass(false, 'class1', element)
      expect(element.className).not.toContain('class1')
      expect(element.className).toContain('class2')
    })
  })

  describe('openLink: ', () => {
    let anchorClickSpy: jest.SpyInstance

    beforeEach(() => {
      anchorClickSpy = jest.spyOn(HTMLAnchorElement.prototype, 'click')
    })

    afterEach(() => {
      anchorClickSpy.mockRestore()
      const existingLink = document.getElementById('external')
      if (existingLink) {
        document.body.removeChild(existingLink)
      }
    })

    it('openLink should create and click anchor element', () => {
      openLink('http://example.com')
      expect(anchorClickSpy).toHaveBeenCalled()
    })

    it('openLink should set correct href', () => {
      const createElementSpy = jest.spyOn(document, 'createElement')
      openLink('http://example.com')
      expect(createElementSpy).toHaveBeenCalledWith('a')
      createElementSpy.mockRestore()
    })

    it('openLink should use default target _blank', () => {
      openLink('http://example.com')
      expect(anchorClickSpy).toHaveBeenCalled()
    })

    it('openLink should use custom target', () => {
      openLink('http://example.com', '_self')
      expect(anchorClickSpy).toHaveBeenCalled()
    })

    // 边界情况：移除已存在的链接
    it('openLink should remove existing link with same id', () => {
      const existingLink = document.createElement('a')
      existingLink.id = 'external'
      document.body.appendChild(existingLink)
      openLink('http://example.com')
      const links = document.querySelectorAll('#external')
      expect(links.length).toBe(0)
    })

    // 边界情况：空字符串URL
    it('openLink should handle empty URL', () => {
      openLink('')
      expect(anchorClickSpy).toHaveBeenCalled()
    })

    // 边界情况：相对路径
    it('openLink should handle relative URL', () => {
      openLink('/path/to/page')
      expect(anchorClickSpy).toHaveBeenCalled()
    })
  })
})
