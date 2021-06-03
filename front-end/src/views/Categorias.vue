<template>
  <div>
    <b-container>
        <b-col align-self="start"><h1>Categorias</h1></b-col>
    </b-container>

    <Table
      :items="categorias"
      :fields="campos"
      :busy="loading"
      :totalRows="categorias.length"
    >
      <template slot="actions" slot-scope="{ item }">
        <b-button pill variant="danger" @click="onEliminar(item)">
          <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
        </b-button>
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
        { key: "ID", label: "ID", sortable: false, thClass: 'col-md-1 table-dark' },
        { key: "Nombre", sortable: true, thClass: 'col-md-8 table-dark' },
        { key: "actions", label: "Acciones", sortable: false, thClass: 'col-md-2 table-dark' },
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
                this.setCategorias();
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
