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

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: 'Accueil'
      }
    },
    {
      path: '/connexion/:pseudo?',
      name: 'SignIn',
      component: SignIn,
      beforeEnter: guards.guest,
      meta: {
        title: 'Connexion'
      }
    },
    {
      path: '/inscription',
      name: 'SignUp',
      component: SignUp,
      beforeEnter: guards.guest,
      meta: {
        title: 'Inscription'
      }
    },
    {
      path: '/apprentissage',
      name: 'Learn',
      component: Learn,
      beforeEnter: guards.auth,
      meta: {
        title: 'Apprentissage'
      }
    },
    {
      path: '/apprentissage/operation/:id',
      name: 'OperationTable',
      component: Operation,
      beforeEnter: guards.auth,
      meta: {
        title: 'Opérations'
      }
    },
    {
      path: '/evaluation/operation',
      name: 'Operation',
      component: Operation,
      beforeEnter: guards.auth,
      meta: {
        title: 'Opérations'
      }
    },
    {
      path: '/score',
      name: 'Score',
      component: Score,
      beforeEnter: guards.auth,
      meta: {
        title: 'Score'
      }
    },
    {
      path: '/statistiques',
      name: 'Statistics',
      component: Statistics,
      beforeEnter: guards.auth,
      meta: {
        title: 'Statistiques'
      }
    },
    {
      path: '*',
      component: NotFoundComponent,
      meta: {
        title: '404'
      }
    }
  ]
})

// Permet de modifier la balise 'title' de chaque page.
router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title)
  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title + ' - Tables de multiplication'
  }
  next()
})

export default router
