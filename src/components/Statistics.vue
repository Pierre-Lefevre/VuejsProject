<template>
  <div>
    <ul>
      <div :key="i" v-for="(factor1, i) in statsTab">
        <h1>Table du {{ i }}</h1>
        <p :key="j" v-for="(factor2, j) in factor1">
          {{ i }} * {{ j }} =>
          Nombre d'erreurs moyen : {{ factor2.avgErrors }}
        </p>
      </div>
    </ul>
  </div>
</template>

<script>
import lsm from '@/services/localStorageManager'

export default {
  name: 'statistics',
  data () {
    return {
      globalHistory: [],
      statsTab: {}
    }
  },
  created () {
    this.globalHistory = lsm.getValueUser('history')
    console.log(this.globalHistory)
    this.updateStats()
  },
  methods: {
    updateStats () {
      this.globalHistory.forEach(function (session) {
        session.forEach(function (operation) {
          if (this.statsTab[operation.factor1] === undefined) {
            this.statsTab[operation.factor1] = {}
          }
          if (this.statsTab[operation.factor1][operation.factor2] === undefined) {
            this.statsTab[operation.factor1][operation.factor2] = {nbErrors: 0, count: 0, avgErrors: 0}
          }
          if (this.statsTab[operation.factor2] === undefined) {
            this.statsTab[operation.factor2] = {}
          }
          if (this.statsTab[operation.factor2][operation.factor1] === undefined) {
            this.statsTab[operation.factor2][operation.factor1] = {nbErrors: 0, count: 0, avgErrors: 0}
          }
          this.statsTab[operation.factor1][operation.factor2].nbErrors += operation.nbErrors
          this.statsTab[operation.factor2][operation.factor1].nbErrors += operation.nbErrors
          this.statsTab[operation.factor1][operation.factor2].count++
          this.statsTab[operation.factor2][operation.factor1].count++
          this.statsTab[operation.factor1][operation.factor2].avgErrors = this.statsTab[operation.factor1][operation.factor2].nbErrors / this.statsTab[operation.factor1][operation.factor2].count
          this.statsTab[operation.factor2][operation.factor1].avgErrors = this.statsTab[operation.factor2][operation.factor1].nbErrors / this.statsTab[operation.factor2][operation.factor1].count
        }.bind(this))
      }.bind(this))
      console.log(this.statsTab)
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
