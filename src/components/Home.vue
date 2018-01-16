<template>
  <div>
    <router-link :to="{name: 'Learn'}" tag="button">Apprentissage</router-link>
    <router-link :to="{name: 'Operation'}" tag="button">Evaluation</router-link>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<style scoped>

</style>
