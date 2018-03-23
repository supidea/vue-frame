import fetch from '../utils/fetch'
export default {
  getPointTree(data) {
    return fetch.get('/point/tree', {params: data})
  }
}
