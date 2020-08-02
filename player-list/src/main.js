// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './db/firebase'
import store from './store/store'
import Team from './components/Team.vue'
import { firestorePlugin } from 'vuefire'
import { BootstrapVue, IconsPlugin, TablePlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(TablePlugin)
Vue.use(firestorePlugin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {
    App,
    Team
  },
  template: '<App/>'
})
