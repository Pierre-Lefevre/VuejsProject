<template>
  <div>
    <ul>
      <div :key="i" v-for="(factor1, i) in statsTab">
        <h1>Table de {{ i }}</h1>
        <table cellspacing="0">
          <col width="40px" />
          <col width="40px" />
          <col width="40px" />
          <col width="40px" />
          <col width="40px" />
          <col width="40px" />
          <col width="40px" />
          <col width="40px" />
          <col width="40px" />
          <col width="40px" />
          <col width="40px" />
          <thead>
            <tr>
              <th></th>
              <th :key="k" v-for="k in 10">{{ k }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{{ i }}</th>
              <td :key="j" v-for="j in 10" :class="deduceCellColor(i, j)">
                <span style="display: none">
                {{ statsTab[i] !== undefined && statsTab[i][j] !== undefined ? statsTab[i][j].avgErrors : "?" }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- <p :key="j" v-for="(factor2, j) in factor1">
          {{ i }} * {{ j }} =>
          Nombre d'erreurs moyen : {{ factor2.avgErrors }}
        </p> -->
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
    },
    deduceCellColor (factor1, factor2) {
      let sumAvgErrors = 0
      let count = 0
      if (this.statsTab[factor1] !== undefined && this.statsTab[factor1][factor2] !== undefined) {
        sumAvgErrors += this.statsTab[factor1][factor2].avgErrors
        count++
      }
      if (this.statsTab[factor2] !== undefined && this.statsTab[factor2][factor1] !== undefined) {
        sumAvgErrors += this.statsTab[factor2][factor1].avgErrors
        count++
      }
      if (count === 0) {
        return 'background-grey'
      }
      let errorsAverage = sumAvgErrors / count
      switch (true) {
        case (errorsAverage >= 0 && errorsAverage < 1):
          return 'background-green'
        case (errorsAverage >= 1 && errorsAverage < 3):
          return 'background-yellow'
        case (errorsAverage >= 3 && errorsAverage < 6):
          return 'background-orange'
        case (errorsAverage >= 6 && errorsAverage <= 9):
          return 'background-red'
        default:
          console.log('Switch failed')
          break
      }
    }
  }
}
</script>

<style scoped>
  table {
    table-layout:fixed
  }
  th:not(:last-child) {
    border-right: 1px solid black;
  }
  tbody th {
    border-top: 1px solid black;
  }
  td {
    border-top: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
  }
</style>
