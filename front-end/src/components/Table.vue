<template>
  <div>
      <b-table stripped hover :items="items" :fields="fields"></b-table>
  </div>
</template>

<script>
export default {
    name: 'Table',
    props: {
        items: Array,
        fields: Array
    }

}
</script>

<style>

</style>