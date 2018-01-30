<template>
  <div>
    <h1 class="color-blue">Inscription</h1>
    <form @submit.prevent="signUp">
      <input type="text" placeholder="Prénom" v-model="firstname">
      <input type="text" placeholder="Nom" v-model="lastname">
      <input type="text" placeholder="Pseudo" v-model="pseudo">
      <input type="password" placeholder="Mot de passe" v-model="password">
      <button type="submit" class="btn-primary bg-blue hvr-grow">S'inscrire</button>
    </form>
  </div>
</template>

<script>
import lsm from '@/services/localStorageManager'
import { eventBus } from '@/services/eventBus'
import crypto from 'crypto-js'

export default {
  name: 'signUp',
  data () {
    return {
      firstname: '',
      lastname: '',
      pseudo: '',
      password: ''
    }
  },
  methods: {
    signUp () {
      // Vérifie que tous les champs sont renseignés.
      if (this.firstname === '' || this.lastname === '' || this.pseudo === '' || this.password === '') {
        eventBus.$emit('alert', {type: 'error', message: 'Tu dois remplir tous les champs.'})
        return
      }

      // Ajout de l'utilisateur au localStorage.
      lsm.pushValue('users', {firstname: this.firstname, lastname: this.lastname, pseudo: this.pseudo, password: crypto.SHA256(this.password).toString(crypto.enc.Hex)})
      this.$router.push({name: 'Users'})
    }
  }
}
</script>

<style scoped>

</style>
