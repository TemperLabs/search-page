<template>
  <div class="searh-result">
     <vk-grid class="uk-child-width-1-2@s uk-child-width-1-4@m">
      <div v-for="(user,index) in getSearchResults" :key="index">
        <vk-card>{{user}}</vk-card>
      </div>
    </vk-grid>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SearchResult',
  computed: {
    ...mapGetters([
      'getSearchResults'
    ])
  }
}
</script>

<style lang="scss">
.searh-result {
  padding: 20px 16px;
}
</style>
