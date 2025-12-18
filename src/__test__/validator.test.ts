import {
  isArray,
  isNull,
  isEmpty,
  isEmptyArray,
  isEmptyObject,
  isEmptyString,
  isFunc,
  isBlob,
  isIp,
  isPort,
  isPostalCode,
  isTelephone,
  isJSON,
  isLetterNumber,
  isLetterNumberUnderline,
  isLetterNumberZhUnderline,
  hasClass
} from '..'

describe('validator: ', () => {
  describe('isArray: ', () => {
    it('isArray(null) should return false', () => {
      expect(isArray(null)).toBeFalsy()
    })
    it('isArray(undefined) should return false', () => {
      expect(isArray(undefined)).toBeFalsy()
    })
    it('isArray([]) should return true', () => {
      expect(isArray([])).toBeTruthy()
    })
    it('isArray([1,2,3]) should return true', () => {
      expect(isArray([1, 2, 3])).toBeTruthy()
    })
    it('isArray({}) should return false', () => {
      expect(isArray({})).toBeFalsy()
    })
    it('isArray("string") should return false', () => {
      expect(isArray('string')).toBeFalsy()
    })
  })

  describe('isNull: ', () => {
    it('isNull(null) should return true', () => {
      expect(isNull(null)).toBeTruthy()
    })
    it('isNull(undefined) should return false', () => {
      expect(isNull(undefined)).toBeFalsy()
    })
    it('isNull(0) should return false', () => {
      expect(isNull(0)).toBeFalsy()
    })
    it('isNull("") should return false', () => {
      expect(isNull('')).toBeFalsy()
    })
  })

  describe('isEmpty: ', () => {
    it('isEmpty(null) should return true', () => {
      expect(isEmpty(null)).toBeTruthy()
    })
    it('isEmpty(undefined) should return true', () => {
      expect(isEmpty(undefined)).toBeTruthy()
    })
    it('isEmpty("") should return true', () => {
      expect(isEmpty('')).toBeTruthy()
    })
    it('isEmpty([]) should return true', () => {
      expect(isEmpty([])).toBeTruthy()
    })
    it('isEmpty({}) should return true', () => {
      expect(isEmpty({})).toBeTruthy()
    })
    it('isEmpty("text") should return false', () => {
      expect(isEmpty('text')).toBeFalsy()
    })
    it('isEmpty([1]) should return false', () => {
      expect(isEmpty([1])).toBeFalsy()
    })
    it('isEmpty({a: 1}) should return false', () => {
      expect(isEmpty({ a: 1 })).toBeFalsy()
    })
  })

  describe('isEmptyArray: ', () => {
    it('isEmptyArray([]) should return true', () => {
      expect(isEmptyArray([])).toBeTruthy()
    })
    it('isEmptyArray([1]) should return false', () => {
      expect(isEmptyArray([1])).toBeFalsy()
    })
    it('isEmptyArray({} as any) should return false', () => {
      expect(isEmptyArray({} as any)).toBeFalsy()
    })
  })

  describe('isEmptyObject: ', () => {
    it('isEmptyObject({}) should return true', () => {
      expect(isEmptyObject({})).toBeTruthy()
    })
    it('isEmptyObject({a: 1}) should return false', () => {
      expect(isEmptyObject({ a: 1 })).toBeFalsy()
    })
    it('isEmptyObject([]) should return false', () => {
      expect(isEmptyObject([])).toBeFalsy()
    })
  })

  describe('isEmptyString: ', () => {
    it('isEmptyString("") should return true', () => {
      expect(isEmptyString('')).toBeTruthy()
    })
    it('isEmptyString("text") should return false', () => {
      expect(isEmptyString('text')).toBeFalsy()
    })
    it('isEmptyString("   ") should return false', () => {
      expect(isEmptyString('   ')).toBeFalsy()
    })
  })

  describe('isFunc: ', () => {
    it('isFunc(function(){}) should return true', () => {
      expect(isFunc(function () {})).toBeTruthy()
    })
    it('isFunc(() => {}) should return true', () => {
      expect(isFunc(() => {})).toBeTruthy()
    })
    it('isFunc({}) should return false', () => {
      expect(isFunc({})).toBeFalsy()
    })
    it('isFunc(null) should return false', () => {
      expect(isFunc(null)).toBeFalsy()
    })
  })

  describe('isBlob: ', () => {
    it('isBlob(new Blob()) should return true', () => {
      expect(isBlob(new Blob())).toBeTruthy()
    })
    it('isBlob({}) should return false', () => {
      expect(isBlob({})).toBeFalsy()
    })
  })

  describe('isIp: ', () => {
    it('isIp("192.168.1.1") should return true', () => {
      expect(isIp('192.168.1.1')).toBeTruthy()
    })
    it('isIp("255.255.255.255") should return true', () => {
      expect(isIp('255.255.255.255')).toBeTruthy()
    })
    it('isIp("0.0.0.0") should return true', () => {
      expect(isIp('0.0.0.0')).toBeTruthy()
    })
    it('isIp("256.1.1.1") should return false', () => {
      expect(isIp('256.1.1.1')).toBeFalsy()
    })
    it('isIp("192.168.1") should return false', () => {
      expect(isIp('192.168.1')).toBeFalsy()
    })
    it('isIp("invalid") should return false', () => {
      expect(isIp('invalid')).toBeFalsy()
    })
  })

  describe('isPort: ', () => {
    it('isPort(80) should return true', () => {
      expect(isPort(80)).toBeTruthy()
    })
    it('isPort(8080) should return true', () => {
      expect(isPort(8080)).toBeTruthy()
    })
    it('isPort(65535) should return true', () => {
      expect(isPort(65535)).toBeTruthy()
    })
    it('isPort(0) should return true', () => {
      expect(isPort(0)).toBeTruthy()
    })
    it('isPort(65536) should return false', () => {
      expect(isPort(65536)).toBeFalsy()
    })
    it('isPort(-1) should return false', () => {
      expect(isPort(-1)).toBeFalsy()
    })
  })

  describe('isPostalCode: ', () => {
    it('isPostalCode("100000") should return true', () => {
      expect(isPostalCode('100000')).toBeTruthy()
    })
    it('isPostalCode("010000") should return false', () => {
      expect(isPostalCode('010000')).toBeFalsy()
    })
    it('isPostalCode("12345") should return false', () => {
      expect(isPostalCode('12345')).toBeFalsy()
    })
  })

  describe('isTelephone: ', () => {
    it('isTelephone("010-12345678") should return true', () => {
      expect(isTelephone('010-12345678')).toBeTruthy()
    })
    it('isTelephone("1234-5678901") should return true', () => {
      expect(isTelephone('1234-5678901')).toBeTruthy()
    })
    it('isTelephone("12345678") should return false', () => {
      expect(isTelephone('12345678')).toBeFalsy()
    })
  })

  describe('isJSON: ', () => {
    it('isJSON("{}") should return true', () => {
      expect(isJSON('{}')).toBeTruthy()
    })
    it('isJSON(\'{"a":1}\') should return true', () => {
      expect(isJSON('{"a":1}')).toBeTruthy()
    })
    it('isJSON("invalid") should return false', () => {
      expect(isJSON('invalid')).toBeFalsy()
    })
    it('isJSON("{a:1}") should return false', () => {
      expect(isJSON('{a:1}')).toBeFalsy()
    })
  })

  describe('isLetterNumber: ', () => {
    it('isLetterNumber("abc123") should return true', () => {
      expect(isLetterNumber('abc123')).toBeTruthy()
    })
    it('isLetterNumber("ABC123") should return true', () => {
      expect(isLetterNumber('ABC123')).toBeTruthy()
    })
    it('isLetterNumber("abc-123") should return false', () => {
      expect(isLetterNumber('abc-123')).toBeFalsy()
    })
    it('isLetterNumber("abc 123") should return false', () => {
      expect(isLetterNumber('abc 123')).toBeFalsy()
    })
  })

  describe('isLetterNumberUnderline: ', () => {
    it('isLetterNumberUnderline("abc123_") should return true', () => {
      expect(isLetterNumberUnderline('abc123_')).toBeTruthy()
    })
    it('isLetterNumberUnderline("abc-123") should return false', () => {
      expect(isLetterNumberUnderline('abc-123')).toBeFalsy()
    })
  })

  describe('isLetterNumberZhUnderline: ', () => {
    it('isLetterNumberZhUnderline("abc123中文_") should return true', () => {
      expect(isLetterNumberZhUnderline('abc123中文_')).toBeTruthy()
    })
    it('isLetterNumberZhUnderline("abc-123") should return false', () => {
      expect(isLetterNumberZhUnderline('abc-123')).toBeFalsy()
    })
  })

  describe('hasClass: ', () => {
    it('hasClass should check if element has class', () => {
      const element = document.createElement('div')
      element.className = 'test class'
      expect(hasClass(element, 'test')).toBeTruthy()
      expect(hasClass(element, 'class')).toBeTruthy()
      expect(hasClass(element, 'none')).toBeFalsy()
    })
  })
})
