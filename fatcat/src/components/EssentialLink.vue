<template>
  <q-item
    clickable
    v-bind:tag="isVueLink ? 'router-link' : 'a'"
    v-bind:target=" newTab ? '_blank' : ''"
    :href="link"
    :to="link"
    exact
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    },
    isVueLink: {
      type: Boolean,
      default: true
    },
    newTab: {
      type: Boolean,
      default: false
    }
  }
}
</script>
