import { randomColor, randomName, randomNum, randomPhone } from '..'
import { isPhone } from '..'

describe('random: ', () => {
  describe('randomColor: ', () => {
    it(`/^#[0-9a-fA-F]{6}$/.test(randomColor()) should return true`, () => {
      expect(/^#[0-9a-fA-F]{6}$/.test(randomColor())).toBeTruthy()
    })

    // 边界情况：多次调用应该返回不同的值（概率测试）
    it('randomColor should return different values on multiple calls', () => {
      const colors = Array.from({ length: 10 }, () => randomColor())
      const uniqueColors = new Set(colors)
      // 虽然理论上可能相同，但10次调用相同的概率极低
      expect(uniqueColors.size).toBeGreaterThan(1)
    })
  })

  describe('randomNum: ', () => {
    it(`1 <= randomNum(1,10) <= 10 should return ture`, () => {
      const received = randomNum(1, 10)
      expect(received).toBeGreaterThanOrEqual(1)
      expect(received).toBeLessThanOrEqual(10)
    })

    // 边界情况：相同的最小值和最大值
    it('randomNum should handle same min and max', () => {
      expect(randomNum(5, 5)).toBe(5)
    })

    // 边界情况：负数范围
    it('randomNum should handle negative numbers', () => {
      const received = randomNum(-10, -1)
      expect(received).toBeGreaterThanOrEqual(-10)
      expect(received).toBeLessThanOrEqual(-1)
    })

    // 边界情况：包含0的范围
    it('randomNum should handle range including zero', () => {
      const received = randomNum(-5, 5)
      expect(received).toBeGreaterThanOrEqual(-5)
      expect(received).toBeLessThanOrEqual(5)
    })

    // 错误情况：无效参数
    it('randomNum should throw error for invalid min parameter', () => {
      expect(() => randomNum(NaN, 10)).toThrow(TypeError)
      expect(() => randomNum('invalid' as any, 10)).toThrow(TypeError)
    })

    it('randomNum should throw error for invalid max parameter', () => {
      expect(() => randomNum(1, NaN)).toThrow(TypeError)
      expect(() => randomNum(1, 'invalid' as any)).toThrow(TypeError)
    })

    it('randomNum should throw error when min > max', () => {
      expect(() => randomNum(10, 1)).toThrow(Error)
    })
  })

  describe('randomName: ', () => {
    const name = randomName()
    const lastName = `赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳酆鲍史唐费廉岑薛雷贺倪汤滕殷罗毕郝邬安常乐于时傅皮卞齐康伍余元卜顾孟平黄和穆萧尹姚邵湛汪祁毛禹狄米贝明臧计伏成戴谈宋茅庞熊纪舒屈项祝董梁杜阮蓝闵席季`
    it(`name.length === 2 || name.length === 3 should return true`, () => {
      expect(name.length === 2 || name.length === 3).toBeTruthy()
    })

    it(`lastName.match(name.substring(0,1)) !== null should return true`, () => {
      expect(lastName.match(name.substring(0, 1)) !== null).toBeTruthy()
    })
  })

  describe('randomPhone: ', () => {
    it(`isPhone(randomPhone()) should return true`, () => {
      expect(isPhone(randomPhone())).toBeTruthy()
    })
  })
})
