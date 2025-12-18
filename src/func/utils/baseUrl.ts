import { ImportMetaEnv } from '../../constant/types'
import { RedirectionType } from '../../constant/enums'
import { isEmpty } from '../../validator/empty/isEmpty'

/**
 * @description: 根据配置类型获取动态基础 URL（接口、重定向等）
 * @param {RedirectionType} [key=RedirectionType.APIURL] - URL 类型，默认为 APIURL
 * @param {ImportMetaEnv | NodeJS.ProcessEnv} env - 环境变量对象
 * @returns {string} 返回对应的基础 URL 字符串
 * @example
 * baseUrl(RedirectionType.APIURL, process.env)
 * baseUrl(RedirectionType.DIREACTIVEURL, import.meta.env)
 */
export const baseUrl = (key = RedirectionType.APIURL, env: ImportMetaEnv | NodeJS.ProcessEnv) => {
  const value = document.body.getAttribute(key)
  switch (key) {
    case RedirectionType.APIURL:
      return isEmpty(value)
        ? env['VUE_APP_FETCH_BASE_URL']
          ? env.VUE_APP_FETCH_BASE_URL
          : env.VITE_APP_FETCH_BASE_URL
        : `//${value}`
    case RedirectionType.DIREACTIVEURL:
      return isEmpty(value)
        ? env['VUE_APP_REDIRECT_BASE_URL']
          ? env.VUE_APP_REDIRECT_BASE_URL
          : env.VITE_APP_REDIRECT_BASE_URL
        : `${value}`
    case RedirectionType.ENTRYURL:
      return isEmpty(value)
        ? env['VUE_APP_ONLYOFFICE_BASE_URL']
          ? env.VUE_APP_ONLYOFFICE_BASE_URL
          : env.VITE_APP_ONLYOFFICE_BASE_URL
        : `//${value}`
    case RedirectionType.PRINTURL:
      return isEmpty(value) ? (env['VUE_APP_PRINT_URL'] ? env.VUE_APP_PRINT_URL : env.VITE_APP_PRINT_URL) : `//${value}`
    case RedirectionType.MICROURL:
      return isEmpty(value)
        ? env['VUE_APP_MICRO_BASE_URL']
          ? env.VUE_APP_MICRO_BASE_URL
          : env.VITE_APP_MICRO_BASE_URL
        : `//${value}`
    default:
      return '/'
  }
}
