import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categorias: [],
    personal: [],
    persona: {},
    tickets: [],
    ticket: {},
    prioridades: [],
    estatus: [],
    loading: false
  },
  mutations: {
    SET_CATEGORIAS(state, categorias) {
      state.categorias = categorias;
    },
    SET_PERSONAL(state, personal) {
      state.personal = personal;
    },
    SET_PERSONA(state, persona) {
      state.persona = persona;
    },
    SET_TICKETS(state, tickets) {
      state.tickets = tickets;
    },
    SET_TICKET(state, ticket) {
      state.ticket = ticket;
    },
    SET_PRIORIDADES(state, prioridades) {
      state.prioridades = prioridades;
    },
    SET_ESTATUS(state, estatus) {
      state.estatus = estatus;
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
    },
    setPersonal({commit}){
      commit("SET_LOADING", true);
      axios.get('http://localhost:3000/')
      .then( response => {
        commit('SET_PERSONAL', response.data);
      })
      .finally(() => commit('SET_LOADING', false))
    },
    agregarPersona({commit}, {params, onComplete, onError}) {
      axios.post('http://localhost:3000/', params)
      .then(onComplete)
      .catch(onError)
    },
    obtenerPersona({commit}, {id, onComplete, onError}) {
      axios.get(`http://localhost:3000/${id}`)
      .then( response => {
        commit('SET_PERSONA', response.data.data);
        onComplete(response)
      })
      .catch(onError)
    },
    eliminarPersona({commit}, {id, onComplete, onError}){
      axios.delete(`http://localhost:3000/${id}`)
      .then(onComplete)
      .catch(onError)
    },
    set_tickets({commit}) {
      commit("SET_LOADING", true);
      axios.get('http://localhost:3000/tickets')
      .then( response => {
        commit('SET_TICKETS', response.data)
      })
      .finally(() => commit('SET_LOADING', false))
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
    },
    set_prioridades({commit}) {
      axios.get('http://localhost:3000/prioridades/')
      .then( response => {
        commit('SET_PRIORIDADES', response.data)
      });
    },
    set_estatus({commit}) {
      axios.get('http://localhost:3000/estatus/')
      .then( response => {
        commit('SET_ESTATUS', response.data)
      });
    },
  },
  
  
  modules: {
  }
})
