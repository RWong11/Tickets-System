<template>
  <div class="Tickets">
    <h1>Tickets</h1>
    <div class="Button">
        <b-button pill variant="primary" to="../tickets/agregarTicket">
            <b-icon icon="plus" aria-hidden="true"></b-icon>
        </b-button> 
    </div>
    <Table :items='tickets' :fields='fields'>
        <template slot="actions">
            <b-button pill variant="secondary" >
                <b-icon icon="exclamation-circle" aria-hidden="true"></b-icon>
            </b-button>
            <b-button pill variant="secondary" >
                <b-icon icon="pencil-fill" aria-hidden="true"></b-icon>
            </b-button>
            <b-button pill variant="danger" >
                <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
            </b-button>
        </template>
    </Table>
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
                sortable: false,
                formatter: value => {
                    return value || '-'
                }
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
            },
            {
                key: 'Actions',
                label: 'Acciones'

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

