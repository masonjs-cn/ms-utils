import { isString } from '../../validator/type/isString'

/**
 * @description: 判断指定年份是否为闰年
 * @param {number} year - 要判断的年份
 * @returns {boolean} 如果是闰年返回 true，否则返回 false
 * @example
 * isLeapYear(2024) // true
 * isLeapYear(2023) // false
 */
const isLeapYear = (year: number): boolean => {
  if (0 === year % 4 && (year % 100 !== 0 || year % 400 === 0)) return true
  return false
}

/**
 * @description: 计算从当前时间到指定结束时间的倒计时
 * @param {string | Date} endTime - 结束时间（日期字符串或 Date 对象）
 * @returns {string} 返回格式化的倒计时字符串（如 "1天 2小时 30分钟 45秒"）
 * @example
 * remainTime('2024-12-31 23:59:59') // '365天 0小时 0分钟 0秒'
 */
const remainTime = (endTime: string | Date): string => {
  const startDate = new Date() //开始时间
  const endDate = new Date(endTime) //结束时间
  const t = endDate.getTime() - startDate.getTime() //时间差
  let d = 0,
    h = 0,
    m = 0,
    s = 0
  if (t >= 0) {
    d = Math.floor(t / 1000 / 3600 / 24)
    h = Math.floor((t / 1000 / 60 / 60) % 24)
    m = Math.floor((t / 1000 / 60) % 60)
    s = Math.floor((t / 1000) % 60)
  }
  return `${d}天 ${h}小时 ${m}分钟 ${s}秒`
}

/**
 * @description: 判断两个日期是否为同一天
 * @param {Date | string} date1 - 第一个日期
 * @param {Date | string} date2 - 第二个日期
 * @returns {boolean} 如果是同一天返回 true，否则返回 false
 * @example
 * isSameDay(new Date('2024-01-01'), new Date('2024-01-01')) // true
 * isSameDay('2024-01-01', '2024-01-02') // false
 */
const isSameDay = (date1: Date | string, date2: Date | string) => {
  if (isString(date1)) date1 = new Date(date1)
  if (isString(date2)) date2 = new Date(date2)
  const date1Year = date1.getFullYear(),
    date1Month = date1.getMonth() + 1,
    date1Date = date1.getDate(),
    date2Year = date2.getFullYear(),
    date2Month = date2.getMonth() + 1,
    date2Date = date2.getDate()

  return date1Date === date2Date && date1Month === date2Month && date1Year === date2Year
}

/**
 * 判断传入日期是否为工作日
 * @param date 日期字符串、日期对象
 * @returns bool
 */
// const isWorkday = (date: string | Date) => {
//   date = new Date(date);
//   return date.getDay() < 5;
// };
export { isLeapYear, remainTime, isSameDay }
