import axios from 'axios'

// 取消请求
let CancelToken = axios.CancelToken
let cancel

const cancelToken = new CancelToken(function executor(c) {
  cancel = c
})

export default {
  cancel,
  cancelToken
}
