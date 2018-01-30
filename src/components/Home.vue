<template>
  <div>
    <home-auth v-if="isLoggedIn"/>
    <home-guest v-if="!isLoggedIn"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import homeAuth from '@/components/HomeAuth'
import homeGuest from '@/components/HomeGuest'

export default {
  name: 'home',
  components: {
    homeAuth,
    homeGuest
  },
  computed: {
    ...mapGetters(['isLoggedIn'])
  }
}
</script>

<style scoped>

</style>
