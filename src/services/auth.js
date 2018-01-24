import store from '@/store/store'

export default {
  user () {
    return store.getters.user
  },
  check () {
    return store.getters.isLoggedIn
  },
  login (data) {
    return store.dispatch('login', data)
  },
  logout () {
    store.dispatch('logout')
  }
}
