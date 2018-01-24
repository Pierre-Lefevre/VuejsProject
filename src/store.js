import Vue from 'vue'
import Vuex from 'vuex'
import crypto from 'crypto-js'
import lsm from '@/components/localStorageManager'

const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'

Vue.use(Vuex)

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
    }
  },
  actions: {
    login ({commit}, data) {
      commit(LOGIN)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          let users = lsm.getValue('users')
          if (users === undefined) {
            reject(new Error('Aucun utilisateur.'))
          }
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
    user: state => {
      return state.user
    }
  }
})
