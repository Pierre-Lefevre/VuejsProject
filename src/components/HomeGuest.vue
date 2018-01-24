<template>
  <div>
    <h1 class="color-green">Qui es-tu ?</h1>
    <ul class="list">
      <li :key="i" v-for="(user, i) in users" class="hvr-hang">
        <router-link :to="{name: 'SignIn', params: { pseudo: user.pseudo }}" tag="div" class="color-blue font-monster"><span>{{ user.firstname }}</span><span>{{ user.lastname }}</span></router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import lsm from '@/services/localStorageManager'

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
  .list li {
    height: 150px;
    width: 170px;
    background-image: url("../assets/img/card.svg");
    background-size: cover;
  }
</style>
