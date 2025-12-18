import { isEmpty } from '../../validator/empty/isEmpty'
import { isNull } from '../../validator/type/isNull'
import { isObject } from '../../validator/type/isObject'
import { isUndefined } from '../../validator/type/isUndefined'

/**
 * @description: 递归过滤对象中的 null 和 undefined 值
 * @param {object} params - 要过滤的对象
 * @return {object} 过滤后的对象（会修改原对象）
 * @example
 * filterNull({ a: 1, b: null, c: { d: undefined } }) // { a: 1, c: {} }
 */
export const filterNull = (params: { [x: string]: any }) => {
  if (isEmpty(params)) {
    return params
  }
  if (!isObject(params)) {
    return params
  }
  for (const item in params) {
    // eslint-disable-next-line no-prototype-builtins
    if (params.hasOwnProperty(item)) {
      const temp = params[item]
      if (isObject(temp)) {
        params[item] = filterNull(temp)
      }
      if (isNull(temp) || isUndefined(temp)) {
        delete params[item]
      }
    }
  }
  return params
}
