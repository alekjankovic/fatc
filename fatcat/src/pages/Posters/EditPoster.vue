<template lang="html">
  <q-page class="p-2">
    <div class="main-page">
      <div class="flex justify-between">
        <h1 class="text-primary text-h4 q-mt-sm"><span>{{ pageTitle }}</span></h1>
      </div>

      <div class="row">
        <div class="col-12 col-md-8 q-pa-md">
          <q-expansion-item
            class="shadow-1 overflow-hidden"
            style="border-radius: 30px"
            icon="add_a_photo"
            label="Select Image"
            header-class="text-primary"
            expand-icon-class="text-primary"
          >
            <div class="q-gutter-md row items-start q-pa-md">
              <q-img
                v-for="(image, index) in availableImages"
                :src="image.src"
                :key="'image_' + index"
                style="width: 150px"
                :ratio="1"
                basic
                spinner-color="white"
                class="rounded-borders"
                v-bind:img-name="image.name"
              >
                <div class="absolute-bottom-right cursor-pointer" v-on:click="posterData.imageIndx = index; posterData.imageSrc = image.src">
                  Select
                </div>
              </q-img>
            </div>
          </q-expansion-item>
        </div>
        <div class="col-12 col-md-4 q-pa-md">
          <q-input
              filled
              v-model="posterData.background"
              class="my-input"
              hint="Background Color"
            >
              <template v-slot:append>
                <q-icon name="colorize" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-color v-model="posterData.background" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-6 q-pa-md">
          <q-input
            filled
            v-model="posterData.title"
            label="Add Title"
          />
        </div>
        <div class="col-12 q-pa-md">
          <q-input
            v-model="posterData.description"
            filled
            type="textarea"
            autogrow
            label="Description"
          />
        </div>
      </div>

      <div class="row">
        <div class="flex justify-center full-width q-pt-md">
          <div
            v-bind:style="{ backgroundColor: posterData.background , width:'500px', height:'500px'}"
            class="flex justify-center items-center"
            >
            <q-img
              :src="posterData.imageSrc"
              style="width:80%; height:80%"
              :ratio="1"
              basic
              spinner-color="white"
              class="rounded-borders"
            >
            <div
              v-if="posterData.title"
              class="absolute-bottom text-subtitle1 text-center">
              {{ posterData.title }}
            </div>
            </q-img>
          </div>
        </div>
      </div>
      <div class="row q-pa-lg">
        <div class="col-6 col-md-6 q-pb-lg" v-if="!id">
          <q-select filled v-model="selectedAlbum" :options="availableAlbums" label="Select Album" />
        </div>
        <div class="col-6 col-md-6 q-pa-sm q-pl-lg">
          <q-btn color="teal" filled label="Save" v-on:click="save_to_album()" />
        </div>
      </div>

    </div>
  </q-page>
</template>

<script>
export default {
  name: 'EditPoster',
  data () {
    return {
      id: this.$route.params.id,
      availableImages: [],
      helpers: {
        tempImgSrc: '',
        tempImgEncoded: ''
      },
      posterData: {
        imageIndx: null,
        imageSrc: null,
        title: '',
        description: '',
        background: '',
        albumId: 0,
        posterid: 0
      },
      selectedAlbum: {
        value: 0,
        label: ''
      }
    }
  },
  created () {
    this.loadImages()
    debugger
    if (this.$route.params && this.$route.params.id) {
      this.selectedAlbum.value = this.$route.params.id

      this.$store.dispatch('albums/setPoster', { id: this.$route.params.id }).then((res) => {
        const poster = this.$store.getters['albums/poster']

        this.posterData.posterid = poster.id
        this.posterData.imageSrc = poster.poster
        this.posterData.title = poster.title
        this.posterData.description = poster.description
        this.posterData.background = poster.background
        this.posterData.generated = poster.generated
      })
    }
  },
  computed: {
    pageTitle () {
      if (this.id) {
        return 'Edit poster'
      } else {
        return 'Create new poster'
      }
    },
    availableAlbums () {
      return this.$store.getters['albums/albums'].map((x) => {
        return {
          label: x.name,
          value: x.id
        }
      })
    }

  },
  methods: {
    loadImages () {
      this.availableImages = []
      this.$store.getters['images/images'].map((x) => {
        this.helpers.tempImgSrc = x
        const reader = new FileReader()
        reader.onload = (e) => {
          this.helpers.tempImgEncoded = e.target.result
          debugger
          this.availableImages.push(
            {
              name: this.helpers.tempImgSrc.name,
              src: this.helpers.tempImgEncoded
            }
          )
        }
        reader.readAsDataURL(x)
      })
    },
    save_to_album () {
      this.posterData.albumId = this.selectedAlbum.value
      if (!this.posterData.albumId) return
      this.$store.dispatch('albums/createPoster', { poster: this.posterData }).then((res) => {
        console.log('Poster created')
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
