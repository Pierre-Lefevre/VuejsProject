<template>
  <div>
    <div>{{ operations[index].factor1 }} x {{ operations[index].factor2 }}</div>
    <!--<transition-group name="answers" tag="ul" id="answers">-->
    <div id="answers-wrapper">
      <ul id="answers">
        <li :key="answer.value" v-for="(answer, i) in operations[index].answers" class="answer randomColor" :class="answer.class" @click="answer.class === 'initial' ? validAnswer(i) : null">
          <span>{{ answer.value }}</span>
        </li>
      </ul>
    </div>
    <span v-if="timeNextQuestion > 0">Question suivante dans : {{ timeNextQuestion }}</span>
    <!--</transition-group>-->
  </div>
</template>

<script>
import config from '@/config/config'
import utils from '@/components/utils'
import lsm from '@/components/localStorageManager'

export default {
  name: 'operation',
  data () {
    return {
      table: null,
      index: 0,
      operations: [],
      startTimestamp: 0,
      timeNextQuestion: 0,
      timerNextQuestion: null
    }
  },
  created () {
    if (this.$route.params.id !== undefined) {
      this.table = parseInt(this.$route.params.id)
      this.generateOperationsLearn()
    } else {
      this.generateOperationsTest()
    }
    this.startTimestamp = Date.now()
  },
  methods: {
    generateOperationsLearn () {
      let answers = []
      for (let j = 1; j <= 10; j++) {
        answers.push({
          value: j * this.table,
          class: 'initial'
        })
      }
      for (let i = 1; i <= 10; i++) {
        let operation = {}
        if (Math.random() > 0.5) {
          operation = {factor1: this.table, factor2: i}
        } else {
          operation = {factor1: i, factor2: this.table}
        }
        operation.goodAnswer = operation.factor1 * operation.factor2
        operation.answers = JSON.parse(JSON.stringify(answers))
        utils.shuffleArray(operation.answers)
        operation.badAnswers = []
        operation.nbErrors = 0
        this.operations.push(operation)
      }
      utils.shuffleArray(this.operations)
    },
    getFiveMostProblematicOperations () {
      // Récupère l'historique des 5 dernières sessions d'opérations.
      if (!lsm.keyExists('history')) {
        return []
      }
      let history = lsm.getValue('history').slice(0, 5)

      console.log('history :')
      console.log(history)

      // Crée un tableau contenant toutes les opérations différentes effectuées (l'ordre des facteurs étant important).
      let allOperations = []
      history.forEach(function (session) {
        session.forEach(function (operation) {
          let index = utils.objectExistInArrayByProperties(allOperations, operation, ['factor1', 'factor2'])
          if (index !== -1) {
            allOperations[index].nbErrors += operation.nbErrors
            allOperations[index].badAnswers = utils.arrayUnique(allOperations[index].badAnswers.concat(operation.badAnswers))
          } else {
            allOperations.push({factor1: operation.factor1, factor2: operation.factor2, nbErrors: operation.nbErrors, badAnswers: operation.badAnswers})
          }
        })
      })

      // Duplique, avec une probabilité de 1/4, certaines opérations.
      allOperations.forEach(function (operation) {
        if (Math.random() > 0.75) {
          allOperations.push(utils.clone(operation))
        }
      })

      // Trie toutes les opérations effectuées en fonction du nombre d'erreurs décroissant.
      allOperations.sort(function (a, b) {
        return (a.nbErrors < b.nbErrors) ? 1 : ((b.nbErrors < a.nbErrors) ? -1 : 0)
      })

      // Récupère, au maximum, les 5 opérations les plus problématiques.
      return allOperations.slice(0, 5)
    },
    generateOperationsTest () {
      let problematicOperations = this.getFiveMostProblematicOperations()
      for (let i = 0; i < 10; i++) {
        let operation
        let tmpAnswers
        let nbRandomAnswers
        if (problematicOperations.length > 0) {
          let problematicOperation = problematicOperations.splice(0, 1)[0]
          console.log('problematicOperation :')
          console.log(problematicOperation)
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
        tmpAnswers = tmpAnswers.concat(utils.getClosestValues(operation.goodAnswer, nbRandomAnswers, tmpAnswers))
        operation.answers = []
        tmpAnswers.forEach((answer) => {
          operation.answers.push({
            value: answer,
            class: 'initial'
          })
        })
        utils.shuffleArray(operation.answers)
        operation.badAnswers = []
        operation.nbErrors = 0
        this.operations.push(operation)
      }
      utils.shuffleArray(this.operations)
    },
    validAnswer (indexAnswer) {
      if (this.operations[this.index].factor1 * this.operations[this.index].factor2 === this.operations[this.index].answers[indexAnswer].value) {
        this.operations[this.index].time = Date.now() - this.startTimestamp
        this.operations[this.index].answers[indexAnswer].class = 'correct'
        for (let i = 0; i < this.operations[this.index].answers.length; i++) {
          if (this.operations[this.index].answers[i].class === 'initial') {
            this.operations[this.index].answers[i].class = 'disable'
          }
        }
        this.timeNextQuestion = config.timeBetweenOperation / 1000
        this.timerNextQuestion = setInterval(() => {
          this.decreaseTimerNextQuestion()
        }, 1000)
        setTimeout(() => {
          this.nextQuestion()
        }, config.timeBetweenOperation)
      } else {
        this.operations[this.index].nbErrors++
        this.operations[this.index].answers[indexAnswer].class = 'false'
        this.operations[this.index].badAnswers.push(this.operations[this.index].answers[indexAnswer].value)
      }
    },
    decreaseTimerNextQuestion () {
      this.timeNextQuestion -= 1
      if (this.timeNextQuestion === 0) {
        clearTimeout(this.timerNextQuestion)
      }
    },
    nextQuestion () {
      if (this.index === 9) {
        lsm.pushValue("history", this.operations)
        this.$router.push({name: 'Score'})
      } else {
        this.index++
        this.startTimestamp = Date.now()
      }
    }
  }
}
</script>

<style scoped>
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

  .answer.correct {
    background-color: #2ecc71;
  }

  .answer.false {
    background-color: #e74c3c;
  }

  .answer.disable {
    background-color: #bdc3c7;
  }

  .answer.initial {
    background-color: #FFFFFF;
    cursor: pointer;
  }
</style>
