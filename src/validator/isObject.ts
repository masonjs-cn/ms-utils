export const isObject = (value: any) => {
  return Object.prototype.toString.call(value) === '[object Object]'
}
