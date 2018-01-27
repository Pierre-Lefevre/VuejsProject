import store from '@/store/store'

// Middleware permettant au router de filtrer l'accès.
export default {
  // L'utilisateur ne doit pas être connecté, sinon redirection vers la page d'accueil.
  guest (to, from, next) {
    next(!store.getters.isLoggedIn ? true : {
      path: '/'
    })
  },

  // L'utilisateur doit être connecté, sinon redirection vers la page d'accueil.
  auth (to, from, next) {
    next(store.getters.isLoggedIn ? true : {
      path: '/'
    })
  }
}
