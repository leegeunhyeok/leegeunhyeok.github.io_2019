import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'
import dataStore from './data-store'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$db = dataStore()

new Vue({
  render: h => h(App)
}).$mount('#app')
