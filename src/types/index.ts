// 支持传入的 Method
export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'patch'
  | 'PATCH'

// 导出TS配置
export interface AxiosRequestConfig {
  url: string
  method?: Method
  headers?: any
  data?: any
  params?: any
}
