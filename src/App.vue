<template>
  <div id="app">
    <div class="container text-center">
      <p class="text-white mb-4">
        <img class="mx-auto" alt="Vue logo" src="./assets/logo.png">
        A simple Backpropagation tool with variable network nodes. Developed with Vuejs & Tailwindcss.
      </p>
    </div>
    <backPropagation msg="Welcome to Your Vue.js App"/>
    <p class="text-white my-3">
      Copyright © Handcrafted with ❤ by <a class="text-teal-500" href="mailto:hello@diyan.dev">Diyan Nedelchev</a>
    </p>
  </div>
</template>

<script>
import backPropagation from './components/backPropagation.vue';

export default {
  name: 'App',
  components: {
    backPropagation,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body{
  background: url(./assets/bg.jpg) no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
</style>
