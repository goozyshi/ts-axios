import { AxiosResponse } from './types/index'
import { AxiosRequestConfig, AxiosPromise } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/headers'

const axios = (config: AxiosRequestConfig): AxiosPromise => {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}
const processConfig = (config: AxiosRequestConfig): void => {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

const transformUrl = (config: AxiosRequestConfig): string => {
  const { url, params } = config
  return buildURL(url, params)
}

const transformRequestData = (config: AxiosRequestConfig): string => {
  return transformRequest(config.data)
}

const transformHeaders = (config: AxiosRequestConfig): any => {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

const transformResponseData = (res: AxiosResponse): AxiosResponse => {
  res.data = transformResponse(res.data)
  return res
}
export default axios
