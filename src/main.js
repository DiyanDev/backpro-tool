import Vue from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
// import './assets/nn.js'
// import './assets/matrix.js'

// var {Matrix} = require('./assets/matrix.js');
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
