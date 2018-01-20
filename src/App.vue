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
    <!--<img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    resetLocalStorage () {
      console.log(localStorage)
      localStorage.clear()
      console.log(localStorage)
    }
  }
}
</script>

<style>
  body, ul {
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
  }

  #navbar ul {
    display: flex;
  }

  #navbar ul a {
    display: block;
    padding: 10px 20px;
  }
</style>
