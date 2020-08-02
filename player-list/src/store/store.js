import Vue from 'vue'
import Vuex from 'vuex'

import players from './modules/player'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    players
  }
})
