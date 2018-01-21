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
            <router-link :to="{name: 'Home'}" tag="a" class="color-orange">Accueil</router-link>
          </li>
          <li class="hvr-grow-rotate">
            <router-link :to="{name: 'Learn'}" tag="a" class="color-green">Apprentissage</router-link>
          </li>
          <li class="hvr-grow-rotate">
            <router-link :to="{name: 'Operation'}" tag="a" class="color-green">Evaluation</router-link>
          </li>
          <li class="hvr-grow-rotate">
            <router-link :to="{name: 'Statistics'}" tag="a" class="color-green">Statistiques</router-link>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <alert></alert>
      <router-view/>
    </main>
    <footer class="background-yellow">
      <save-load-progress></save-load-progress>
      <button @click="resetLocalStorage">Reset localstorage</button>
    </footer>
  </div>
</template>

<script>
import Alert from '@/components/Alert'
import SaveLoadProgress from '@/components/SaveLoadProgress'
import lsm from '@/components/localStorageManager'

export default {
  name: 'App',
  components: {
    Alert,
    SaveLoadProgress
  },
  methods: {
    resetLocalStorage () {
      lsm.clear()
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

  #app {
    font-family: 'TrashHand','Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 2rem;
    color: #2c3e50;
    min-height: 100vh;
    margin:0 auto;
    position:relative;
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
    justify-content: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 2rem 1rem;
  }

  main {
    padding: 2rem 1rem;
  }

  #logo {
    margin-right: 0;
    margin-left: 10rem;
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
