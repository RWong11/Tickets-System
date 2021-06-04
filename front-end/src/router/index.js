import Vue from 'vue'
import VueRouter from 'vue-router'
import VisualizarPersonal from '../views/VisualizarPersonal.vue'
import AgregarPersonal from '../views/AgregarPersonal.vue'
import EditarPrincipal from '../views/EditarPrincipal.vue'
import EditarPersona from '../views/EditarPersona.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/personal',
    name: 'Personal',
    component: VisualizarPersonal
  },
  {
    path: '/agregar-personal',
    name: 'Agregar',
    component:AgregarPersonal
  },
  {
    path: '/editar',
    name: 'Editar-Principal',
    component: EditarPrincipal
  },
  {
    path: '/editar/:id',
    name: 'Editar-Persona',
    component: EditarPersona
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
