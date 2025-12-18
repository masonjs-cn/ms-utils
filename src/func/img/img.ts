/**
 * @description: 将图片文件转换为 Base64 字符串
 * @param {File} originFileObj - 要转换的图片文件对象
 * @param {(r: string | ArrayBuffer | null) => void} callback - 转换完成后的回调函数，参数为 Base64 字符串
 * @returns {void}
 * @example
 * convertImgStreamToBase64(file, (base64) => {
 *   console.log(base64) // 'data:image/png;base64,...'
 * })
 */
const convertImgStreamToBase64 = (originFileObj: File, callback: (r: string | ArrayBuffer | null) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(originFileObj)
}

/**
 * @description: 下载图片流文件（适用于需要认证的接口返回的图片流）
 * @param {string} url - 图片的 URL 地址
 * @param {any} [options={}] - 请求选项，可包含 credentials、headers 等
 * @returns {void}
 * @example
 * downloadImgStream('https://api.example.com/image', {
 *   headers: { Authorization: 'Bearer token' }
 * })
 */
const downloadImgStream = (() => {
  let filename = 'default'
  let extra = ''
  const fn = (url: string, options: any = {}): void => {
    const defaultOptions = {
      credentials: 'include',
      headers: {
        Authorization: localStorage && localStorage.getItem('token')
      },
      ...options
    }
    fetch(url, defaultOptions)
      .then((res: Response) => {
        const fileHeader = res.headers.get('content-disposition')
        if (fileHeader) {
          const ascllFileName = fileHeader.split('=')[1].split('.')[0]
          extra = fileHeader.split('=')[1].split('.')[1]

          filename = decodeURI(ascllFileName)
        }
        return res.blob()
      })
      .then((blob: Blob) => URL.createObjectURL(blob))
      .then((downloadUrl: string) => {
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = `${filename}.${extra}`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
  }
  return fn
})()

export { convertImgStreamToBase64, downloadImgStream }
