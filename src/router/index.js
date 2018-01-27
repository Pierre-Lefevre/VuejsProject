import Vue from 'vue'
import Router from 'vue-router'
import guards from '@/services/guards'
import Home from '@/components/Home'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import Learn from '@/components/Learn'
import Operation from '@/components/Operation'
import Score from '@/components/Score'
import Statistics from '@/components/Statistics'
import NotFoundComponent from '@/components/NotFoundComponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/connexion/:pseudo?',
      name: 'SignIn',
      component: SignIn,
      beforeEnter: guards.guest
    },
    {
      path: '/inscription',
      name: 'SignUp',
      component: SignUp,
      beforeEnter: guards.guest
    },
    {
      path: '/apprentissage',
      name: 'Learn',
      component: Learn,
      beforeEnter: guards.auth
    },
    {
      path: '/apprentissage/operation/:id',
      name: 'OperationTable',
      component: Operation,
      beforeEnter: guards.auth
    },
    {
      path: '/evaluation/operation',
      name: 'Operation',
      component: Operation,
      beforeEnter: guards.auth
    },
    {
      path: '/score',
      name: 'Score',
      component: Score,
      beforeEnter: guards.auth
    },
    {
      path: '/statistiques',
      name: 'Statistics',
      component: Statistics,
      beforeEnter: guards.auth
    },
    {
      path: '*',
      component: NotFoundComponent
    }
  ]
})
