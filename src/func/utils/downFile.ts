import { isBlob } from '../../validator/type/isBlob'

/**
 * @description: 下载 Blob 文件
 * @param {Blob} value - 要下载的 Blob 对象
 * @param {string} filename - 文件名（不含扩展名）
 * @param {string} type - 文件扩展名（不含点号）
 * @returns {boolean} 下载成功返回 true，失败返回 false
 * @throws {Error} 如果 value 不是 Blob 对象会在控制台输出错误并返回 false
 * @example
 * const blob = new Blob(['content'], { type: 'text/plain' })
 * downFile(blob, 'document', 'txt') // 下载为 document.txt
 */
export const downFile = (value: Blob, filename: string, type: string): boolean => {
  if (!isBlob(value)) {
    console.error('值不是流!')
    return false
  }
  const blob = new Blob([value], {
    type: 'application/vnd.ms-excel;charset=utf-8'
  })
  let link: null | HTMLAnchorElement
  link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.setAttribute('download', `${filename}.${type}`)
  link.click()
  link = null
  return true
}
