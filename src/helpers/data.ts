import { isObject, isString } from './utils'

export const transformRequest = (data: any): any => {
  if (isObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

export function transformResponse(data: any): any {
  if (isString(data)) {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do nothing
    }
  }
  return data
}
