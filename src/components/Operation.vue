<template>
  <div>
    <div>{{ operations[index].facteur1 }} x {{ operations[index].facteur2 }}</div>
    <transition-group name="answers" tag="ul" id="answers">
      <li v-for="(answer, i) in operations[index].answers" :key="answer" class="answer randomColor">
        <span @click="validAnswer(i)">{{ answer }}</span>
      </li>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'operation',
  data () {
    return {
      table: parseInt(this.$route.params.id),
      index: 0,
      operations: [],
      startTimestamp: 0
    }
  },
  created () {
    this.generateOperations()
    this.startTimestamp = Date.now()
  },
  methods: {
    generateOperations () {
      let answers = []
      for (let j = 1; j <= 10; j++) {
        answers.push(j * this.table)
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
        operation.nbAttempts = 0
        this.shuffleArray(operation.answers)
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
      console.log(localStorage)
      this.operations[this.index].nbAttempts++
      if (this.operations[this.index].facteur1 * this.operations[this.index].facteur2 === this.operations[this.index].answers[indexAnswer]) {
        this.operations[this.index].time = Date.now() - this.startTimestamp
        if (this.index === 9) {
          localStorage.data = JSON.stringify({operations: this.operations})
          this.$router.push({name: 'Score'})
        } else {
          this.index++
          this.startTimestamp = Date.now()
        }
      } else {
        this.operations[this.index].answers.splice(indexAnswer, 1)
      }
    }
  }
}
</script>

<style scoped>
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  #answers {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .answers-leave-active {
    transition: all 1s;
  }

  .answers-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  .answer {
    background-color: dodgerblue;
    background-size: cover;
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 10px;
  }
</style>
