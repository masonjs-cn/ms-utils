/**
 * @description: 设置 Cookie
 * @param {string} name - Cookie 名称
 * @param {string} value - Cookie 值
 * @param {number} [days=0] - 过期天数，默认为 0（会话 Cookie）
 * @returns {void}
 * @example
 * setCookie('username', 'john', 7) // 设置 7 天后过期的 Cookie
 */
const setCookie = (name: string, value: string, days = 0): void => {
  const date = new Date()
  date.setDate(date.getDate() + days)
  document.cookie = `${name}=${value};expires=${date}`
}

/**
 * @description: 获取 Cookie 值
 * @param {string} name - Cookie 名称
 * @returns {string} Cookie 值，如果不存在返回空字符串
 * @example
 * getCookie('username') // 'john'
 * getCookie('nonexistent') // ''
 */
const getCookie = (name: string): string => {
  const arr = document.cookie.replace(/\s/g, '').split(';')

  for (let i = 0; i < arr.length; i++) {
    const tmpArr = arr[i].split('=')
    if (tmpArr[0] === name) {
      return decodeURIComponent(tmpArr[1])
    }
  }

  return ''
}

/**
 * @description: 删除 Cookie
 * @param {string} name - 要删除的 Cookie 名称
 * @returns {void}
 * @example
 * removeCookie('username')
 */
const removeCookie = (name: string): void => {
  // 设置已过期
  setCookie(name, '1', -1)
}

export { getCookie, setCookie, removeCookie }
