<template>
  <div>
    <div>{{ operations[index].facteur1 }} x {{ operations[index].facteur2 }}</div>
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
        if ((Math.random() > 0.5) ? 1 : 0) {
          operation = {facteur1: this.table, facteur2: i}
        } else {
          operation = {facteur1: i, facteur2: this.table}
        }
        operation.goodAnswer = operation.facteur1 * operation.facteur2
        operation.answers = JSON.parse(JSON.stringify(answers))
        this.shuffleArray(operation.answers)
        operation.badAnswers = []
        operation.nbErrors = 0
        this.operations.push(operation)
      }
      this.shuffleArray(this.operations)
    },
    generateOperationsTest () {
      for (let i = 1; i <= 10; i++) {
        let operation = {facteur1: Math.floor(Math.random() * 10) + 1, facteur2: Math.floor(Math.random() * 10) + 1}
        operation.goodAnswer = operation.facteur1 * operation.facteur2
        let tmpAnswers = [operation.goodAnswer]
        for (let j = 1; j <= 9; j++) {
          let answer
          do {
            answer = (Math.floor(Math.random() * 10) + 1) * (Math.floor(Math.random() * 10) + 1)
          } while (tmpAnswers.indexOf(answer) !== -1)
          tmpAnswers.push(answer)
        }
        operation.answers = []
        for (let j = 0; j < tmpAnswers.length; j++) {
          operation.answers.push({
            value: tmpAnswers[j],
            class: 'initial'
          })
        }
        this.shuffleArray(operation.answers)
        operation.badAnswers = []
        operation.nbErrors = 0
        this.operations.push(operation)
      }
      this.shuffleArray(this.operations)
    },
    shuffleArray (array) {
      let shuffleOperations = []
      for (let i = 0; i < array.length; i++) {
        shuffleOperations.splice(Math.round(Math.random() * shuffleOperations.length), 0, array[i])
      }
      array.splice(0, array.length)
      for (let i = 0; i < shuffleOperations.length; i++) {
        array.push(shuffleOperations[i])
      }
    },
    validAnswer (indexAnswer) {
      if (this.operations[this.index].facteur1 * this.operations[this.index].facteur2 === this.operations[this.index].answers[indexAnswer].value) {
        this.operations[this.index].time = Date.now() - this.startTimestamp
        this.operations[this.index].answers[indexAnswer].class = 'correct'
        for (let i = 0; i < this.operations[this.index].answers.length; i++) {
          if (this.operations[this.index].answers[i].class === 'initial') {
            this.operations[this.index].answers[i].class = 'disable'
          }
        }
        this.timeNextQuestion = 5
        this.timerNextQuestion = setInterval(() => {
          this.decreaseTimerNextQuestion()
        }, 1000)
        setTimeout(() => {
          this.nextQuestion()
        }, 5000)
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
        localStorage.data = JSON.stringify({operations: this.operations})
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

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
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
