<template>
  <div>
    <router-link :to="{name: 'Learn'}" class="btn-primary bg-green" tag="button">Apprentissage</router-link>
    <router-link :to="{name: 'Operation'}" class="btn-primary bg-red" tag="button" v-if="canAccessTest()">Evaluation</router-link>
  </div>
</template>

<script>
// import utils from '@/services/utils'

export default {
  name: 'homeAuth',
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
