import { AxiosRequestConfig, AxiosPromise } from './types'
import { parseHeaders } from './helpers/headers'

const xhr = (config: AxiosRequestConfig): AxiosPromise => {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers = {}, responseType } = config
    const request = new XMLHttpRequest()
    if (responseType) {
      request.responseType = responseType
    }
    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = () => {
      if (request.readyState !== 4) {
        return
      }
      const resonseHeader = parseHeaders(request.getAllResponseHeaders())
      const responseData =
        responseType && responseType !== 'text' ? request.response : request.responseText
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: resonseHeader,
        config,
        request
      }
      resolve(response)
    }
    Object.keys(headers).forEach(name => {
      // data 为空的时候，请求 header 默认配置 Content-Type 是没有意义
      if (data === null && name.toLowerCase() === 'content-type') {
        Reflect.deleteProperty(headers, name)
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)
  })
}

export default xhr
