<template>
    <div>
        <h1>Personal</h1>
        <b-button variant="primary" to="agregar-personal">Agregar</b-button>
        <Table :items="personal" :fields="campos" :busy="loading"/>
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
      ],
    };
  },
  computed: {
    ...mapState(["personal", "loading"]),
  },
  methods: {
    ...mapActions(["setPersonal"]),
  },
  mounted() {
    this.setPersonal();
  },
};
</script>