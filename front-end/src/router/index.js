import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/tickets',
    name: 'Tickets',
    component: () => import('../views/Tickets.vue')
  },
  {
    path: '/tickets/agregarTicket',
    name: 'AgregarTicket',
    component: () => import('../views/AgregarTicket.vue')
  },
  {
    path: '/tickets/editarTicket/:id',
    name: 'EditarTicket',
    component: () => import('../views/EditarTicket.vue'),
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
