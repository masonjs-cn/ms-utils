/**
 * @description: 生成符合 UUID v4 格式的随机字符串
 * @returns {string} 返回格式为 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' 的 UUID 字符串
 * @example
 * uuid() // '550e8400-e29b-41d4-a716-446655440000'
 */
const uuid = (): string => {
  const random: (multiplier: number) => number = (multiplier: number) => {
    return Math.floor(Math.random() * multiplier)
  }

  const hexadecimal: (index: number) => string = (index: number) => {
    return (index === 19 ? random(4) + 8 : random(16)).toString(16)
  }

  const nexttoken: (index: number) => string = (index: number) => {
    if (index === 8 || index === 13 || index === 18 || index === 23) {
      return '-'
    } else if (index === 14) {
      return '4'
    } else {
      return hexadecimal(index)
    }
  }

  const generate: () => string = () => {
    let uuid = ''

    while (uuid.length < 36) {
      uuid += nexttoken(uuid.length)
    }
    return uuid
  }

  return generate()
}

export default uuid
