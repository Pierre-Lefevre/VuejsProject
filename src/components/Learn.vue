<template>
  <div>
    <ul>
      <li :key="n" v-for="n in 10">
        <router-link :to="{name: 'OperationTable', params: {id: n}}" tag="button">{{ n }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'learn'
}
</script>

<style scoped>

</style>
