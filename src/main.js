import Vue from 'vue'
import App from './App.vue'



new Vue({
  render: (h) => h(App)
}).$mount('#app')
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)