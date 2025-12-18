import { isLeapYear, remainTime, isSameDay } from '..'

describe('Date: ', () => {
  describe('isLeapYear()', () => {
    it('isLeapYear(2016) should return true', () => {
      expect(isLeapYear(2016)).toBeTruthy()
    })
    it('isLeapYear(2017) should return false', () => {
      expect(isLeapYear(2017)).toBeFalsy()
    })
    it('isLeapYear(2018) should return false', () => {
      expect(isLeapYear(2018)).toBeFalsy()
    })
    it('isLeapYear(2020) should return true', () => {
      expect(isLeapYear(2020)).toBeTruthy()
    })
    it('isLeapYear(2022) should return false', () => {
      expect(isLeapYear(2022)).toBeFalsy()
    })
    it('isLeapYear(2024) should return true', () => {
      expect(isLeapYear(2024)).toBeTruthy()
    })
    // 边界情况：能被100整除但不能被400整除的年份不是闰年
    it('isLeapYear(1900) should return false', () => {
      expect(isLeapYear(1900)).toBeFalsy()
    })
    it('isLeapYear(2000) should return true', () => {
      expect(isLeapYear(2000)).toBeTruthy()
    })
    it('isLeapYear(2100) should return false', () => {
      expect(isLeapYear(2100)).toBeFalsy()
    })
    // 边界情况：能被4整除但不能被100整除的年份是闰年
    it('isLeapYear(2004) should return true', () => {
      expect(isLeapYear(2004)).toBeTruthy()
    })
  })

  describe('remainTime()', () => {
    it(`remainTime('2020-01-01') should equal to 0天0小时0分钟0秒`, () => {
      expect(remainTime('2020-01-01')).toEqual('0天 0小时 0分钟 0秒')
    })

    it('remainTime(new Date().getTime() + oneSecond + oneMinute + oneHour + oneDay) should equal to 1天1小时1分钟1秒', () => {
      let time = new Date().getTime(),
        oneSecond = 1000,
        oneMinute = oneSecond * 60,
        oneHour = oneMinute * 60,
        oneDay = oneHour * 24,
        o = new Date(time + oneSecond + oneMinute + oneHour + oneDay)
      expect(remainTime(o)).toEqual('1天 1小时 1分钟 1秒')
    })

    // 边界情况：结束时间早于开始时间（负数情况）
    it('remainTime should handle past dates correctly', () => {
      const pastDate = new Date(Date.now() - 1000 * 60 * 60 * 24) // 1天前
      const result = remainTime(pastDate)
      expect(result).toEqual('0天 0小时 0分钟 0秒')
    })

    // 边界情况：使用Date对象
    it('remainTime should handle Date object', () => {
      const futureDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 2) // 2天后
      const result = remainTime(futureDate)
      expect(result).toMatch(/^\d+天 \d+小时 \d+分钟 \d+秒$/)
    })
  })

  describe('isSameDay: ', () => {
    it(`isSameDay(new Date('2020-01-01'), new Date()) should return false`, () => {
      expect(isSameDay(new Date('2020-01-01'), new Date())).toBeFalsy()
    })
    it(`isSameDay(new Date(), new Date()) should return true`, () => {
      expect(isSameDay(new Date(), new Date())).toBeTruthy()
    })
    // 边界情况：字符串和Date混合
    it('isSameDay should handle string and Date mixed', () => {
      const dateStr = '2024-01-01'
      const dateObj = new Date('2024-01-01')
      expect(isSameDay(dateStr, dateObj)).toBeTruthy()
      expect(isSameDay(dateObj, dateStr)).toBeTruthy()
    })
    // 边界情况：相同日期的不同时间
    it('isSameDay should return true for same day with different times', () => {
      const date1 = new Date('2024-01-01T00:00:00')
      const date2 = new Date('2024-01-01T23:59:59')
      expect(isSameDay(date1, date2)).toBeTruthy()
    })
    // 边界情况：不同日期
    it('isSameDay should return false for different dates', () => {
      const date1 = new Date('2024-01-01')
      const date2 = new Date('2024-01-02')
      expect(isSameDay(date1, date2)).toBeFalsy()
    })
    // 边界情况：字符串格式
    it('isSameDay should handle string dates', () => {
      expect(isSameDay('2024-01-01', '2024-01-01')).toBeTruthy()
      expect(isSameDay('2024-01-01', '2024-01-02')).toBeFalsy()
    })
  })

  // describe('isWorkDay: ', () => {
  //   it(`isWorkDay(new Date('2022-02-19')) should return false`, () => {
  //     expect(isWorkday(new Date('2022-02-19'))).toBeFalsy()
  //   })
  //   it(`isWorkDay('2022-02-19') should return false`, () => {
  //     expect(isWorkday('2022-02-19')).toBeFalsy()
  //   })

  //   it(`isWorkDay(new Date('2022-02-20')) should return true`, () => {
  //     expect(isWorkday(new Date('2022-02-20'))).toBeTruthy()
  //   })
  //   it(`isWorkDay('2022-02-20') should return true`, () => {
  //     expect(isWorkday('2022-02-20')).toBeTruthy()
  //   })
  // })
})
