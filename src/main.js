/* eslint-disable no-new */

import Vue from 'vue'
import App from './App'
import router from '@/router'
import store from '@/store/store'

Vue.config.productionTip = false

// Création de l'instance de Vue.
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
