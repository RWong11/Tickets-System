<template>
    <div>
      <h1>Personal</h1>
      <b-button variant="primary" to="agregar-personal">Agregar</b-button>
      <Table :items="personal" :fields="campos" :busy="loading">
        <template slot="actions" slot-scope="{ item }">
          <b-button variant="primary" @click="onEditar(item)">Editar</b-button>
          <b-button variant="danger" @click="onEliminar(item)">Eliminar</b-button>
        </template>
      </Table>
    </div>
</template>

<script>
import Table from "../components/Table";
import { mapState, mapActions } from "vuex";

export default {
    name: 'Personal',
    components: {
        Table,
    },
    data() {
    return {
      campos: [
        { key: "Nombre" },
        { key: "Apellidos" },
        {
          key: "Telefono",
          label: "Teléfono",
          formatter: (value) => {
            return value || "Sin datos";
          },
        },
        {
          key: "Direccion",
          label: "Dirección",
          formatter: (value) => {
            return value || "-";
          },
        },
        { key: "actions", label: "Acciones" },
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
        name: 'Editar-Persona',
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