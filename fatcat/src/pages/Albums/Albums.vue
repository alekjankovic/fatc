<template lang="html">
  <q-page class="p-2">
    <div class="main-page">
      <div class="flex justify-between">
        <h1 class="text-primary text-h4 q-mt-sm"><span>Albums</span></h1>
        <div class="q-pt-md">
          <q-btn color="teal" filled label="Add" icon="add" v-on:click="add_album.modal = true"/>
        </div>
      </div>

      <div class="row">
        <div class="col-12 q-pa-md">
          <div class="q-pa-md">
            <template v-if="albums && albums.length > 0">
              <q-list bordered style="max-width:350px;">

                <q-item
                  clickable
                  v-ripple
                  v-for="(item, index) in albums"
                  :key="'album_' + index"

                  tag="router-link"
                  :to="'/albums/album/' + item.id"
                  exact
                  >
                  <q-item-section avatar>
                    <q-avatar rounded>
                      <img src="https://cdn.quasar.dev/img/mountains.jpg">
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>{{ item.name }}</q-item-section>
                </q-item>

              </q-list>
            </template>
            <template v-else>
              <span class="text-primary text-h5 q-mt-sm">
                You don't have any albums yet!
              </span>
            </template>

          </div>
        </div>
      </div>

      <q-dialog
        v-model="add_album.modal"
        ref="add_new_album"
      >
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section>
            <div class="text-h6">Add new album</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input outlined bottom-slots v-model="add_album.name" label="Add name">
              <template v-slot:hint>
                <span class="text-negative" v-if="add_album.isExist">Album already exists</span>
              </template>
          </q-input>
          </q-card-section>

          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="Add new" v-on:click="add_new_album()" />
            <q-btn flat label="Cancel" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Albums',
  data () {
    return {
      add_album: {
        modal: false,
        name: '',
        isExist: false
      }
    }
  },
  computed: {
    albums () {
      return this.$store.getters['albums/albums']
    }
  },
  methods: {
    add_new_album () {
      this.$store.dispatch('albums/addNewAlbum', { name: this.add_album.name }).then((res) => {
        this.add_album.isExist = res.isExist
        if (!res.isExist) {
          this.$refs.add_new_album.hide()
        }
      })
    },
    renderImage () {
    }
  }
}
</script>

<style lang="css" scoped>
</style>
