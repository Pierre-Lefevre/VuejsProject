<template>
  <div>
    <div>{{ operations[index].facteur1 }} x {{ operations[index].facteur2 }}</div>
    <ul id="answers">
      <li v-bind:key="answer" v-for="answer in operations[index].answers">
        <button @click="validAnswer(answer)">{{ answer }}</button>
      </li>
    </ul>
    <pre>{{ operations }}</pre>
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
    validAnswer (answer) {
      if (this.operations[this.index].facteur1 * this.operations[this.index].facteur2 === answer) {
        console.log('ok')
      } else {
        console.log('nop')
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
</style>
