import Vue from 'vue'
import Router from 'vue-router'
import analysis from '../views/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'analysis',
      component: analysis
    }
  ]
})
