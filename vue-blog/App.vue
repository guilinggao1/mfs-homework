<template>
  <div id="app" class="container">
    <MainNav></MainNav>
    <router-view />
  </div>
</template>

<script>
import MainNav from './components/MainNav.vue'
export default {
  name: 'App',
  components: { MainNav }
}
</script>

<style>
@import "./assets/base.css";

ol,
ul,
body {
  margin: 0;
  padding: 0;
  text-decoration: none;
}

ol,
ul {
  list-style: none;
}

.container {
  width: 80%;
  margin: 0 auto;
}
</style>
