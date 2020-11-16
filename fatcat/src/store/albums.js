import Vue from 'vue'

const albums = {
  namespaced: true,
  state: {
    albums: [],
    albumsIds: [],
    album: null,
    poster: null
  },
  mutations: {
    add_new_album (state, name) {
      const indx = state.albums.length
      const uniqueId = state.albumsIds.length + 1 // because we don't have real database

      const newAlbum = {
        id: uniqueId,
        name: name,
        postersIds: [],
        posters: []
      }

      Vue.set(state.albums, indx, newAlbum)
      state.albumsIds.push(uniqueId) // keep track of unique ids - database simulation
    },
    set_album (state, album) {
      state.album = album
    },
    delete_album (state, index) {
      Vue.set(state.albums.splice(index, 1))
    },
    add_to_album (state, data) {
      if (state.album.id === data.albumId * 1) {
        const indx = state.album.posters.length
        const uniquePosterId = state.album.postersIds.length + 1

        const newPoster = {
          id: uniquePosterId,
          poster: data.poster,
          generated: false
        }

        Vue.set(state.album.posters, indx, newPoster)
        state.album.postersIds.push(uniquePosterId)
      } else {
        // log error
      }
    },
    remove_poster (state, id) {
      let indx
      for (let i = 0; i < state.album.posters.length; i++) {
        if (state.album.posters[i].id === id) {
          indx = i
          Vue.set(state.album.posters.splice(indx, 1))
          break
        }
      }
    },
    create_poster (state, poster) {
      for (let i = 0; i < state.albums.length; i++) {
        if (state.albums[i].id === poster.albumId) {
          state.album = state.albums[i]
          const indx = state.album.posters.length
          const uniquePosterId = state.album.postersIds.length + 1

          const newPoster = {
            id: uniquePosterId,
            poster: poster.imageSrc,
            title: poster.title,
            description: poster.description,
            background: poster.background,
            generated: true
          }

          Vue.set(state.album.posters, indx, newPoster)
          state.album.postersIds.push(uniquePosterId)
          break
        }
      }
    },
    edit_poster (state, poster) {
      for (let i = 0; i < state.albums.length; i++) {
        if (state.albums[i].id === poster.albumId * 1) {
          state.album = state.albums[i]

          for (let j = 0; j < state.album.posters.length; j++) {
            if (state.album.posters[j].id === poster.posterid) {
              state.poster = state.album.posters[j]

              state.poster.imageSrc = poster.imageSrc
              state.poster.tile = poster.title
              state.poster.description = poster.description
              state.poster.background = poster.background
              break
            }
          }
        }
      }
    },
    set_poster (state, poster) {
      state.poster = poster
    }
  },
  actions: {
    addNewAlbum ({ commit }, data) {
      // check if name already exists
      let isExist = false
      const existingAlbums = this.getters['albums/albums']
      for (let i = 0; i < existingAlbums.length; i++) {
        if (existingAlbums[i].name === data.name) {
          isExist = true
          break
        }
      }

      if (!isExist) {
        commit('add_new_album', data.name)
      }

      return { isExist: isExist }
    },
    getAlbum ({ commit }, data) {
      const existingAlbums = this.getters['albums/albums']
      for (let i = 0; i < existingAlbums.length; i++) {
        if (existingAlbums[i].id === data.id * 1) {
          commit('set_album', existingAlbums[i])
          break
        }
      }
    },
    deleteAlbum ({ commit }, data) {
      const existingAlbums = this.getters['albums/albums']
      for (let i = 0; i < existingAlbums.length; i++) {
        if (existingAlbums[i].id === data.id * 1) {
          commit('delete_album', i)
          break
        }
      }
    },
    uploadPoster ({ commit }, data) {
      commit('add_to_album', data)
    },
    removePoster ({ commit }, data) {
      commit('remove_poster', data.id)
    },
    createPoster ({ commit }, data) {
      data.poster.generated = true

      if (data.poster.posterid * 1 > 0) {
        commit('edit_poster', data.poster)
      } else {
        commit('create_poster', data.poster)
      }
    },
    setPoster ({ commit }, data) {
      const album = this.getters['albums/album']
      for (let i = 0; i < album.posters.length; i++) {
        if (album.posters[i].id === data.id * 1) {
          commit('set_poster', album.posters[i])
          break
        }
      }
    }
  },
  getters: {
    albums: state => state.albums,
    album: state => state.album,
    poster: state => state.poster
  }
}

export default albums
