import { setCookie, getCookie, removeCookie } from '..'

describe('cookie test', () => {
  beforeEach(() => {
    // 清理所有 cookies
    document.cookie.split(';').forEach((cookie) => {
      const eqPos = cookie.indexOf('=')
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim()
      if (name) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
      }
    })
  })

  describe('setCookie: ', () => {
    it(`setCookie('foo', 'bar') should create a cookie`, () => {
      setCookie('foo', 'bar')
      expect(getCookie('foo')).toEqual('bar')
    })

    it(`setCookie with special characters should work (note: getCookie removes spaces)`, () => {
      setCookie('test', 'value with spaces')
      // getCookie removes all spaces, so we expect the value without spaces
      expect(getCookie('test')).toEqual('valuewithspaces')
    })

    afterEach(() => {
      removeCookie('foo')
      removeCookie('test')
    })
  })

  describe(`getCookie`, () => {
    beforeEach(() => {
      setCookie('name', 'william')
    })

    it(`getCookie('name') should return 'william'`, () => {
      expect(getCookie('name')).toEqual('william')
    })

    it(`getCookie('empty') should return ''`, () => {
      expect(getCookie('empty')).toEqual('')
    })

    it(`getCookie('non-existent') should return ''`, () => {
      expect(getCookie('non-existent')).toEqual('')
    })

    afterEach(() => {
      removeCookie('name')
      removeCookie('empty')
    })
  })

  describe(`removeCookie`, () => {
    beforeEach(() => {
      setCookie('foo', 'bar')
    })

    it(`removeCookie('foo') should delete the cookie`, () => {
      expect(getCookie('foo')).toEqual('bar')
      removeCookie('foo')
      expect(getCookie('foo')).toEqual('')
    })

    it(`removeCookie('non-existent') should not throw error`, () => {
      expect(() => removeCookie('non-existent')).not.toThrow()
    })
  })
})
