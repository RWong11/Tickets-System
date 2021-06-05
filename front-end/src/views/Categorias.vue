<template>
  <div>
    
      <b-row>
        <b-col align-self="start"><h1>Categorias</h1></b-col>
      </b-row>
      <b-row align-h="end">
        <b-col cols="auto">
          <div class="d-grid gap-2">
            <b-button block variant="primary" v-b-modal.modal-capturar>
              Agregar Categoria
              <b-icon icon="plus" aria-hidden="true"></b-icon>
            </b-button>
          </div
        ></b-col>
      </b-row>
    

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

    <b-modal
      id="modal-capturar"
      ref="modal"
      title="Capturar Categoria"
      okTitle="Aceptar"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Nombre"
          label-for="nombre-input"
          invalid-feedback="Ingrese un valor para continuar."
          :state="formState"
        >
          <b-form-input
            id="nombre-input"
            v-model="categoria.nombre"
            :state="formState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
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
        {
          key: "ID",
          label: "ID",
          sortable: false,
          thClass: "col-md-1 table-dark",
        },
        { key: "Nombre", sortable: true, thClass: "col-md-9 table-dark" },
        {
          key: "actions",
          label: "Acciones",
          sortable: false,
          thClass: "col-md-2 table-dark",
        },
      ],
      categoria: {
        nombre: "",
      },
      formState: null,
    };
  },
  computed: {
    ...mapState(["categorias", "loading"]),
  },
  methods: {
    ...mapActions(["setCategorias", "eliminarCategoria", "capturarCategoria"]),
    onEliminar(item) {
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
                  type: "primary",
                  title: response.data.mensaje,
                });
                this.setCategorias();
              },
            });
          }
        });
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.formState = valid;
      return valid;
    },
    resetModal() {
      this.categoria.nombre = "";
      this.formState = null;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }

      this.capturarCategoria({
        params: this.categoria,
        onComplete: (response) => {
          console.log(response.data);
          this.$notify({
            type: "success",
            title: response.data.mensaje,
          });
          this.setCategorias();
        },
      });

      this.$nextTick(() => {
        this.$bvModal.hide("modal-capturar");
      });
    },
  },
  mounted() {
    this.setCategorias();
  },
};
</script>
