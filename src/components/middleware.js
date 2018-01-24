import user from './auth'

export default {
  all (to, from, next) {
    next()
  },
  guest (to, from, next) {
    next(!user.check())
  },
  auth (to, from, next) {
    next(user.check() ? true : {
      path: '/',
      query: {
        redirect: to.name
      }
    })
  }
}
