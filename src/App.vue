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
            <router-link :to="{name: 'Home'}" tag="a" class="color-orange"><h2>Accueil</h2></router-link>
          </li>
          <li class="hvr-grow-rotate">
            <router-link :to="{name: 'SignIn'}" tag="a" class="color-orange" v-if="!check"><h2>Connexion</h2></router-link>
          </li>
          <li class="hvr-grow-rotate">
            <a class="color-orange" v-if="check" @click="logout"><h2>Déconnexion</h2></a>
          </li>
          <li class="hvr-grow-rotate">
            <router-link :to="{name: 'Learn'}" tag="a" class="color-green" v-if="check"><h2>Apprentissage</h2></router-link>
          </li>
          <li class="hvr-grow-rotate">
            <router-link :to="{name: 'Operation'}" tag="a" class="color-red" v-if="check && canAccessTest"><h2>Evaluation</h2></router-link>
          </li>
          <li class="hvr-grow-rotate">
            <router-link :to="{name: 'Statistics'}" tag="a" class="color-blue" v-if="check"><h2>Statistiques</h2></router-link>
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
// import utils from '@/components/utils'
import lsm from '@/components/localStorageManager'
import Alert from '@/components/Alert'
import SaveLoadProgress from '@/components/SaveLoadProgress'
import user from '@/components/auth'

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
      user.logout()
      this.$router.push({name: 'Home'})
    }
  },
  computed: {
    check () {
      return user.check()
    }
  }
}
</script>

<style>
  @font-face {
    font-family: 'TrashHand';
    src: url('assets/webfont/TrashHand-webfont.woff');
    font-weight: normal;
    font-style: normal;
  }

  * {
    box-sizing: border-box;
  }

  body, ul, p {
    margin: 0;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  a, a:link, a:visited, a:hover, a:active {
    text-decoration: none;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'TrashHand', 'Avenir', Helvetica, Arial, sans-serif;
    font-weight: normal;
  }

  h1 {
    font-size: 3em;
  }

  h2 {
    font-size: 2em;
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

  button.btn-primary {
    cursor: pointer;
    padding: 5px 10px;
    color: #FFFFFF;
    background-color: #007BFF;
    border: 1px solid #007BFF;
    font-size: 1rem;
    border-radius: 4px;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    min-height: 100vh;
    margin: 0 auto;
    position: relative;
  }

  .font-monster {
    font-family: 'TrashHand', 'Avenir', Helvetica, Arial, sans-serif;
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

  .hvr-grow-rotate {
    display: inline-block;
    vertical-align: middle;
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px transparent;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-property: transform;
    transition-property: transform;
  }

  .hvr-grow-rotate:hover, .hvr-grow-rotate:focus, .hvr-grow-rotate:active {
    -webkit-transform: scale(1.1) rotate(4deg);
    transform: scale(1.1) rotate(4deg);
  }

  header, footer {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  header {
    justify-content: space-between;
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
    margin-right: 0;
    margin-left: 10rem;
    margin-bottom: 0;
    justify-self: left;
  }

  #logo img {
    height: 200px;
  }

  #navbar {
    width: 100%;
  }

  #navbar ul {
    display: flex;
    justify-content: center;
  }

  #navbar ul a {
    display: block;
    padding: 10px 20px;
  }
</style>
