<template>
  <div>
    <form @submit.prevent="login()">
      <input type="text" placeholder="Pseudo" v-model="pseudo">
      <input type="password" placeholder="Mot de passe" v-model="password">
      <button type="submit" class="btn-primary">Connexion</button>
    </form>
  </div>
</template>

<script>
import user from '@/components/auth'
import { EventBus } from '@/components/eventBus'

export default {
  name: 'signIn',
  data () {
    return {
      pseudo: '',
      password: ''
    }
  },
  created () {
    if (this.$route.params.pseudo !== undefined) {
      this.pseudo = this.$route.params.pseudo
    }
  },
  methods: {
    login () {
      user.login({
        pseudo: this.pseudo,
        password: this.password
      }).then(() => {
        this.$router.push('/')
      }, (err) => {
        EventBus.$emit('alert', {type: 'error', message: err.message})
      })
    }
  }
}
</script>

<style scoped>

</style>
