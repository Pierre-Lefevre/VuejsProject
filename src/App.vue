<template>
  <div id="app">
    <header>
      <figure id="logo">
        <router-link :to="{name: 'Home'}" tag="a">
          <img src="./assets/img/logo.svg" alt="Logo de l'application">
        </router-link>
      </figure>
      <nav id="navbar">
        <ul>
          <li class="hvr-grow-rotate">
            <router-link :to="{name: 'Home'}" class="color-orange" tag="a">
              <h2 :class="{'border-bottom border-orange': this.$route.name === 'Home'}">Accueil</h2>
            </router-link>
          </li>
          <li class="hvr-grow-rotate" v-if="!isLoggedIn">
            <router-link :to="{name: 'SignIn'}" class="color-green" tag="a">
              <h2 :class="{'border-bottom border-green': this.$route.name === 'SignIn'}">Connexion</h2>
            </router-link>
          </li>
          <li class="hvr-grow-rotate" v-if="!isLoggedIn">
            <router-link :to="{name: 'SignUp'}" class="color-blue" tag="a">
              <h2 :class="{'border-bottom border-blue': this.$route.name === 'SignUp'}">Inscription</h2>
            </router-link>
          </li>
          <li class="hvr-grow-rotate" v-if="isLoggedIn">
            <router-link :to="{name: 'Learn'}" class="color-green" tag="a">
              <h2 :class="{'border-bottom border-green': this.$route.name === 'Learn' || this.$route.name === 'OperationTable'}">Apprentissage</h2>
            </router-link>
          </li>
          <li class="hvr-grow-rotate" v-if="isLoggedIn">
            <a class="color-red" @click="tryAccessTest">
              <h2 :class="{'border-bottom border-red': this.$route.name === 'Operation', 'color-grey': !canAccessTest()}">Evaluation</h2>
            </a>
          </li>
          <li class="hvr-grow-rotate" v-if="isLoggedIn">
            <router-link :to="{name: 'Statistics'}" class="color-blue" tag="a">
              <h2 :class="{'border-bottom border-blue': this.$route.name === 'Statistics'}">Statistiques</h2>
            </router-link>
          </li>
          <li class="hvr-grow-rotate" v-if="isLoggedIn">
            <a class="color-green" @click="logout">
              <h2>Déconnexion</h2>
            </a>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <router-view :key="$route.fullPath"/>
    </main>
    <footer class="bg-blue">
      <!-- Boutons permettant de débuguer le localStorage. -->
      <!--<button @click="resetLocalStorage">Reset localstorage</button>-->
      <!--<button @click="displayLocalStorage">Display localstorage</button>-->
      <p>Projet Vue.js - Master 2 DNR2i - Solène Dorey & Pierre Lefèvre</p>
    </footer>
    <alert/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import utils from '@/services/utils'
import lsm from '@/services/localStorageManager'
import { eventBus } from '@/services/eventBus'
import Alert from '@/components/Alert'

export default {
  name: 'App',
  components: {
    Alert
  },
  created () {
    lsm.init()
  },
  methods: {
    ...mapActions({processLogout: 'logout'}),
    canAccessTest () {
      return utils.canAccessTest()
    },
    resetLocalStorage () {
      lsm.clear()
    },
    displayLocalStorage () {
      console.log(localStorage)
    },
    logout () {
      this.processLogout()
      this.$router.push({name: 'Home'})
    },
    tryAccessTest (e) {
      if (!this.canAccessTest()) {
        eventBus.$emit('alert', {type: 'error', message: 'Tu dois t\'entraîner davantage !'})
        e.preventDefault()
      } else {
        this.$router.push({name: 'Operation'})
      }
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn'])
  }
}
</script>

<style>
  /***** Font *****/
  @import url('https://fonts.googleapis.com/css?family=Lato:300,400,700');

  @font-face {
    font-family: 'TrashHand';
    src: url('assets/webfont/TrashHand-webfont.woff');
    font-weight: normal;
    font-style: normal;
  }

  /***** Général *****/

  * {
    box-sizing: border-box;
  }

  body, ul, p, h1, h2, h3, h4 {
    margin: 0;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  a, a:link, a:visited, a:hover, a:active {
    text-decoration: none;
    margin: 0;
    padding: 0;
    display: block;
    outline-style: none;
    cursor: pointer;
  }

  h1, h2 {
    font-family: 'TrashHand', 'Lato', Helvetica, Arial, sans-serif;
    font-weight: 400;
  }

  h1 {
    font-size: 3rem;
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 2rem;
  }

  p, table * {
    font-size: 1.5rem;
  }

  form > *:not(:last-child) {
    margin-bottom: 10px;
  }

  form input[type="text"], form input[type="password"] {
    width: 100%;
    padding: 5px 10px;
    font-size: 1rem;
    color: #495057;
    border: 1px solid #CED4DA;
    border-radius: 4px;
  }

  #app {
    font-family: 'Lato', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2C3E50;
    min-height: 100vh;
    margin: 0 auto;
    position: relative;
  }

  .font-monster {
    font-family: 'TrashHand', 'Avenir', Helvetica, Arial, sans-serif;
    font-size: xx-large;
  }

  .bg-grey {
    background-color: #D3D3D3;
    color: white;
  }

  .color-grey {
    color: #D3D3D3;
  }

  .bg-blue {
    background-color: #2C3E50;
    color: white;
  }

  .color-blue {
    color: #2C3E50;
  }

  .border-blue {
    border-color: #2C3E50;
  }

  .bg-green {
    background-color: #4E950B;
    color: white
  }

  .color-green {
    color: #4E950B;
  }

  .border-green {
    border-color: #4E950B;
  }

  .bg-yellow {
    background-color: #FCC007;
  }

  .color-yellow {
    color: #FCC007;
  }

  .border-yellow {
    border-color: #FCC007;
  }

  .bg-orange {
    background-color: #EA5C1C;
  }

  .color-orange {
    color: #EA5C1C;
  }

  .border-yellow {
    border-color: #EA5C1C;
  }

  .bg-red {
    background-color: #BE1621;
    color: white;
  }

  .color-red {
    color: #BE1621;
  }

  .border-red {
    border-color: #BE1621;
  }

  .border-bottom {
    border-bottom: 4px solid;
  }

  .btn-primary {
    cursor: pointer;
    color: #FFFFFF;
    font-size: 1rem;
    border-radius: 4px;
    padding: 10px 15px;
    border: none;
  }

  .hvr-grow {
    display: inline-block;
    vertical-align: middle;
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px transparent;
    transition-duration: 0.3s;
    transition-property: transform;
  }

  .hvr-grow:hover, .hvr-grow:focus, .hvr-grow:active {
    transform: scale(1.1);
  }

  .hvr-grow-rotate {
    display: inline-block;
    vertical-align: middle;
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px transparent;
    transition-duration: 0.3s;
    transition-property: transform;
  }

  .hvr-grow-rotate:hover, .hvr-grow-rotate:focus, .hvr-grow-rotate:active {
    transform: scale(1.1) rotate(4deg);
  }

  .list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 60vw;
    margin: auto;
  }

  .list li {
    cursor: pointer;
    margin: 1rem;
  }

  .list li div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  @keyframes hvr-hang {
    0% {
      transform: translateY(8px);
    }
    50% {
      transform: translateY(4px);
    }
    100% {
      transform: translateY(8px);
    }
  }

  @keyframes hvr-hang-sink {
    100% {
      transform: translateY(8px);
    }
  }

  .hvr-hang {
    transform: perspective(1px) translateZ(0);
  }

  .hvr-hang:hover, .hvr-hang:focus, .hvr-hang:active {
    animation-name: hvr-hang-sink, hvr-hang;
    animation-duration: .3s, 1.5s;
    animation-delay: 0s, .3s;
    animation-timing-function: ease-out, ease-in-out;
    animation-iteration-count: 1, infinite;
    animation-fill-mode: forwards;
    animation-direction: normal, alternate;
  }

  header, footer {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  header {
    justify-content: space-between;
    width: 85vw;
    margin: auto;
    padding-top: 2rem;
  }

  footer {
    color: white;
    justify-content: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 2rem 1rem;
    margin-top: 2rem;
    min-height: 100px;
  }

  footer p {
    font-size: 1rem;
    text-align: center;
  }

  main {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 85vw;
    margin: auto;
    padding: 2rem 0 calc(100px + 2rem);
  }

  #logo {
    margin: 0;
    width: 30%;
    display: flex;
    justify-content: center;
  }

  #logo > a {
    width: 100%;
  }

  #logo img {
    height: 200px;
  }

  #navbar {
    width: 70%;
  }

  #navbar ul {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  #navbar ul li {
    margin: 5px 15px;
  }

  #navbar ul button {
    margin-left: 30px;
    outline-style: none;
  }
</style>
