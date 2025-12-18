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
  })
})
