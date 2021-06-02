import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categorias: [],
    loading: false
  },
  mutations: {
    SET_CATEGORIAS(state, categorias) {
      state.categorias = categorias;
    },
    SET_LOADING(state, payload) {
      state.loading = payload;
    }
  },
  actions: {
    setCategorias({commit}){
      commit("SET_LOADING", true);
      axios.get('http://localhost:3000/categorias/')
      .then( response => {
        commit('SET_CATEGORIAS', response.data);
      })
      .finally(() => commit('SET_LOADING', false))
    },
    capturarCategoria({commit}, {params, onComplete, onError}) {
      axios.post('http://localhost:3000/categorias/', params)
      .then(onComplete)
      .catch(onError)
    },
    eliminarCategoria({commit}, {id, onComplete, onError}){
      axios.delete(`http://localhost:3000/Categorias/${id}`)
      .then(onComplete)
      .catch(onError)
    }
  },
  modules: {
  }
})
