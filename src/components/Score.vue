<template>
  <pre>{{ operations }}</pre>
</template>

<script>
export default {
  name: 'score',
  data () {
    return {
      operations: []
    }
  },
  created () {
    this.operations = JSON.parse(localStorage.data).operations
  }
}
</script>

<style scoped>

</style>
