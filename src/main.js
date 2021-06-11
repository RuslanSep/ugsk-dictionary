import Vue from 'vue'
import App from './App.vue'
import './quasar'
import router from './router/index'

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router
}).$mount('#app')

Vue.config.errorHandler = function(err, vm, info) {
  console.log(`Error: ${err.toString()}\nInfo: ${info}`);
  document.getElementById("err").style.display = `Error: ${err.toString()}\nInfo: ${info}`;
}