<template>
  <div class="Tickets">
    <h1>Tickets</h1>
    <div class="Button">
        <b-button pill variant="primary" to="../tickets/agregarTicket">
            <b-icon icon="plus" aria-hidden="true"></b-icon>
        </b-button> 
    </div>
    <Table :items='tickets' :fields='fields'>
        <template slot="actions" slot-scope="{item}">
            <b-button v-b-tooltip.hover 
            title="Editar Estatus" 
            @click="onEstatus(item)" 
             variant="secondary"
            >
                <b-icon icon="exclamation-circle" aria-hidden="true"></b-icon>
            </b-button>
            <b-button v-b-tooltip.hover 
            title="Editar Ticket"
            @click="onEditar(item)" 
             variant="secondary"  
            >
                <b-icon icon="pencil-fill" aria-hidden="true"></b-icon>
            </b-button>
            <b-button v-b-tooltip.hover 
            title="Eliminar Ticket"
            @click="onEliminar(item)" 
             variant="danger" 
            >
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
        ...mapActions(['set_tickets', 'eliminar_ticket']),
        onEstatus(item) {
            console.log("Estatus", item.item.IDTicket)

            this.$router.push({
                name: "EditarTicket",
                params: {
                    id: item.item.IDTicket,
                    titulo: "Editar Estatus",
                    disabledNombre: true,
                    disabledDescripcion: true,
                    disabledPrioridad: true,
                    disabledPersonal: true,
                    disabledCategoria: true
                }
            })

        },
        onEditar(item) {
            console.log("Editar", item.item.IDTicket)
            this.$router.push({
                name: "EditarTicket",
                params: {
                    id: item.item.IDTicket,
                    disabledNombre: true,
                    disabledEstatus: true
                }
            })
        },
        onEliminar(item) {

            this.$bvModal
            .msgBoxConfirm("Esta opción no se puede deshacer.", {
            title: "Eliminar Ticket",
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "Aceptar",
            cancelTitle: "Cancelar",
            footerClass: "p-2",
            centered: true,
            })
            .then((value) => {
            if (value) {
                this.eliminar_ticket({

                    id: item.item.IDTicket,
                    onComplete: response => {
                        this.$notify({
                            type: "success",
                            title: response.data.mensaje
                        });
                        setTimeout(() => this.set_tickets(), 1000);
                    },
                    onError: error => {
                        console.log(error)
                    }
                })
            }
            })
            .catch((err) => {
            // An error occurred
            });

        }
    },
    created() {
        this.set_tickets();
    }
}
</script>

