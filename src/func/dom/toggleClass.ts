/**
 * @description: 添加或删除元素的 CSS 类名
 * @param {boolean} add - 是否添加类名，true 为添加，false 为删除
 * @param {string} className - 要操作的类名
 * @param {HTMLElement} [element] - 要操作的 DOM 元素，默认为 document.body
 * @returns {void}
 * @example
 * toggleClass(true, 'active', document.getElementById('myElement'))
 * toggleClass(false, 'hidden')
 */
export const toggleClass = (add: boolean, className: string, element?: HTMLElement): void => {
  // 检查是否在浏览器环境中
  if (!window) return

  // 获取目标元素，默认为 body
  const targetElement = element || document.body
  const { className: currentClassName } = targetElement

  // 处理类名
  let updatedClassName: string

  if (add) {
    // 如果添加类名，拼接并去掉多余的空格
    updatedClassName = `${currentClassName} ${className}`.trim()
  } else {
    // 如果删除类名，使用正则表达式移除指定类名
    updatedClassName = currentClassName.replace(new RegExp(`(^|\\s)${className}(\\s|$)`, 'g'), ' ').trim()
  }

  // 更新元素的类名
  targetElement.className = updatedClassName
}
