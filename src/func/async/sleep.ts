/**
 * @description: 延迟执行指定毫秒数（异步等待）
 * @param {number} ms - 要延迟的毫秒数
 * @returns {Promise<string>} 返回一个 Promise，延迟完成后 resolve 为空字符串
 * @example
 * await sleep(1000) // 等待 1 秒
 * sleep(500).then(() => console.log('延迟完成'))
 */
const sleep = (ms: number): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('')
    }, ms)
  })
}

export default sleep
