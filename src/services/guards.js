import utils from '@/services/utils'
import store from '@/store/store'
import am from '@/services/achievementsManager'
import { eventBus } from '@/services/eventBus'

// Intercepteurs utilisés par l'application.
export default {

  // L'utilisateur ne doit pas être connecté, sinon redirection vers la page d'accueil.
  guest (to, from, next) {
    next(!store.getters.isLoggedIn ? true : {name: 'Home'})
  },

  // L'utilisateur doit être connecté, sinon redirection vers la page d'accueil.
  auth (to, from, next) {
    next(store.getters.isLoggedIn ? true : {name: 'Home'})
  },

  // Contrôle, avant le rendu du composant Operation, si le paramètre 'id', s'il existe, est bien un nombre compris entre 1 et 10.
  operation (to, from, next) {
    let id = to.params.id
    if (id !== undefined) {
      id = parseInt(id)
      if (id >= 1 && id <= 10) {
        next()
      } else {
        am.unlockAchievement('niceTry')
        next({name: 'Learn'})
      }
    } else {
      if (!utils.canAccessTest()) {
        eventBus.$emit('alert', {type: 'error', message: 'Tu dois t\'entraîner davantage !'})
        next({name: 'Home'})
      } else {
        next()
      }
    }
  }
}
