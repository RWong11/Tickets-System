<template>
  <div>
    <b-container class="fluid">
      <b-row align-h="between">
        <b-col lg="3"  class="my-1">
          <b-form-group
            label="Registros por página"
            label-for="per-page-select"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
          >
            <b-form-select
              id="per-page-select"
              v-model="perPage"
              :options="pageOptions"
              class="form-select"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col lg="7" class="my-1">
          <b-form-group
            label="Filtro"
            label-for="filter-input"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
                placeholder="Escriba lo que esta buscando ..."
              ></b-form-input>

              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''"
                  >Limpiar</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="justify-content-md-center">
        <b-col lg="12" md="6" class="my-1 text-center">
          <b-table
            hover
            outlined
            fixed
            :busy="busy"
            :items="items"
            :fields="fields"
            label-sort-asc=""
            label-sort-clear=""
            label-sort-desc=""
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter"
            @filtered="onFiltered"
          >
            <template #table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>

            <template #cell(actions)="data">
              <slot name="actions" :item="data"> </slot>
            </template>
          </b-table>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="6" md="6" class="my-1">
          Visualizando {{ (currentPage * perPage) - perPage + 1 }} a {{ (currentPage * perPage) }} de {{ totalRows }} registros
        </b-col>
        <b-col lg="6" md="6" class="my-1">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
          ></b-pagination>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>



<script>
export default {
  name: "Table",
  props: {
    items: Array,
    fields: Array,
    busy: Boolean,
    totalRows: Number,
  },
  data() {
    return {
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Todos" }],
      filter: null,
    };
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>

