import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BaseButton from "./components/BaseButton"
import Breadcrumbs from "./components/Breadcrumbs"

Vue.config.productionTip = false

Vue.component("BaseButton", BaseButton)
Vue.component("Breadcrumbs", Breadcrumbs)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


