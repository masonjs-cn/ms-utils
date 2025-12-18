/**
 * @description: 在新的标签页中打开链接
 * @param {string} url - 要打开的链接地址
 * @param {string} [target='_blank'] - 打开的目标，默认为 "_blank"
 * @returns {void}
 * @example
 * openLink('https://www.example.com')
 * openLink('https://www.example.com', '_self')
 */
export const openLink = (url: string, target = '_blank'): void => {
  if (!window) return // 检查是否在浏览器环境中

  const anchor = document.createElement('a')
  anchor.setAttribute('href', url)
  anchor.setAttribute('target', target)
  anchor.setAttribute('rel', 'noreferrer noopener')
  anchor.setAttribute('id', 'external')

  // 移除已有的相同 ID 的链接（如果存在）
  const existingLink = document.getElementById('external')
  if (existingLink) {
    document.body.removeChild(existingLink)
  }

  // 添加新的链接并模拟点击
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor) // 点击后立即移除链接
}
