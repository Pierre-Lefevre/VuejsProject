<template>
  <div>
    <home-auth v-if="check"></home-auth>
    <home-guest v-if="!check"></home-guest>
  </div>
</template>

<script>
// import utils from '@/services/utils'
import user from '@/services/auth'
import homeAuth from '@/components/HomeAuth'
import homeGuest from '@/components/HomeGuest'

export default {
  name: 'home',
  components: {
    homeAuth,
    homeGuest
  },
  computed: {
    check () {
      return user.check()
    }
  }
}
</script>

<style scoped>

</style>
