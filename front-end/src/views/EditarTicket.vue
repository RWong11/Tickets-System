<template>
  <div class="form">
    <h1>{{ titulo }}</h1>
    <b-form @submit.prevent="editarTicket()">
      <Input
        class="mt-2"
        id="nombre"
        titulo="Nombre: "
        placeholder="Ingrese un nombre"
        :valueText="ticket.Nombre"
        :disabled="true"
        :maxlength="50"
        :error="erroresValidacion && !validarNombre"
        mensajeError="Debe ingrese un nombre."
      />
      <Input
        class="mt-2"
        v-model="ticket.Descripcion"
        id="Descripcion"
        titulo="Descripcion: "
        placeholder="Ingrese la descripción"
        :valueText="ticket.Descripcion"
        :maxlength="100"
      />
      <Select
        class="mt-2"
        v-model="ticket.IDPrioridad"
        :options="selectDePrioridades()"
        id="prioridad"
        titulo="Prioridad:"
        placeholder="Seleccione prioridad"
        :selectedItem="ticket.IDPrioridad"
        :error="erroresValidacion && !validarPrioridad"
        mensajeError="Debes seleccionar una prioridad"
      />
      <Select
        class="mt-2"
        v-model="ticket.IDPersonal"
        :options="selectDePersonal()"
        id="personal"
        titulo="Personal:"
        placeholder="Seleccione personal"
        :selectedItem="ticket.IDPersonal"
        :error="erroresValidacion && !validarPersonal"
        mensajeError="Debes seleccionar una persona"
      />
      <Select
        class="mt-2"
        v-model="ticket.IDCategoria"
        :options="selectDeCategorias()"
        id="categoria"
        titulo="Categoría:"
        placeholder="Seleccione categoría"
        :selectedItem="ticket.IDCategoria"
        :error="erroresValidacion && !validarCategoria"
        mensajeError="Debes seleccionar una categoría"
      />
      <!-- SOLO SE PODRÁ CAMBIAR EL ESTATUS CUANDO SE SELECCIONE LA OPCIÓN DE CAMBIAR ESTATUS -->
      <Select
        class="mt-2"
        v-model="ticket.IDEstatus"
        :options="selectDeEstatus()"
        id="estatus"
        titulo="Estatus: "
        placeholder="Seleccione el estatus"
        :selectedItem="ticket.IDEstatus"
        :disabled="true"
        :error="erroresValidacion && !validarCategoria"
        mensajeError="Debes seleccionar un estatus"
      />
      <b-button class="mt-2" type="submit" variant="primary">Guardar</b-button>
    </b-form>
  </div>
</template>

<script>
import Vue from "vue";
import Input from "../components/Input";
import Select from "../components/Select";
import { mapState, mapActions } from "vuex";

export default {
  name: "EditarTicket",
  components: {
    Input,
    Select,
  },
  props: {
    titulo: {
      type: String,
      default: "Editar Ticket",
    }
  },
  data() {
    return {
      ticket: {},
      erroresValidacion: false,
    };
  },
  computed: {
    ...mapState(["prioridades", "estatus", "personal", "categorias"]),
    validarNombre() {
      return (
        this.ticket.Nombre !== undefined && this.ticket.Nombre.trim() != ""
      );
    },
    validarPrioridad() {
      return (
        this.ticket.Prioridad !== undefined &&
        this.ticket.Prioridad.trim() != ""
      );
    },
    validarPersonal() {
      return (
        this.ticket.NombrePersonal !== undefined &&
        this.ticket.NombrePersonal.trim() != ""
      );
    },
    validarCategoria() {
      return (
        this.ticket.Categoria !== undefined &&
        this.ticket.Categoria.trim() != ""
      );
    },
  },
  methods: {
    ...mapActions([
      "set_ticket",
      "editar_ticket",
      "set_prioridades",
      "set_estatus",
    ]),
    editarTicket() {
      if (
        this.validarNombre &&
        this.validarPrioridad &&
        this.validarPersonal &&
        this.validarCategoria
      ) {
        this.erroresValidacion = false;
        this.editar_ticket({
          id: this.$route.params.id,
          params: {
            Descripcion: this.ticket.Descripcion,
            Prioridad: this.ticket.IDPrioridad,
            Personal: this.ticket.IDPersonal,
            Categoria: this.ticket.IDCategoria,
            //Sólo habrá cambio de Estatus cuando se seleccione el botón para cambiar Estatus
            Estatus: this.ticket.IDEstatus,
          },
          onComplete: (response) => {
            console.log(response.data);
            this.$notify({
              type: "success",
              title: response.data.mensaje,
            });
            this.$router.push({
              name: "Tickets",
            });
          },
          onError: (error) => {
            console.log(error.response.data.mensaje);
            this.$notify({
              type: "error",
              title: error.response.data.mensaje,
            });
          },
        });
        return;
      } else {
        this.erroresValidacion = true;
        return;
      }
    },
    selectDePrioridades() {
      let prioridadesSelect = [];
      this.prioridades.forEach((element) => {
        prioridadesSelect.push({
          value: element.ID,
          text: element.Descripcion,
        });
      });
      return prioridadesSelect;
    },

    selectDeEstatus() {
      let estatusSelect = [];
      this.estatus.forEach((element) => {
        estatusSelect.push({ value: element.ID, text: element.Descripcion });
      });
      return estatusSelect;
    },
    selectDePersonal() {
      let personalSelect = [];
      this.personal.forEach((element) => {
        personalSelect.push({
          value: element.ID,
          text: element.Nombre + " " + element.Apellidos,
        });
      });
      return personalSelect;
    },
    selectDeCategorias() {
      let categoriasSelect = [];
      this.categorias.forEach((element) => {
        categoriasSelect.push({ value: element.ID, text: element.Descripcion });
      });
      return categoriasSelect;
    },
  },
  mounted() {
    this.set_ticket({
      id: this.$route.params.id,
      onComplete: (response) => {
        Vue.set(this, "ticket", response);
      },
    }),
      this.set_prioridades();
      this.set_estatus();
  },
  //llamar a la action de set_personal
  //llamar a la action de set_categoría
};
</script>

<style>
.form {
  text-align: left;
  margin-left: 5%;
  margin-right: 50%;
}
</style>
