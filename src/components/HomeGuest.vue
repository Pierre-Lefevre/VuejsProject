<template>
  <div>
    <h1>Qui es-tu ?</h1>
    <ul>
      <li :key="i" v-for="(user, i) in users">
        <router-link :to="{name: 'SignIn', params: { pseudo: user.pseudo }}" tag="a" class="color-orange">{{ user.firstname }} {{ user.lastname }}</router-link>
      </li>
    </ul>
    <router-link :to="{name: 'SignUp'}" tag="button" class="btn-primary">Ajouter</router-link>
  </div>
</template>

<script>
import lsm from '@/components/localStorageManager'

export default {
  name: 'homeGuest',
  data () {
    return {
      users: []
    }
  },
  created () {
    this.users = lsm.getValue('users')
  }
}
</script>

<style scoped>

</style>
