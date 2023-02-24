import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import About from '../components/About'
import User from '../components/User'

Vue.use(Router)

export default new Router({
  mode: 'history',//去掉url的hash的方式
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      component: Home,

    },
    {
      path: '/about',
      component: About,

    },
    {
      name: 'user',
      path: '/user/:id',
      component: User,

    }
  ]
})
