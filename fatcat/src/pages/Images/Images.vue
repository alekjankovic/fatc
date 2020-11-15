<template>
  <q-page class="p-2">
    <div class="main-page">
      <div class="flex justify-between">
        <h1 id="Introduction" class="text-primary text-h4 q-mt-sm"><span>Images</span></h1>
      </div>

      <div class="row"></div>
      <div class="row">
        <div class="col-12 q-pa-md">
          <div class="q-gutter-md row items-start">

            <div class="col-2">
              <q-file v-model="fileInput" color="teal" filled label="Add">
                <template v-slot:prepend>
                  <q-icon name="add" />
                </template>
              </q-file>
            </div>

            <!-- notice "basic" prop (which disables default animation) -->
            <!-- <q-img
              :src=""
              style="width: 150px"
              :ratio="1"
              basic
              spinner-color="white"
              class="rounded-borders"
            >
            </q-img> -->
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
      fileInput: null

    }
  },
  created: function () { },
  computed: {
    images () {
      return this.$store.images.state.images
    }
  },
  watch: {
    fileInput: function (upFile) {
      this.uploadImage(upFile)
    }
  },
  methods: {
    getImages (skip, take) {
      return this.$store.images.state.images
    },
    uploadImage (upFile) {
      console.log(this.$store)
      this.$store.dispatch('images/uploadImage', { image: this.upFile }).then(() => {
        console.log('Image Uploaded')
      })
    }
  }
}
</script>
