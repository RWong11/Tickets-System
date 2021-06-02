<template>
  <div>
    <h1>Categorias</h1>
    <Table :items="categorias" :fields="campos" :busy="loading">
      <template slot="actions" slot-scope="{ item }">
        <b-button @click="onEliminar(item)">Eliminar</b-button>
      </template>
    </Table>
  </div>
</template>

<script>
import Table from "../components/Table";
import { mapState, mapActions } from "vuex";

export default {
  name: "Categorias",
  components: {
    Table,
  },
  data() {
    return {
      campos: [
        { key: "ID", label: "ID" },
        { key: "Nombre" },
        { key: "actions", label: "Acciones" },
      ],
    };
  },
  computed: {
    ...mapState(["categorias", "loading"]),
  },
  methods: {
    ...mapActions(["setCategorias", "eliminarCategoria"]),
    onEliminar(item) {
      console.log("Eliminar", item.item.ID);

      this.$bvModal
        .msgBoxConfirm("Esta opción no se puede deshacer.", {
          title: "Eliminar Categoria",
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
            this.eliminarCategoria({
              id: item.item.ID,
              onComplete: (response) => {
                console.log(response.data);
                this.$notify({
                  type: "success",
                  title: response.data.mensaje,
                });
                setTimeout(() => this.setCategorias(), 1000);
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
    this.setCategorias();
  },
};
</script>
