<template>
  <div>
    <h1>Score</h1>
    <div id="pie-wrapper">
      <pie :data="pie" :width="350" :height="350" :options="{responsive: true, maintainAspectRatio: false}"></pie>
    </div>
    <p v-if="getReferenceTime()">Temps de référence : {{ getReferenceTime() / 1000 | round(2) }} {{ pluralize('seconde', getReferenceTime() / 1000) }}</p>
    <table cellspacing="0">
      <thead>
        <tr>
          <th>Opération</th>
          <th>Résultat</th>
          <th>Réponse(s) erronée(s)</th>
          <th>Nombre d'erreurs</th>
          <th>Temps</th>
        </tr>
      </thead>
      <tr :key="i" v-for="(operation, i) in operations">
        <td>{{ operation.factor1 }} x {{ operation.factor2 }}</td>
        <td>{{ operation.goodAnswer }}</td>
        <td>{{ getBadAnswers(operation.badAnswers) }}</td>
        <td>{{ operation.nbErrors }}</td>
        <td>{{ operation.time / 1000 | round(2) }} {{ pluralize('seconde', operation.time / 1000) }}</td>
      </tr>
      <tfoot>
        <tr>
          <th colspan="3">Total</th>
          <td>{{ getNbTotalError() }}</td>
          <td>{{ getTotalTime() / 1000 | round(2) }} seconde{{ getTotalTime() >= 2 ? 's' : '' }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import lsm from '@/services/localStorageManager'
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
        colors: ['#4E950B', '#BE1621']
      }
    }
  },
  created () {
    // Retour à la page d'accueil s'il n'y a pas de données dans l'historique.
    if (!lsm.keyExistsUser('history')) {
      this.$router.push({name: 'Home'})
      return
    }

    // Récupération de la dernière session dans l'historique.
    let history = lsm.getValueUser('history')
    this.operations = history[history.length - 1]
    this.pie.data = [10, this.getNbTotalError()]
  },
  methods: {

    // Retourne le temps de référence de l'élève calculé sur la table de 1
    getReferenceTime () {
      return lsm.getValueUser('referenceTime')
    },

    // Retourne le nombre total d'erreurs.
    getNbTotalError () {
      let sum = 0
      this.operations.forEach(operation => {
        sum += operation.nbErrors
      })
      return sum
    },

    // Retourne le temps total passé.
    getTotalTime () {
      let sum = 0
      this.operations.forEach(operation => {
        sum += operation.time
      })
      return sum
    },

    // Retourne une chaîne correctement formatée contenant les erreurs effectuées.
    getBadAnswers (badAnswers) {
      let str = ''
      badAnswers.forEach((badAnswer, i) => {
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

    // Retourne une chaîne pluralisée, ou non, en fonction d'un compteur.
    pluralize (string, count) {
      return count >= 2 ? string + 's' : string
    }
  }
}
</script>

<style scoped>
  #pie-wrapper {
    margin-bottom: 2rem;
  }

  table {
    background-color: white;
    margin-top: 1rem;
  }

  table th, table td {
    text-align: center;
    border-right: 2px solid #F3F4F5;
    border-bottom: 2px solid #F3F4F5;
    padding: 5px 10px;
  }

  table td:last-child, table th:last-child {
    border-right: none;
  }

  table tr:last-child td, table tr:last-child th{
    border-bottom: none;
  }
</style>
