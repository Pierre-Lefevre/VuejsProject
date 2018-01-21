<template>
  <div>
    <router-link :to="{name: 'Learn'}" tag="button">Apprentissage</router-link>
    <router-link :to="{name: 'Operation'}" tag="button" v-if="canAccessTest()">Evaluation</router-link>
  </div>
</template>

<script>
// import utils from '@/components/utils'

export default {
  name: 'home',
  methods: {
    canAccessTest () {
      // return utils.canAccessTest()
      return true
    }
  }
}
</script>

<style scoped>

</style>
