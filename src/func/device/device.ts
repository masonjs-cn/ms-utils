type BrowserInfo = {
  name: string
  version: string
}

/**
 * @description: 获取当前浏览器的类型和版本信息
 * @returns {BrowserInfo} 返回包含浏览器名称和版本的对象
 * @example
 * getBrowserInfo() // { name: 'chrome', version: '120.0.0.0' }
 * getBrowserInfo() // { name: 'firefox', version: '121.0' }
 */
const getBrowserInfo = () => {
  const browser: BrowserInfo = { name: '', version: '' }
  let re: RegExpMatchArray | null
  const ua = navigator.userAgent.toLowerCase()

  if ((re = ua.match(/edge\/([\d.]+)/))) {
    browser.name = 'edge'
  } else if ((re = ua.match(/firefox\/([\d.]+)/))) {
    browser.name = 'firefox'
  } else if ((re = ua.match(/opera\/([\d.]+)/))) {
    browser.name = 'opera'
  } else if ((re = ua.match(/chrome\/([\d.]+)/))) {
    browser.name = 'chrome'
  } else if ((re = ua.match(/version\/([\d.]+).*safari/))) {
    browser.name = 'safari'
  }
  browser.version = re ? re[1] : ''

  return browser
}

export { getBrowserInfo }
