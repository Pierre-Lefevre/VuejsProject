<template>
  <div>
    <router-link :to="{name: 'Learn'}" tag="button">Apprentissage</router-link>
    <router-link :to="{name: 'Operation'}" tag="button">Evaluation</router-link>
  </div>
</template>

<script>
export default {
  name: 'home',
  created () {
    localStorage.clear()
    console.log(localStorage)
  }
}
</script>

<style scoped>

</style>
