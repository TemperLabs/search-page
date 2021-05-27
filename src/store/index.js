import Vue from 'vue'
import Vuex from 'vuex'
import mock from '@/mock/mock.json'
const initialState = () => mock

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchResults: [],
    searchQueryParams: '',
    searchQueryText: '',
    data: initialState()
  },
  mutations: {
    RESET_DATA: (state, payload) => {
      Object.assign(state, payload)
    },
    SEARCH_DATA: (state, payload) => {
      state.searchQueryParams = payload.query
      state.searchQueryText = payload.text
    }
  },
  actions: {
    resetData ({ commit }) {
      commit('RESET_DATA', initialState)
    },
    searchData ({ commit }, payload) {
      commit('SEARCH_DATA', payload)
    }
  },
  getters: {
    getSearchResults: state => {
      if (state.searchQueryParams === '') {
        return ['Неверно введены данные']
      }
      return state.data.filter(user => user[state.searchQueryParams].toLowerCase().includes(state.searchQueryText))
    }
  },
  modules: {
  }
})
