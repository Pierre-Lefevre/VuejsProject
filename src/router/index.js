import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Learn from '@/components/Learn'
import Operation from '@/components/Operation'
import Score from '@/components/Score'
import Statistics from '@/components/Statistics'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/apprentissage',
      name: 'Learn',
      component: Learn
    },
    {
      path: '/apprentissage/operation/:id',
      name: 'OperationTable',
      component: Operation
    },
    {
      path: '/evaluation/operation',
      name: 'Operation',
      component: Operation
    },
    {
      path: '/score',
      name: 'Score',
      component: Score
    },
    {
      path: '/statistiques',
      name: 'Statistics',
      component: Statistics
    }
  ]
})
