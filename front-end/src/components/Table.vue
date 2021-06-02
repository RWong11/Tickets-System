<template>
  <div>
      <b-table stripped hover :items="items"></b-table>
  </div>
</template>

<script>
export default {
    name: 'Table',
    props: {
        items: Array
    }

}
</script>

<style>

</style>