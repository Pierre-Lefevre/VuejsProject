import Vue from 'vue'
import Router from 'vue-router'
import Guard from '@/services/middleware'
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
      beforeEnter: Guard.guest
    },
    {
      path: '/inscription',
      name: 'SignUp',
      component: SignUp,
      beforeEnter: Guard.guest
    },
    {
      path: '/apprentissage',
      name: 'Learn',
      component: Learn,
      beforeEnter: Guard.auth
    },
    {
      path: '/apprentissage/operation/:id',
      name: 'OperationTable',
      component: Operation,
      beforeEnter: Guard.auth
    },
    {
      path: '/evaluation/operation',
      name: 'Operation',
      component: Operation,
      beforeEnter: Guard.auth
    },
    {
      path: '/score',
      name: 'Score',
      component: Score,
      beforeEnter: Guard.auth
    },
    {
      path: '/statistiques',
      name: 'Statistics',
      component: Statistics,
      beforeEnter: Guard.auth
    },
    {
      path: '*',
      component: NotFoundComponent
    }
  ]
})
