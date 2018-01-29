<template>
  <div>
    <h1 class="color-blue">Statistiques</h1>
    <save-load-progress id="progress-btns"/>
    <p id="indication">En survolant les cases colorées, tu peux voir ton nombre d'erreurs moyen.</p>
    <ul id="tables-stats">
      <li :key="i" v-for="(factor1, i) in statsTab">
        <h1>Table de {{ i }}</h1>
        <div id="pie-wrapper">
          <pie :data="pie[i]" :width="200" :height="200" :options="{responsive: true, maintainAspectRatio: false}"></pie>
        </div>
        <table cellspacing="0">
          <thead>
            <tr>
              <th></th>
              <th :key="k" v-for="k in 10">{{ k }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{{ i }}</th>
              <td :key="j" v-for="(factor2, j) in factor1" :class="factor2.classColor" class="popover-wrapper">
                <div class="popover-content bg-blue" v-if="factor2.classColor != 'bg-grey'">
                  <span>Nombre d'erreurs moyen</span>
                  <div>
                    <h3>{{ i + ' x ' + j }} : </h3>
                    {{ statsTab[i] !== undefined && statsTab[i][j] !== undefined && statsTab[i][j].avgErrors != -1 ? $options.filters.round(statsTab[i][j].avgErrors, 2) : "-" }}
                  </div>
                  <div v-if="i != j">
                    <h3>{{ j + ' x ' + i }} : </h3>
                    {{ statsTab[j] !== undefined && statsTab[j][i] !== undefined && statsTab[j][i].avgErrors != -1 ? $options.filters.round(statsTab[j][i].avgErrors, 2) : "-" }}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </li>
    </ul>
    <!--<button class="hvr-grow btn-primary bg-green" @click="window.print()">Imprimer les statistiques</button>-->
    <achievements class="achievements"/>
  </div>
</template>

<script>
import lsm from '@/services/localStorageManager'
import Pie from '@/components/Pie'
import Achievements from '@/components/achievements'
import SaveLoadProgress from '@/components/SaveLoadProgress'

export default {
  name: 'statistics',
  components: {
    Pie,
    Achievements,
    SaveLoadProgress
  },
  data () {
    return {
      globalHistory: [],
      statsTab: {},
      levelInformation: {},
      pie: {}
    }
  },
  created () {
    if (lsm.getValueUser('history') !== undefined) {
      this.globalHistory = lsm.getValueUser('history')
      this.updateStats()
      this.initializePies()
    }
  },
  methods: {
    // Construit le tableau stockant les statistiques des résultats.
    updateStats () {
      // Initialise le tableau
      for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
          if (this.statsTab[i] === undefined) {
            this.statsTab[i] = {}
          }
          this.statsTab[i][j] = {nbErrors: -1, count: -1, avgErrors: -1, classColor: null}
        }
      }
      // Remplissage du tableau.
      this.globalHistory.forEach(session => {
        session.forEach(operation => {
          if (this.statsTab[operation.factor1][operation.factor2].nbErrors === -1) {
            this.statsTab[operation.factor1][operation.factor2] = {nbErrors: 0, count: 0, avgErrors: 0, classColor: null}
          }
          this.statsTab[operation.factor1][operation.factor2].nbErrors += operation.nbErrors
          this.statsTab[operation.factor1][operation.factor2].count++
          this.statsTab[operation.factor1][operation.factor2].avgErrors = this.statsTab[operation.factor1][operation.factor2].nbErrors / this.statsTab[operation.factor1][operation.factor2].count
        })
      })
      for (let i = 1; i <= 10; i++) {
        this.levelInformation[i] = {greenCount: 0, yellowCount: 0, orangeCount: 0, redCount: 0, greyCount: 0}
        for (let j = 1; j <= 10; j++) {
          this.deduceCellColor(i, j)
        }
      }
    },
    // Met à jour la couleur de fond de la cellule en fonction de la moyenne des erreurs faites sur les opérations factor1 * factor2 et factor2 * factor1.
    deduceCellColor (factor1, factor2) {
      let sumAvgErrors = 0
      let count = 0
      if (this.statsTab[factor1] !== undefined && this.statsTab[factor1][factor2] !== undefined && this.statsTab[factor1][factor2].avgErrors !== -1) {
        sumAvgErrors += this.statsTab[factor1][factor2].avgErrors
        count++
      }
      if (this.statsTab[factor2] !== undefined && this.statsTab[factor2][factor1] !== undefined && this.statsTab[factor2][factor1].avgErrors !== -1) {
        sumAvgErrors += this.statsTab[factor2][factor1].avgErrors
        count++
      }
      let classColor = ''
      let errorsAverage = sumAvgErrors / count
      switch (true) {
        case (errorsAverage >= 0 && errorsAverage < 1):
          classColor = 'bg-green'
          this.levelInformation[factor1].greenCount++
          break
        case (errorsAverage >= 1 && errorsAverage < 3):
          classColor = 'bg-yellow'
          this.levelInformation[factor1].yellowCount++
          break
        case (errorsAverage >= 3 && errorsAverage < 6):
          classColor = 'bg-orange'
          this.levelInformation[factor1].orangeCount++
          break
        case (errorsAverage >= 6 && errorsAverage <= 9):
          classColor = 'bg-red'
          this.levelInformation[factor1].redCount++
          break
        default:
          classColor = 'bg-grey'
          this.levelInformation[factor1].greyCount++
          break
      }
      this.statsTab[factor1][factor2].classColor = classColor
      this.statsTab[factor2][factor1].classColor = classColor
    },
    initializePies () {
      let keyCount = ['greenCount', 'yellowCount', 'orangeCount', 'redCount', 'greyCount']
      let availableLabels = ['Parfaitement sue', 'Presque sue', 'Moyennement retenue', 'Pas retenue du tout', 'Pas encore testée']
      let availableColors = ['#4E950B', '#FCC007', '#EA5C1C', '#BE1621', '#D3D3D3']
      for (let i = 1; i <= 10; i++) {
        let labels = []
        let colors = []
        let data = []
        for (let j = 0; j < keyCount.length; j++) {
          if (this.levelInformation[i][keyCount[j]] > 0) {
            labels.push(availableLabels[j])
            colors.push(availableColors[j])
            data.push(this.levelInformation[i][keyCount[j]])
          }
        }
        this.pie[i] = {
          labels: labels,
          colors: colors,
          data: data
        }
      }
    }
  }
}
</script>

<style scoped>

  #indication {
    text-align: center;
    margin-bottom: 1rem;
  }

  #tables-stats {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  #tables-stats li {
    position: relative;
    margin: 20px;
    padding: 1rem;
    background-color: #F3F4F5;
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    border: 4px solid #F3F4F5;
  }

  table {
    background-color: white;
    margin-top: 1rem;
  }

  table th, table td {
    width: 40px;
    height: 40px;
    text-align: center;
    border-right: 2px solid #F3F4F5;
    border-bottom: 2px solid #F3F4F5;
  }

  table td.bg-green, table td.bg-yellow, table td.bg-orange, table td.bg-red {
    cursor: pointer;
  }

  .popover-wrapper {
    position: relative;
  }

  .popover-content {
    opacity: 0;
    visibility: hidden;
    position: absolute;
    left: calc(-180px / 2 + 20px);
    transform: translate(0, 10px);
    padding: 1rem;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
    width: 180px;
    top: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .popover-content h3 {
    display: inline-block;
  }

  .popover-content span {
    font-size: small;
    margin-bottom: 0.5rem;
  }

  .popover-content:before {
    position: absolute;
    z-index: -1;
    content: '';
    right: calc(50% - 10px);
    top: -10px;
    border-style: solid;
    border-width: 0 10px 10px 10px;
    border-color: transparent transparent #2C3E50 transparent;
    transition-duration: 0.3s;
    transition-property: transform;
  }

  .popover-wrapper:hover .popover-content {
    z-index: 10;
    opacity: 1;
    visibility: visible;
    transform: translate(0, -20px);
    transition: all 0.5s cubic-bezier(0.75, -0.02, 0.2, 0.97);
  }

  .achievements {
    margin-top: 3rem;
  }

  #progress-btns {
    display: flex;
    justify-content: center;
    margin: 2rem;
  }
</style>
