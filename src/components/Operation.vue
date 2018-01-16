<template>
  <div>
    {{ operations }}
  </div>
</template>

<script>
export default {
  name: 'operation',
  data () {
    return {
      operations: this.generateOperations()
    }
  },
  methods: {
    generateOperations () {
      let operations = []

      for (let i = 1; i <= 10; i++) {
        if ((Math.random() > 0.5) ? 1 : 0) {
          operations.push(this.$route.params.id + ' * ' + i)
        } else {
          operations.push(i + ' * ' + this.$route.params.id)
        }
      }

      for (let i = 0; i < operations.length; i++) {
        let operation = operations.splice(i, 1)[0]
        operations.splice(Math.floor(Math.random() * operations.length), 0, operation)
      }

      return operations
    }
  }
}
</script>

<style scoped>

</style>
