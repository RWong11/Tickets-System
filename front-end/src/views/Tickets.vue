<template>
  <div class="Tickets">
      Tickets 
    <Table :items='[{Nombre:"A", Edad:3}, {Nombre:"B", Edad:5}]'/>
  </div>
</template>

<script>
import Table from '../components/Table.vue'

export default {
  name: 'Tickets',
  components: {
      Table
  }
}
</script>
