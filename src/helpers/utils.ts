const { toString } = Object.prototype

/**
 * 是否 Date 类型
 */
export const isDate = (val: any): val is Date => {
  return toString.call(val) === '[object Date]'
}
/**
 * 是否 Object 类型
 */
export const isObject = (val: any): val is Object => {
  return toString.call(val) === '[object Object]'
}
