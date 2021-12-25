import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index'
import { parseHeaders } from './helpers/headers'
import { createError } from './helpers/error'

const xhr = (config: AxiosRequestConfig): AxiosPromise => {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers = {}, responseType, timeout } = config
    const request = new XMLHttpRequest()
    if (responseType) {
      request.responseType = responseType
    }
    if (timeout) {
      request.timeout = timeout
    }
    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = () => {
      // 网络错误 | 网络超时
      if (request.readyState !== 4 || request.status === 0) {
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
      handleResponse(response)
    }

    // 错误处理
    request.onerror = () => {
      reject(createError('Network Error', config, null, request))
    }
    // 超时处理
    request.ontimeout = () => {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
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
    const handleResponse = (response: AxiosResponse) => {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}

export default xhr
