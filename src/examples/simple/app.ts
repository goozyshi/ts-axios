import axios from '../../index'

axios({
  method: 'get',
  url: '/simple/get',
  params: {
    a: 1,
    b: 2
  }
})
console.log(`请求ing……`)
