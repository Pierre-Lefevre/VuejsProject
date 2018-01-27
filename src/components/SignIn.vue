<template>
  <div>
    <form @submit.prevent="login()">
      <input type="text" placeholder="Pseudo" v-model="pseudo">
      <input type="password" placeholder="Mot de passe" v-model="password">
      <button type="submit" class="btn-primary background-green hvr-grow" ><h3>Se connecter</h3></button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { eventBus } from '@/services/eventBus'

export default {
  name: 'signIn',
  data () {
    return {
      pseudo: '',
      password: ''
    }
  },
  created () {
    // Pré-remplit, si possible, le champ pseudo.
    if (this.$route.params.pseudo !== undefined) {
      this.pseudo = this.$route.params.pseudo
    }
  },
  methods: {
    ...mapActions({processLogin: 'login'}),
    login () {
      // Promesse de connexion.
      this.processLogin({
        pseudo: this.pseudo,
        password: this.password
      }).then(() => {
        this.$router.push('/')
      }, (err) => {
        eventBus.$emit('alert', {type: 'error', message: err.message})
      })
    }
  }
}
</script>

<style scoped>

</style>
