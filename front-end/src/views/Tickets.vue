<template>
  <div class="Tickets">
    <b-container>
      <b-row>
        <b-col align-self="start"><h1>Tickets</h1></b-col>
      </b-row>
      <b-row align-h="end">
        <b-col cols="auto">
          <div class="d-grid gap-2">
            <b-button variant="primary" to="../tickets/agregarTicket">
              Agregar Ticket
              <b-icon icon="plus" aria-hidden="true"></b-icon>
            </b-button>
          </div>
        </b-col>
      </b-row>
    </b-container>

    <Table :items="tickets" 
          :fields="fields" 
          :busy="loading" 
          :totalRows="tickets.length"
          >
      <template slot="actions" slot-scope="{ item }">
        <b-button
          v-b-tooltip.hover
          title="Editar Estatus"
          @click="onEstatus(item)"
          variant="secondary"
          v-b-modal.modal-estatus
        >
          <b-icon icon="exclamation-circle" aria-hidden="true"></b-icon>
        </b-button>
        <b-button
          v-b-tooltip.hover
          title="Editar Ticket"
          @click="onEditar(item)"
          variant="secondary"
        >
          <b-icon icon="pencil-fill" aria-hidden="true"></b-icon>
        </b-button>
        <b-button
          v-b-tooltip.hover
          title="Eliminar Ticket"
          @click="onEliminar(item)"
          variant="danger"
        >
          <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
        </b-button>
      </template>
    </Table>

    <b-modal
      id="modal-estatus"
      ref="modal"
      title="Cambiar Estatus"
      okTitle="Aceptar"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <Select
          class="mt-2"
          v-model="nuevoEstatus.IDEstatus"
          :options="selectDeEstatus()"
          id="estatus"
          titulo="Estatus:"
          placeholder="Seleccione Estatus"
          :selectedItem="nuevoEstatus.IDEstatus"
        />
      </form>
    </b-modal>
  </div>
</template>

<script>
import Table from "../components/Table.vue";
import { mapState, mapActions } from "vuex";
import Select from "../components/Select";

export default {
  name: "Tickets",
  components: {
    Table,
    Select,
  },
  data() {
    return {
      nuevoEstatus: {
        IDTicket: Number,
        IDEstatus: "",
      },
      fields: [
        {
          key: "Nombre",
          sortable: false,
        },
        {
          key: "Descripcion",
          label: "Descripción",
          sortable: false,
          formatter: (value) => {
            return value || "-";
          },
        },
        {
          key: "Prioridad",
          sortable: false,
        },
        {
          key: "NombrePersonal",
          label: "Personal",
          sortable: false,
        },
        {
          key: "Categoria",
          label: "Categoría",
          sortable: false,
        },
        {
          key: "Estatus",
          sortable: false,
        },
        {
          key: "Actions",
          label: "Acciones",
        },
      ],
    };
  },
  computed: {
    ...mapState(["tickets", "estatus", "loading"]),
  },
  methods: {
    ...mapActions([
      "set_tickets",
      "eliminar_ticket",
      "editar_ticket_estatus",
      "set_estatus",
    ]),

    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      this.editar_ticket_estatus({
        params: {
          ID: this.nuevoEstatus.IDTicket,
          Estatus: this.nuevoEstatus.IDEstatus,
        },
        onComplete: (response) => {
          this.$notify({
            type: "success",
            title: response.data.mensaje,
          });
          this.set_tickets();
        },
        onError: (error) => {
          console.log(error.response.data.mensaje);
          this.$notify({
            type: "error",
            title: error.response.data.mensaje,
          });
        },
      });

      this.$nextTick(() => {
        this.$bvModal.hide("modal-estatus");
      });
    },
    onEstatus(item) {
      this.nuevoEstatus.IDEstatus = item.item.IDEstatus;
      this.nuevoEstatus.IDTicket = item.item.IDTicket;
    },
    selectDeEstatus() {
      let estatusSelect = [];
      this.estatus.forEach((element) => {
        estatusSelect.push({ value: element.ID, text: element.Descripcion });
      });
      return estatusSelect;
    },
    onEditar(item) {
      this.$router.push({
        name: "EditarTicket",
        params: {
          id: item.item.IDTicket,
        },
      });
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
              onComplete: (response) => {
                this.$notify({
                  type: "success",
                  title: response.data.mensaje,
                });
                setTimeout(() => this.set_tickets(), 1000);
              },
              onError: (error) => {
                console.log(error);
              },
            });
          }
        })
        .catch((err) => {
          // An error occurred
        });
    },
  },
  mounted() {
    this.set_tickets();
    this.set_estatus();
  },
};
</script>
