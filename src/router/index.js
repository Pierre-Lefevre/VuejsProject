import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Learn from '@/components/Learn'
import Operation from '@/components/Operation'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
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
    }
  ]
})