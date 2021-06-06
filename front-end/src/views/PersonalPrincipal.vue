<template>
  <div>
    <b-row>
      <b-col align-self="start"><h1>Personal</h1></b-col>
    </b-row>
    <b-row align-h="end">
      <b-col cols="auto">
        <div class="d-grid gap-2">
          <b-button variant="primary" to="agregar-personal"
            >Agregar Persona <b-icon icon="plus" aria-hidden="true"></b-icon
          ></b-button>
        </div>
      </b-col>
    </b-row>

    <Table :items="personal" :fields="campos" :busy="loading">
      <template slot="actions" slot-scope="{ item }">
        <b-button pill variant="warning" @click="onEditar(item)"
          ><b-icon icon="pencil" aria-hidden="true"></b-icon
        ></b-button>
        &nbsp;
        <b-button pill variant="danger" @click="onEliminar(item)"
          ><b-icon icon="trash-fill" aria-hidden="true"></b-icon
        ></b-button>
      </template>
    </Table>
  </div>
</template>

<script>
import Table from "../components/Table";
import { mapState, mapActions } from "vuex";

export default {
  name: "Personal",
  components: {
    Table,
  },
  data() {
    return {
      campos: [
        { key: "Nombre", thClass: "table-dark" },
        { key: "Apellidos", thClass: "table-dark" },
        {
          key: "Telefono",
          label: "Teléfono",
          thClass: "table-dark",
          formatter: (value) => {
            return value || "Sin datos";
          },
        },
        {
          key: "Direccion",
          label: "Dirección",
          thClass: "table-dark",
          formatter: (value) => {
            return value || "-";
          },
        },
        { key: "actions", thClass: "table-dark", label: "Acciones" },
      ],
    };
  },
  computed: {
    ...mapState(["personal", "loading"]),
  },
  methods: {
    ...mapActions(["setPersonal", "eliminarPersona"]),
    onEditar(item) {
      console.log("Editar-Persona", item.item.ID);
      this.$router.push({
        name: "Editar-Persona",
        params: {
          id: item.item.ID,
        },
      });
    },
    onEliminar(item) {
      console.log("Eliminar", item.item.ID);

      this.$bvModal
        .msgBoxConfirm("Esta opción no se puede deshacer.", {
          title: "Eliminar Persona",
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
            this.eliminarPersona({
              id: item.item.ID,
              onComplete: (response) => {
                this.$notify({
                  type: "success",
                  title: response.data.mensaje,
                });
                setTimeout(() => this.setPersonal(), 1000);
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
    this.setPersonal();
  },
};
</script>