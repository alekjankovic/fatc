import Vue from 'vue'
import Vuex from 'vuex'

import images from './images'
import albums from './albums'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    images,
    albums
    // other modules here ...
  }
})
