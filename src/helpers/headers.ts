import { isObject } from './utils'

const normalizeHeaderName = (headers: any, normalizedName: string): void => {
  if (!headers) {
    return
  }
  Object.keys(headers).map(name => {
    if (name !== normalizedName && name.toUpperCase() !== normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      Reflect.deleteProperty(headers, name)
    }
  })
}

export const processHeaders = (headers: any, data: any): any => {
  normalizeHeaderName(headers, 'Content-Type')
  if (isObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

/**
 *
 * 'connection: keep-alive\r\ncontent-length: 2' =>
 *  connection: keep-alive
 *  content-length: 2
 */
export const parseHeaders = (headers: string): any => {
  let headerObj = Object.create(null)
  if (!headers) {
    return headerObj
  }
  headers.split('\r\n').map(keyValueStr => {
    let [key, value] = keyValueStr.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    value = value?.trim()
    headerObj[key] = value
  })
  return headerObj
}
