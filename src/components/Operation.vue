<template>
  <div class="operation">
    <h1 :class="isTraining ? 'color-green' : 'color-red'">{{ isTraining ? 'Apprentissage' : 'Evaluation' }}</h1>
    <p>{{ operations[index].factor1 }} x {{ operations[index].factor2 }}</p>
    <p v-if="timeNextQuestion > 0">Question suivante dans : {{ timeNextQuestion }}</p>
    <div id="answers-wrapper">
      <ul id="answers">
        <li :key="answer.value" v-for="(answer, i) in operations[index].answers" class="answer randomColor" :class="answer.class" @click="answer.class === 'initial' ? validAnswer(i) : null">
          <span>{{ answer.value }}</span>
        </li>
      </ul>
    </div>
    <figure class="alert-wrong-answer" v-if="wrongAnswer">
      <img src="../assets/img/alert_error.svg" alt="Alerte mauvaise réponse">
    </figure>
  </div>
</template>

<script>
import config from '@/config/config'
import utils from '@/services/utils'
import lsm from '@/services/localStorageManager'
import am from '@/services/achievementsManager'
import guards from '@/services/guards'

export default {
  name: 'operation',
  data () {
    return {
      tableId: this.$route.params.id,
      isTraining: false,
      table: null,
      index: 0,
      operations: [],
      startTimestamp: 0,
      timeNextQuestion: 0,
      timerNextQuestion: null,
      worseTimeToAnswer: null,
      wrongAnswer: false
    }
  },
  beforeRouteEnter: guards.operation,
  beforeRouteUpdate: guards.operation,
  created () {
    // Détermine si l'élève est en apprentissage ou en examen.
    this.isTraining = this.tableId !== undefined
    if (this.isTraining) {
      this.table = parseInt(this.tableId)
      this.generateOperationsLearn()
    } else {
      this.generateOperationsTest()
    }
    this.startTimestamp = Date.now()
  },
  methods: {

    // Génère 10 opérations en mode apprentissage.
    generateOperationsLearn () {
      // Génère les 10 réponses pour la table courante.
      let answers = []
      for (let j = 1; j <= 10; j++) {
        answers.push({
          value: j * this.table,
          class: 'initial'
        })
      }

      // Génère les 10 questions possibles.
      for (let i = 1; i <= 10; i++) {
        let operation = {}

        // L'ordre des facteurs est aléatoire.
        if (Math.random() > 0.5) {
          operation = {factor1: this.table, factor2: i}
        } else {
          operation = {factor1: i, factor2: this.table}
        }
        operation.goodAnswer = operation.factor1 * operation.factor2
        operation.answers = utils.clone(answers)

        // Mélange du tableau contenant les différentes réponses.
        utils.shuffleArray(operation.answers)
        operation.badAnswers = []
        operation.nbErrors = 0
        this.operations.push(operation)
      }

      // Mélange du tableau contenant les différentes opérations.
      utils.shuffleArray(this.operations)
    },

    // Génère 10 opérations en mode examen.
    generateOperationsTest () {
      // Récupération des 5 opérations les plus problématiques pour l'élève.
      let problematicOperations = utils.getFiveMostProblematicOperations()
      for (let i = 0; i < 10; i++) {
        let operation
        let tmpAnswers
        let nbRandomAnswers

        // S'il y a des opérations problématiques...
        if (problematicOperations.length > 0) {
          let problematicOperation = problematicOperations.splice(0, 1)[0]
          operation = {factor1: problematicOperation.factor1, factor2: problematicOperation.factor2}
          operation.goodAnswer = operation.factor1 * operation.factor2
          tmpAnswers = [operation.goodAnswer].concat(problematicOperation.badAnswers.slice(0, 9))
          nbRandomAnswers = 10 - tmpAnswers.length
        } else {
          operation = {factor1: utils.randomBetween(1, 10), factor2: utils.randomBetween(1, 10)}
          operation.goodAnswer = operation.factor1 * operation.factor2
          tmpAnswers = [operation.goodAnswer]
          nbRandomAnswers = 9
        }

        // Ajoute aux réponses existantes, x nouvelles réponses afin d'en avoir 10 au total.
        tmpAnswers = tmpAnswers.concat(utils.getClosestValues(operation.goodAnswer, nbRandomAnswers, tmpAnswers))
        operation.answers = []
        tmpAnswers.forEach((answer) => {
          operation.answers.push({
            value: answer,
            class: 'initial'
          })
        })

        // Mélange du tableau contenant les différentes réponses.
        utils.shuffleArray(operation.answers)
        operation.badAnswers = []
        operation.nbErrors = 0
        this.operations.push(operation)
      }

      // Mélange du tableau contenant les différentes opérations.
      utils.shuffleArray(this.operations)
    },

    // Permet de valider ou non la réponse de l'élève.
    validAnswer (indexAnswer) {
      // Si la réponse est correct...
      if (this.operations[this.index].factor1 * this.operations[this.index].factor2 === this.operations[this.index].answers[indexAnswer].value) {
        this.operations[this.index].time = Date.now() - this.startTimestamp
        this.operations[this.index].answers[indexAnswer].class = 'bg-green'
        for (let i = 0; i < this.operations[this.index].answers.length; i++) {
          if (this.operations[this.index].answers[i].class === 'initial') {
            this.operations[this.index].answers[i].class = 'bg-grey'
          }
        }

        // Lancement du timer avant la question suivante.
        this.timeNextQuestion = config.timeBetweenOperation / 1000
        this.timerNextQuestion = setInterval(() => {
          this.decreaseTimerNextQuestion()
        }, 1000)
        setTimeout(() => {
          this.nextQuestion()
        }, config.timeBetweenOperation)
      } else {
        this.operations[this.index].nbErrors++
        this.operations[this.index].answers[indexAnswer].class = 'bg-red'
        this.wrongAnswer = true
        this.operations[this.index].badAnswers.push(this.operations[this.index].answers[indexAnswer].value)
      }
    },

    // Permet de décrémenter le timer avant la question suivante.
    decreaseTimerNextQuestion () {
      this.timeNextQuestion -= 1

      // Si le timer est à 0, on supprime cet intervalID.
      if (this.timeNextQuestion === 0) {
        clearTimeout(this.timerNextQuestion)
      }
    },

    // Permet de passer à la question suivante.
    nextQuestion () {
      // Si l'élève a fini la session...
      if (this.index === 9) {
        // Ajout de la session à son historique.
        lsm.pushValueUser('history', this.operations)

        // Si c'était une session d'entraînement, ajout du numéro de la table à celles qu'il a déjà faites.
        if (this.isTraining) {
          let tablesAlreadyDone = lsm.getValueUser('tablesAlreadyDone')
          if (tablesAlreadyDone === undefined || (tablesAlreadyDone !== undefined && tablesAlreadyDone.indexOf(this.table) === -1)) {
            lsm.pushValueUser('tablesAlreadyDone', this.table)
          }
        }

        // Si l'élève s'exerçait avec la table de 1.
        if (this.tableId === 1) {
          // Calcul du temps moyen de réponse.
          let sum = 0
          this.operations.forEach(operation => {
            sum += operation.time
          })
          lsm.setValueUser('referenceTime', sum / 10)
        }

        // Vérifie que l'élève débloque un succès de type tableXMaster.
        am.tableXMaster(this.table, this.operations)

        // Vérifie que l'élève débloque un succès de type tableXtimeMaster.
        am.tableXtimeMaster(this.table, this.operations)

        // Redirection vers la page des scores.
        this.$router.push({name: 'Score'})
      } else {
        // S'il reste des questions, on passe à la suivante.
        this.wrongAnswer = false
        this.index++
        this.startTimestamp = Date.now()
      }
    }
  }
}
</script>

<style scoped>

  .operation {
    padding: 0 10vw;
  }

  .operation p {
    font-size: xx-large;
    text-align: center;
    margin-bottom: 1rem;
  }

  figure img {
    position: absolute;
    right: 5vw;
    bottom: 20px;
    z-index: 1;
  }

  #answers-wrapper {
    display: flex;
    justify-content: center;
  }

  #answers {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 685px;
    margin-bottom: 1rem;
  }

  .answers-leave-active {
    transition: all 1s;
  }

  .answers-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  .answer {
    /*background-size: cover;*/
    /*clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);*/
    width: 75px;
    height: 75px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 30px;
    transition: background-color 1s;
    border: 1px solid #bdc3c7;
    transform: rotate(45deg);
  }

  .answer span {
    transform: rotate(-45deg);
  }

  .answer.initial {
    background-color: #FFFFFF;
    cursor: pointer;
  }
</style>
