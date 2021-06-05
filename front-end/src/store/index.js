import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tickets: [],
    ticket: {}
  },
  mutations: {
    SET_TICKETS(state, tickets) {
      state.tickets = tickets;
    },
    SET_TICKET(state, ticket) {
      state.ticket = ticket;
    }
  },
  actions: {
    set_tickets({commit}) {
      axios.get('http://localhost:3000/tickets')
      .then( response => {
        commit('SET_TICKETS', response.data)
      });
    },
    set_ticket({commit}, {id, onComplete, onError}) {
      axios.get(`http://localhost:3000/tickets/${id}`)
      .then( response => {
        commit('SET_TICKET', response.data[0])
        onComplete(response.data[0]);
      })
      .catch(onError)
    },
    crear_ticket({commit}, {params, onComplete, onError}) {
      axios.post('http://localhost:3000/tickets', params)
      .then(onComplete)
      .catch(onError)
    },
    editar_ticket({commit}, {id, params, onComplete, onError}) {
      axios.put(`http://localhost:3000/tickets/${id}`, params)
      .then(onComplete)
      .catch(onError)
    },
    editar_ticket_estatus({commit}, {params, onComplete, onError}) {
      axios.put('http://localhost:3000/tickets/', params)
      .then(onComplete)
      .catch(onError)
    },
    eliminar_ticket({commit}, {id, onComplete, onError}) {
      axios.delete(`http://localhost:3000/tickets/${id}`)
      .then(onComplete)
      .catch(onError)
    }
  },
  
  modules: {
  }
})
