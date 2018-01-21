const gAllPossibleResults = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 24, 25, 27, 28, 30, 32, 35, 36, 40, 42, 45, 48, 49, 50, 54, 56, 60, 63, 64, 70, 72, 80, 81, 90, 100]

export default {
  randomBetween (from, to) {
    return Math.floor(Math.random() * to) + from
  },
  arrayUnique (array) {
    let a = array.concat()
    for (let i = 0; i < a.length; ++i) {
      for (let j = i + 1; j < a.length; ++j) {
        if (a[i] === a[j]) {
          a.splice(j--, 1)
        }
      }
    }
    return a
  },
  clone (object) {
    return JSON.parse(JSON.stringify(object))
  },
  cloneArray (array) {
    return array.slice(0)
  },
  objectExistInArrayByProperties (array, element, properties) {
    for (let i = 0; i < array.length; i++) {
      let nbMatchProperties = 0
      for (let j = 0; j < properties.length; j++) {
        if (array[i][properties[j]] === element[properties[j]]) {
          nbMatchProperties++
        }
      }
      if (nbMatchProperties === properties.length) {
        return i
      }
    }
    return -1
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
  getClosestValues (goodAnswers, nbValues, except) {
    let allPossibleResults = this.cloneArray(gAllPossibleResults)

    for (let i = 0; i < except.length; i++) {
      if (except[i] !== goodAnswers) {
        allPossibleResults.splice(allPossibleResults.indexOf(except[i]), 1)
      }
    }

    let index
    for (let i = 0; i < allPossibleResults.length; i++) {
      if (goodAnswers === allPossibleResults[i]) {
        index = i
        break
      }
    }

    let answers = []
    let startIndex = index - Math.floor(nbValues / 2)
    let endIndex = index + Math.ceil(nbValues / 2)
    if (startIndex < 0) {
      endIndex += 0 - startIndex
      startIndex = 0
    }
    if (endIndex > allPossibleResults.length - 1) {
      startIndex -= (endIndex - (allPossibleResults.length - 1))
      endIndex = allPossibleResults.length - 1
    }

    answers = allPossibleResults.slice(startIndex, endIndex + 1)
    answers.splice(answers.indexOf(goodAnswers), 1)

    return answers
  }
}
