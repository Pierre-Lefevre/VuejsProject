<template>
  <div id="app">
    <nav id="navbar">
      <ul>
        <li>
          <router-link :to="{name: 'Home'}" tag="a">Accueil</router-link>
        </li>
        <li>
          <router-link :to="{name: 'Learn'}" tag="a">Apprentissage</router-link>
        </li>
        <li>
          <router-link :to="{name: 'Operation'}" tag="a">Evaluation</router-link>
        </li>
      </ul>
    </nav>
    <button @click="resetLocalStorage">Reset localstorage</button>
    <save-load-progress></save-load-progress>
    <router-view/>
    <alert></alert>
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
    color: inherit;
    text-decoration: none;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    min-height: 100vh;
  }

  #navbar ul {
    display: flex;
  }

  #navbar ul a {
    display: block;
    padding: 10px 20px;
  }
</style>
