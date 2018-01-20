<template>
  <div>
    <div id="pie-wrapper">
      <pie :data="pie" :width="350" :height="350" :options="{responsive: true, maintainAspectRatio: false}"></pie>
    </div>
    <table>
      <thead>
        <tr>
          <th>Opérations</th>
          <th>Réponse</th>
          <th>Erreurs</th>
          <th>Nombre d'erreurs</th>
          <th>Temps</th>
        </tr>
      </thead>
      <tr :key="i" v-for="(operation, i) in operations">
        <td>{{ operation.facteur1 }} x {{ operation.facteur2 }}</td>
        <td>{{ operation.goodAnswer }}</td>
        <td>{{ getBadAnswers(operation.badAnswers) }}</td>
        <td>{{ operation.nbErrors }}</td>
        <td>{{ operation.time / 1000 | round(2) }} {{ pluralize('seconde', operation.time / 1000) }}</td>
      </tr>
      <tfoot>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td>{{ getNbTotalError() }}</td>
          <td>{{ getTotalTime() / 1000 | round(2) }} seconde{{ getTotalTime() >= 2 ? 's' : '' }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import Pie from '@/components/Pie'

export default {
  name: 'score',
  components: {
    Pie
  },
  data () {
    return {
      operations: [],
      pie: {
        labels: ['Bonnes réponses', 'Mauvaises réponses'],
        colors: ['#2ecc71', '#e74c3c']
      }
    }
  },
  created () {
    let history = JSON.parse(localStorage.history)
    this.operations = history[history.length - 1]
    this.pie.data = [10, this.getNbTotalError()]
  },
  methods: {
    getNbTotalError () {
      let sum = 0
      this.operations.forEach(function (operation) {
        sum += operation.nbErrors
      })
      return sum
    },
    getTotalTime () {
      let sum = 0
      this.operations.forEach(function (operation) {
        sum += operation.time
      })
      return sum
    },
    getBadAnswers (badAnswers) {
      let str = ''
      badAnswers.forEach(function (badAnswer, i) {
        str += badAnswer
        if (i < badAnswers.length - 1) {
          str += ', '
        }
      })
      if (str === '') {
        str = '-'
      }
      return str
    },
    pluralize (string, count) {
      return count >= 2 ? string + 's' : string
    }
  },
  filters: {
    round (value, decimal) {
      if (!value) {
        return ''
      }
      let factor = Math.pow(10, decimal)
      return Math.round(value * factor) / factor
    }
  }
}
</script>

<style>

</style>
