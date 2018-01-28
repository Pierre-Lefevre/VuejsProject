<template>
  <div>
    <h1 class="color-blue">Statistiques</h1>
    <save-load-progress id="progress-btns"/>
    <ul id="tables-stats">
      <li :key="i" v-for="(factor1, i) in statsTab">
        <h1>Table de {{ i }}</h1>
        <div id="pie-wrapper">
          <pie :data="pie" :width="200" :height="200" :options="{responsive: true, maintainAspectRatio: false}"></pie>
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
              <td :key="j" v-for="j in 10" :class="deduceCellColor(i, j)" class="popover__wrapper">
                <div class="popover__content">
                  <div>
                    <h3>{{ i + ' x ' + j }}</h3>
                    {{ statsTab[i] !== undefined && statsTab[i][j] !== undefined ? statsTab[i][j].avgErrors : "Pas encore essayé." }}
                  </div>
                  <div>
                    <h3>{{ j + ' x ' + i }}</h3>
                    {{ statsTab[j] !== undefined && statsTab[j][i] !== undefined ? statsTab[j][i].avgErrors : "Pas encore essayé." }}
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- <p :key="j" v-for="(factor2, j) in factor1">
          {{ i }} * {{ j }} =>
          Nombre d'erreurs moyen : {{ factor2.avgErrors }}
        </p> -->
      </li>
    </ul>
    <!--<button class="hvr-grow btn-primary background-green" @click="window.print()">Imprimer les statistiques</button>-->
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
      pie: {
        labels: ['Parfaitement sue', 'Presque sue', 'Moyennement retenue', 'Pas retenue du tout', 'Pas encore testée'],
        colors: ['#4E950B', '#FCC007', '#EA5C1C', '#BE1621', '#d3d3d3']
      }
    }
  },
  created () {
    this.globalHistory = lsm.getValueUser('history')
    console.log(this.globalHistory)
    this.updateStats()
    this.pie.data = [10, 20, 30, 40]
  },
  methods: {
    updateStats () {
      this.globalHistory.forEach(session => {
        session.forEach(operation => {
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
        })
      })
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

  thead th {
    width: 40px;
    text-align: center;
    height: 40px;
    border-right: 2px solid #F3F4F5;
  }

  tbody th {
    text-align: center;
    border-top: 2px solid #F3F4F5;
    height: 40px;
  }

  td {
    border: 2px solid #F3F4F5;
    border-left: none;
  }

  span {
    color: green;
  }

  .popover__wrapper {
    position: relative;
  }

  .popover__content {
    opacity: 0;
    visibility: hidden;
    position: absolute;
    left: -150px;/*
    margin-left: 130px;
    margin-top: 20px;*/
    transform: translate(0,10px);
    background-color: #BFBFBF;
    padding: 1.5rem;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
    width: auto;
  }

  .popover__content:before {
    position: absolute;
    z-index: -1;
    content: '';
    right: calc(50% - 10px);
    top: -8px;
    border-style: solid;
    border-width: 0 10px 10px 10px;
    border-color: transparent transparent #BFBFBF transparent;
    transition-duration: 0.3s;
    transition-property: transform;
  }

  .popover__wrapper:hover .popover__content {
    z-index: 10;
    opacity: 1;
    visibility: visible;
    transform: translate(0,-20px);
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
