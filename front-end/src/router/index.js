import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AgregarPersonal from '../views/AgregarPersonal.vue'
import PersonalPrincipal from '../views/PersonalPrincipal.vue'
import EditarPersona from '../views/EditarPersona.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/personal',
    name: 'Personal',
    component: PersonalPrincipal
  },
  {
    path: '/agregar-personal',
    name: 'Agregar',
    component:AgregarPersonal
  },
  {
    path: '/editar/:id',
    name: 'Editar-Persona',
    component: EditarPersona
  },
  {
    path: '/categorias',
    name: 'Categorias',
    component: () => import('../views/Categorias.vue')
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
