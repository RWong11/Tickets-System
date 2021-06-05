<template>
  <div>
    <h1>Tickets</h1>
    <Select
      class="mt-2"
      v-model="filtroCat"
      :options="selectDeCategorias()"
      id="categoria"
      titulo="Categoría: "
    />
    <br />
    <b-card-group deck>
      <div v-for="t in (tickets.filter(tick => tick.IDCategoria == filtroCat))" :key="t.ID">
        <Tarjeta :ticket="t" />
      </div>
    </b-card-group>
  </div>
</template>

<script>
import Tarjeta from "../components/Tarjeta";
import Select from "../components/Select";
import { mapState, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    Tarjeta,
    Select,
  },
  data() {
    return {
      filtroCat: undefined,
    };
  },
  computed: {
    ...mapState(["categorias", "tickets"]),
  },
  methods: {
    ...mapActions(["setCategorias", "set_tickets"]),
    selectDeCategorias() {
      let categoriasSelect = [];
      this.categorias.forEach((element) => {
        categoriasSelect.push({ value: element.ID, text: element.Nombre });
      });
      return categoriasSelect;
    },
  },
  mounted() {
    this.setCategorias();
    this.set_tickets();
  },
};
</script>

