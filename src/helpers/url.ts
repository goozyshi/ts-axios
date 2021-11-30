import { isDate, isObject } from './utils'

/**
 * encode编码
 */
const encode = (value: string): string => {
  return encodeURIComponent(value)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

/**
 * 拼接params参数到url地址
 */
export const buildURL = (url: string, params?: any): string => {
  if (!params) {
    return url
  }
  const parts: string[] = []
  Object.keys(params).map(key => {
    const value = params[key]
    if (value === null || typeof value === 'undefined') {
      return
    }
    let valueArr: string[]
    if (Array.isArray(value)) {
      valueArr = value
      key += `[]`
    } else {
      valueArr = [value]
    }
    valueArr.map(value => {
      if (isDate(value)) {
        value = value.toISOString()
      } else if (isObject(value)) {
        value = JSON.stringify(value)
      }
      parts.push(`${encode(key)}=${encode(value)}`)
    })
  })
  let serializedParams = parts.join('&')
  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}
