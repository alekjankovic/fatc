<template>
  <q-page class="p-2">
    <div class="main-page">
      <div class="flex justify-between">
        <h1 class="text-primary text-h4 q-mt-sm"><span>Images</span></h1>
      </div>

      <div class="row">
        <div class="col-12 q-pa-md">
          <div class="q-gutter-md row items-start">

            <div style="width: 150px">
              <q-file v-model="fileInput" color="teal" filled label="Add">
                <template v-slot:prepend>
                  <q-icon name="add" />
                </template>
              </q-file>
            </div>

            <!-- notice "basic" prop (which disables default animation) -->
            <q-img
              v-for="(image, index) in images"
              :src="image.src"
              :key="'image_' + index"
              style="width: 150px"
              :ratio="1"
              basic
              spinner-color="white"
              class="rounded-borders"
              v-bind:img-name="image.name"
            >
              <div class="absolute-bottom-right cursor-pointer" v-on:click="removeImage(index)">
                X - {{ index }}
              </div>
            </q-img>
            <!-- <img
              v-for="(image, index) in images"
              :src="image.src"
              :key="'image_' + index"
            /> -->
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Images',
  data () {
    return {
      fileInput: null,
      helpers: {
        tempImgSrc: '',
        tempImgEncoded: ''
      },
      images: []
    }
  },
  created: function () {
    this.reloadImages()
  },
  computed: {
  },
  watch: {
    fileInput: function (upFile) {
      this.uploadImage(upFile)
    },
    images: function () {
      console.log(this.images)
    }
  },
  methods: {
    getImages (skip, take) {
      return this.$store.images.state.images
    },
    reloadImages () {
      this.images = []
      this.$store.getters['images/images'].map((x) => {
        this.helpers.tempImgSrc = x
        const reader = new FileReader()
        reader.onload = (e) => {
          this.helpers.tempImgEncoded = e.target.result
          this.images.push(
            {
              name: this.helpers.tempImgSrc.name,
              src: this.helpers.tempImgEncoded
            }
          )
        }
        reader.readAsDataURL(x)
      })
    },
    uploadImage (upFile) {
      this.$store.dispatch('images/uploadImage', { image: upFile }).then(() => {
        this.reloadImages()
      })
    },
    removeImage (id) {
      this.$store.dispatch('images/removeImage', { id: id }).then(() => {
        this.reloadImages()
      })
    }
  }
}
</script>
