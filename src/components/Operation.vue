<template>
  <div>
    <div>{{ operations[index].facteur1 }} x {{ operations[index].facteur2 }}</div>
    <transition-group name="answers" tag="ul" id="answers">
      <li v-for="(answer, i) in operations[index].answers" :key="answer" class="answer">
        <button @click="validAnswer(i)">{{ answer }}</button>
      </li>
    </transition-group>
    <!--<ul id="answers">
      <li v-bind:key="answer" v-for="(answer, i) in operations[index].answers">
        <button @click="validAnswer(i)">{{ answer }}</button>
      </li>
    </ul>-->
  </div>
</template>

<script>
export default {
  name: 'operation',
  data () {
    return {
      table: parseInt(this.$route.params.id),
      index: 0,
      operations: []
    }
  },
  created () {
    this.generateOperations()
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
      localStorage[indexAnswer] = 'a'
      if (this.operations[this.index].facteur1 * this.operations[this.index].facteur2 === this.operations[this.index].answers[indexAnswer]) {
        if (this.index === 9) {
          this.$router.push({name: 'Home'})
        } else {
          this.index++
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
  }

  .answer-enter-active, .answer-leave-active {
    transition: all 1s;
  }
  .answer-enter, .answer-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }
</style>
