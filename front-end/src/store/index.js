import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tickets: []
  },
  mutations: {
    SET_TICKETS(state, tickets) {
      state.tickets = tickets;
    }
  },
  actions: {
    set_tickets({commit}) {
      axios.get('http://localhost:3000/tickets')
      .then( response => {
        commit('SET_TICKETS', response.data)
      });
    }
  },
  modules: {
  }
})
