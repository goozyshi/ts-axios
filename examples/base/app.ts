import axios from '../../src'

/**
 * POST - 返回then处理
 */
axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 11,
    b: 22
  }
}).then((res) => {
  console.log(res)
})

axios({
  method: 'post',
  url: '/base/post',
  responseType: 'json',
  data: {
    a: 3,
    b: 4
  }
}).then((res) => {
  console.log(res)
})

