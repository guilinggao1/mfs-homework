// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  // template: '<App/>'
  template: `
  <div>
  <router-link to='/'>home</router-link>
  <router-link to='/about'>about</router-link>
  <router-view />
  <button @click='btnClick'>click me</button>
  </div>
  `,
  methods: {
    btnClick: function () {
      router.push({
        name: 'user',
        params: {
          id: 122
        }
      })
    }
  }
})
