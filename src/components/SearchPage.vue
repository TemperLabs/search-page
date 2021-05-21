<template>
  <div class="home">
    <vk-navbar-full>
      <vk-navbar-nav slot="center">
          <vk-navbar-item>
          <vk-navbar-nav-item icon="search"></vk-navbar-nav-item>
          <form class="uk-search" action="javascript:void(0)">
            <input class="uk-input uk-form-width-large uk-margin-small-right" type="text" placeholder="Input" v-model="inputText">
            <vk-button type="primary" @click="handleSearch(inputText)">Find</vk-button>
          </form>
        </vk-navbar-item>
      </vk-navbar-nav>
    </vk-navbar-full>
    <searchResult v-if="searchDone"/>
    <router-view/>
  </div>
</template>

<script>
import searchResult from './SearchResult'
export default {
  name: 'SearchPage',
  components: {
    searchResult
  },
  data () {
    return {
      inputText: '',
      searchDone: false
    }
  },
  methods: {
    handleSearch (text) {
      const search = {
        query: '',
        text: text
      }
      if (this.validEmail(text)) {
        search.query = 'email'
      }
      if (this.validIP(text)) {
        search.query = 'IP'
      }
      if (this.validName(text)) {
        search.query = 'name'
      }
      if (this.validFullname(text)) {
        search.query = 'fullname'
      }
      if (this.validPhone(text)) {
        search.query = 'phone'
        search.text = text.replace(/[^a-zA-Z0-9 ]/g, '')
      }
      this.$store.dispatch('searchData', search)
        .then(this.$router.push({ path: `/search/${search.query}/`, query: { query: search.text } }))
      this.searchDone = true
    },
    validEmail: function (email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    validIP: function (IP) {
      const re = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/
      return re.test(IP)
    },
    validName: function (name) {
      const re = /^(@)?[A-Za-z0-9-_]{3,24}$/
      return re.test(name)
    },
    validFullname: function (Fullname) {
      const re = /^([a-zA-Z]{2,}\s[a-zA-Z]+'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)$/
      return re.test(Fullname)
    },
    validPhone: function (phone) {
      const re = /^(\+)?([-\s()]?\d[-()\s]?){10,14}(\s*)?$/
      return re.test(phone)
    }
  }
}
</script>
