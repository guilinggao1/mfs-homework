// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import NotFound from './components/NotFound'
import Home from './components/Home'
import About from './components/About'
// import App from './App'
// import router from './router'

Vue.config.productionTip = false

// const NotFound = { template: `<p>Page not founf</p>` }
// const Home = { template: `<div><a href='/about'>about</a><p>home page</p></div>` }
// const About = { template: `<div><a href='/'>home</a><p>about page</p></div>` }
/* eslint-disable no-new */

const routes = {
  '/': Home,
  '/about': About
}

new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent: function () {
      return routes[this.currentRoute] || NotFound
    }
  },
  render: function (h) {
    return h(this.ViewComponent)
  }
  // router,
  // components: { App },
  // template: '<App/>'
})
// global.app = app
