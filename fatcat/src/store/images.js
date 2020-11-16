import Vue from 'vue'

const images = {
  namespaced: true,
  state: {
    images: []
  },
  mutations: {
    add_to_images (state, image) {
      const indx = state.images.length
      Vue.set(state.images, indx, image)
    },
    remove_image (state, id) {
      Vue.set(state.images.splice(id, 1))
    }
  },
  actions: {
    uploadImage ({ commit }, data) {
      commit('add_to_images', data.image)
      // return new Promise(resolve, reject) => {

      // }
    },
    removeImage ({ commit }, data) {
      commit('remove_image', data.id)
    }
  },
  getters: {
    images: state => state.images
  }
}

export default images
