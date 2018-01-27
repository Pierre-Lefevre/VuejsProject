import Vue from 'vue'
import Vuex from 'vuex'
import crypto from 'crypto-js'
import lsm from '@/services/localStorageManager'

const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'

Vue.use(Vuex)

// Store de l'applciation.
export default new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem('token'),
    user: null
  },
  mutations: {
    [LOGIN] (state) {
      state.pending = true
    },
    [LOGIN_SUCCESS] (state, user) {
      state.isLoggedIn = true
      state.user = user
      state.pending = false
    },
    [LOGOUT] (state) {
      state.isLoggedIn = false
      state.user = null
    }
  },
  actions: {
    login ({commit}, data) {
      commit(LOGIN)

      // Renvoie une promesse permettant de savoir si la tentative de connexion a réussi ou non.
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Récupération de tous les utilisateurs.
          let users = lsm.getValue('users')
          if (users === undefined) {
            reject(new Error('Aucun utilisateur.'))
          }

          // Vérifie si les identifiants sont ceux d'un des utilisateurs existant.
          users.forEach((user) => {
            if (data.pseudo === user.pseudo && crypto.SHA256(data.password).toString(crypto.enc.Hex) === user.password) {
              localStorage.setItem('token', user.pseudo)
              commit(LOGIN_SUCCESS, user)
              resolve()
            }
          })
          reject(new Error('Pseudo ou mot de passe incorrect.'))
        }, 1000)
      })
    },
    logout ({commit}) {
      localStorage.removeItem('token')
      commit(LOGOUT)
    }
  },
  getters: {
    isLoggedIn: state => {
      return state.isLoggedIn
    },
    getUser: state => {
      return state.user
    }
  }
})
