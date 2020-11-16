<template lang="html">
  <q-page class="p-2">
    <div class="main-page">
      <div class="flex justify-between">
        <h1 class="text-primary text-h4 q-mt-sm"><span>{{ album ? album.name : 'Album not found' }}</span></h1>
        <div class="q-pt-md">
          <q-btn class="q-mr-sm" color="primary" filled label="Create Poster" icon="create" :to="'/posters/create-poster'"/>
          <q-btn color="negative" filled label="Delete Album" icon="remove" v-on:click="actions.deleteAlbumModal = true"/>
        </div>
      </div>

      <div class="row">
        <div class="col-12 q-pa-md">
          <template v-if="album">

            <div class="q-gutter-md row items-start">

              <div style="width: 150px">
                <q-file v-model="fileInput" color="teal" filled label="Add Posters">
                  <template v-slot:prepend>
                    <q-icon name="add" />
                  </template>
                </q-file>
              </div>

              <q-img
                v-for="(item, index) in albumPostersEncoded"
                :src="item.posterEncoded"
                :key="'image_' + index"
                :style="{ backgroundColor: item.background , width:'150px'}"
                :ratio="1"
                basic
                :contain="item.generated"
                spinner-color="white"
                class="rounded-borders"
                v-bind:img-name="item.name"
              >
                <div class="absolute-top-right cursor-pointer" v-on:click="removePoster(item.posterid)">
                  X
                </div>
                <div class="absolute-bottom" v-if="item.generated">
                  {{ item.title }}
                </div>
                <div
                  class="absolute-top-left cursor-pointer"
                  clickable
                  v-if="item.generated">
                  <router-link :to="'/posters/edit-poster/' + item.posterid" class="text-white">
                    Edit
                  </router-link>
                </div>
              </q-img>

            </div>

          </template>
          <template v-else>
            <span class="text-primary text-h5 q-mt-sm">
              Album not found
            </span>
          </template>

        </div>
      </div>

      <q-dialog
        ref="confirmDeleteAlbum"
        v-model="actions.deleteAlbumModal"
        >
        <q-card class="q-dialog-plugin">
          <q-card-section>
            <div class="text-h6 text-negative">Delete this album?</div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn color="primary" label="OK" v-on:click="deleteAlbum()" />
            <q-btn color="primary" label="Cancel" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog
        ref="confirmDeleteAlbumDone"
        v-model="actions.deleteAlbumModalDone"
        >
        <q-card class="q-dialog-plugin">
          <q-card-section>
            <div class="text-h6 text-negative">Album deleted</div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn :to="'/albums'" color="primary" label="OK" />
          </q-card-actions>
        </q-card>
      </q-dialog>

    </div>
  </q-page>

</template>

<script>
export default {
  name: 'Album',
  data () {
    return {
      id: this.$route.params.id,
      album: null,
      albumPostersEncoded: [],
      actions: {
        deleteAlbumModal: false,
        deleteAlbumModalDone: false
      },
      fileInput: null,
      helpers: {
        tempImgSrc: '',
        tempImgEncoded: '',
        tempImgId: null
      }
    }
  },
  created () {
    this.getAlbum()
  },
  watch: {
    fileInput: function (upFile) {
      this.uploadPoster(upFile)
    }
  },
  methods: {
    getAlbum () {
      this.$store.dispatch('albums/getAlbum', { id: this.id }).then((res) => {
        this.album = this.$store.getters['albums/album']
        this.reloadPosters()
      })
    },
    deleteAlbum () {
      this.$refs.confirmDeleteAlbum.hide()
      this.$store.dispatch('albums/deleteAlbum', { id: this.id }).then((res) => {
        this.actions.deleteAlbumModalDone = true
      })
    },
    uploadPoster (upFile) {
      this.$store.dispatch('albums/uploadPoster', { poster: upFile, albumId: this.id }).then(() => {
        this.reloadPosters()
      })
    },
    reloadPosters () {
      this.album = this.$store.getters['albums/album']
      console.log('Album', this.album)

      this.albumPostersEncoded = this.album.posters.map((x) => {
        const res = {
          posterid: x.id,
          posterEncoded: '',
          generated: x.generated,
          title: x.title,
          background: x.background
        }
        if (x.generated) {
          res.posterEncoded = x.poster
        } else {
          const reader = new FileReader()
          reader.onload = function (e) {
            res.posterEncoded = e.target.result
          }
          reader.readAsDataURL(x.poster)
        }

        return res
      })
    },
    removePoster (id) {
      this.$store.dispatch('albums/removePoster', { id: id }).then(() => {
        this.reloadPosters()
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
