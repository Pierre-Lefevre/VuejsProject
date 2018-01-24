<template>
  <div>
    <home-auth v-if="check"></home-auth>
    <home-guest v-if="!check"></home-guest>
  </div>
</template>

<script>
// import utils from '@/components/utils'
import user from '@/components/auth'
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
