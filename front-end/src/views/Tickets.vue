<template>
  <div class="Tickets">
    <h1>Tickets</h1>
    <div class="Button">
        <b-button variant="primary" to="../tickets/agregarTicket">Agregar</b-button> 
    </div>
    <Table :items='tickets' :fields='fields'/>
  </div>
</template>

<script>
import Table from '../components/Table.vue'
import {mapState, mapActions} from 'vuex'

export default {
    name: 'Tickets',
    components: {
        Table
    },
  data() {
      return {
          fields: [
              {
                key: 'Nombre',
                sortable: false
            },
            {
                key: 'Descripcion',
                label: 'Descripción',
                sortable: false
            },
            {
                key: 'Prioridad',
                sortable: false
            },
            {
                key: 'NombrePersonal',
                label: 'Personal',
                sortable: false
            },
            {
                key: 'Categoria',
                label: 'Categoría',
                sortable: false
            },
            {
                key: 'Estatus',
                sortable: false
            }
        ]
      }
  },
  computed: {
      ...mapState(['tickets'])
  },
  methods: {
      ...mapActions(['set_tickets'])
  },
  created() {
      this.set_tickets();
  }
}
</script>

<style scoped>
.Tickets {
    margin-left: 2%;
    margin-right: 2%;
}

.Button {
    text-align: left;
}
</style>
