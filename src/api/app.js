import fetch from '../utils/fetch'
export default {
  getAsyncRoutes() {
    return fetch.get('/routes')
  }
}
