<template>
  <div>
    <ul>
      <!--<li :key="i" v-for="(sessionHistory, i) in globalHistory">
        <ul>
          <li :key="j" v-for="(operation, j) in sessionHistory">
            {{ operation.facteur1 }} * {{ operation.facteur2 }}
          </li>
        </ul>
      </li>-->
      <li :key="i" v-for="(operation, i) in finalTab">
        <p>{{ operation.facteur1 }} x {{ operation.facteur2 }}</p>
        <p>Nombre d'erreurs moyen : {{ operation.nbErrors }}</p>
      </li>
    </ul>
    <pre>{{ globalHistory }}</pre>
    <p>{{ count }}</p>
    <p>{{ finalTab.length }}</p>
    <pre>{{ finalTab }}</pre>
  </div>
</template>

<script>
export default {
  name: 'statistics',
  data () {
    return {
      globalHistory: [],
      finalTab: [],
      count: 0
    }
  },
  created () {
    this.globalHistory = JSON.parse(localStorage.history)
    this.updateStats()
  },
  methods: {
    updateStats () {
      let similar
      this.globalHistory.forEach(function (session) {
        session.forEach(function (operation) {
          this.count++
          similar = false
          for (let i = 0; i < this.finalTab.length; i++) {
            if (operation.facteur1 === this.finalTab[i].facteur1 && operation.facteur2 === this.finalTab[i].facteur2) {
              this.finalTab[i].nbErrors = (this.finalTab[i].nbErrors + operation.nbErrors) / 2
              similar = true
              break
            }
          }
          if (!similar) this.finalTab.push(operation)
        }.bind(this))
      }.bind(this))
    }
  }
}
</script>

<style scoped>
  ul li ul li:nth-child(odd) {
    background-color: yellowgreen;
  }
  ul li ul li:nth-child(even) {
    background-color: hotpink;
  }
  pre:nth-child(even) {
    background-color: dodgerblue;
  }
  pre:nth-child(odd) {
    background-color: orange;
  }
</style>
