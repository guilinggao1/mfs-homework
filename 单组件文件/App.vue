<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <router-view /> -->
    <test></test>
    <!-- <my-btn></my-btn> -->
  </div>
</template>

<script>
import Test from './components/Test.vue'
// import MyBtn from './components/Btn.vue'
export default {
  name: 'App',
  components: { Test }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
