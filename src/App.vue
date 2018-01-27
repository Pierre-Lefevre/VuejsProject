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
          <li class="hvr-grow">
            <router-link :to="{name: 'Home'}" class="color-orange" tag="a">
              <h2 :class="this.$route.name === 'Home' ? 'underline' : ''">Accueil</h2>
            </router-link>
          </li>
          <li class="hvr-grow" v-if="!isLoggedIn">
            <router-link :to="{name: 'SignIn'}" class="color-green" tag="a">
              <h2 :class="this.$route.name === 'SignIn' ? 'underline' : ''">Connexion</h2>
            </router-link>
          </li>
          <li class="hvr-grow" v-if="!isLoggedIn">
            <router-link :to="{name: 'SignUp'}" class="color-blue" tag="a">
              <h2 :class="this.$route.name === 'SignUp' ? 'underline' : ''">Inscription</h2>
            </router-link>
          </li>
          <li class="hvr-grow" v-if="isLoggedIn">
            <router-link :to="{name: 'Learn'}" class="color-green" tag="a">
              <h2 :class="this.$route.name === 'Learn' ? 'underline' : ''">Apprentissage</h2>
            </router-link>
          </li>
          <li class="hvr-grow" v-if="isLoggedIn && canAccessTest">
            <router-link :to="{name: 'Operation'}" class="color-red" tag="a">
              <h2 :class="this.$route.name === 'Operation' ? 'underline' : ''">Evaluation</h2>
            </router-link>
          </li>
          <li class="hvr-grow" v-if="isLoggedIn">
            <router-link :to="{name: 'Statistics'}" class="color-blue" tag="a">
              <h2 :class="this.$route.name === 'Statistics' ? 'underline' : ''">Statistiques</h2>
            </router-link>
          </li>
          <li class="hvr-grow" v-if="isLoggedIn">
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
    <footer class="background-blue">
      <save-load-progress></save-load-progress>
      <button @click="resetLocalStorage">Reset localstorage</button>
      <button @click="displayLocalStorage">Display localstorage</button>
    </footer>
    <alert></alert>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// import utils from '@/services/utils'
import lsm from '@/services/localStorageManager'
import Alert from '@/components/Alert'
import SaveLoadProgress from '@/components/SaveLoadProgress'

export default {
  name: 'App',
  components: {
    Alert,
    SaveLoadProgress
  },
  created () {
    lsm.init()
  },
  methods: {
    ...mapActions({processLogout: 'logout'}),
    canAccessTest () {
      // return utils.canAccessTest()
      return true
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
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn'])
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Lato:300,400,700');

  @font-face {
    font-family: 'TrashHand';
    src: url('assets/webfont/TrashHand-webfont.woff');
    font-weight: normal;
    font-style: normal;
  }

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
    font-size: 3em;
  }

  h2 {
    font-size: 2em;
  }

  p, table * {
    font-size: 2rem;
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

  .btn-primary {
    cursor: pointer;
    color: #FFFFFF;
    font-size: 1rem;
    border-radius: 4px;
    padding: 10px 15px;
    border: none;
  }

  #app {
    font-family: 'Lato', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    min-height: 100vh;
    margin: 0 auto;
    position: relative;
  }

  .font-monster {
    font-family: 'TrashHand', 'Avenir', Helvetica, Arial, sans-serif;
    font-size: xx-large;
  }

  .background-grey {
    background-color: lightgray;
  }

  .background-blue {
    background-color: #2c3e50;
  }

  .background-green {
    background-color: #40AE8A;
  }

  .background-yellow {
    background-color: #FFD86F;
  }

  .background-orange {
    background-color: #F49E5A;
  }

  .background-red {
    background-color: #EB5F50;
  }

  .color-blue {
    color: #2c3e50;
  }

  .border-blue {
    border-color: #2c3e50;
  }

  .color-green {
    color: #40AE8A;
  }

  .color-yellow {
    color: #FFD86F;
  }

  .color-orange {
    color: #F49E5A;
  }

  .color-red {
    color: #EB5F50;
  }

  .underline {
    text-decoration: underline;
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
    margin: 2rem auto auto;
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
    padding: 20px;
  }

  footer {
    color: white;
    justify-content: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 2rem 1rem;
    margin-top: 2rem;
    max-height: 100px;
  }

  main {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 2rem 2rem calc(100px + 2rem);
  }

  #logo {
    margin: 0 20px;
    width: 30%;
    display: flex;
    justify-content: center;
  }

  #logo > a {
    width: 100%;
  }

  #logo img {
    height: 200px;
    width: 100%;
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
