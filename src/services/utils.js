import config from '@/config/config'
import lsm from '@/services/localStorageManager'

// Tous les résultats possibles dans toutes les tables de multiplication.
const gAllPossibleResults = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 24, 25, 27, 28, 30, 32, 35, 36, 40, 42, 45, 48, 49, 50, 54, 56, 60, 63, 64, 70, 72, 80, 81, 90, 100]

export default {

  // Renvoie un nombre aléatoire entre deux bornes.
  randomBetween (from, to) {
    return Math.floor(Math.random() * to) + from
  },

  // Supprime les doublons d'un tableau.
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

  // Clone un objet.
  clone (object) {
    return JSON.parse(JSON.stringify(object))
  },

  // Clone un tableau.
  cloneArray (array) {
    return array.slice(0)
  },

  // Permet de savoir si un objet existe dans un tableau en s'appuyant sur les propriétés d'une autre objet.
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

  // Mélange de façon aléatoire le contenu d'un tableau.
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

  // Renvoie les cinq opérations les plus problématiques pour l'élève parmi les cinq dernières sessions d'opérations.
  getFiveMostProblematicOperations () {
    // Récupère l'historique des 5 dernières sessions d'opérations.
    if (!lsm.keyExistsUser('history')) {
      return []
    }
    let history = lsm.getValueUser('history').slice(0, 5)

    // Crée un tableau contenant toutes les opérations différentes effectuées (l'ordre des facteurs étant important).
    let allOperations = []
    history.forEach(session => {
      session.forEach(operation => {
        let index = this.objectExistInArrayByProperties(allOperations, operation, ['factor1', 'factor2'])
        if (index !== -1) {
          allOperations[index].nbErrors += operation.nbErrors
          allOperations[index].badAnswers = this.arrayUnique(allOperations[index].badAnswers.concat(operation.badAnswers))
          allOperations[index].time += operation.time
        } else {
          allOperations.push({factor1: operation.factor1, factor2: operation.factor2, nbErrors: operation.nbErrors, badAnswers: operation.badAnswers, time: operation.time})
        }
      })
    })

    // Trie toutes les opérations effectuées en fonction du nombre d'erreurs décroissant.
    allOperations.sort((a, b) => {
      return (a.nbErrors < b.nbErrors) ? 1 : ((b.nbErrors < a.nbErrors) ? -1 : 0)
    })

    // Isole les 5 opérations ayant le plus d'erreurs.
    let operationsErrors = allOperations.slice(0, 5)

    let problematicOperations = []

    // Récupération du temps de référence.
    let referenceTime = lsm.getValueUser('referenceTime')
    if (referenceTime !== undefined) {
      // Trie toutes les opérations effectuées en fonction du temps décroissant.
      allOperations.sort((a, b) => {
        return (a.time < b.time) ? 1 : ((b.time < a.time) ? -1 : 0)
      })

      // Isole les 2 opérations ayant le temps le plus long.
      let tmpOperationsFingers = allOperations.slice(0, 2)

      // Parmi ces 2 opérations, on récupère ceux dont le temps est supérieur à x fois le temps de référence.
      tmpOperationsFingers.forEach(operation => {
        if (operation.time > config.coefficientToDeduceCountingFingersThreshold * referenceTime) {
          problematicOperations.push(operation)
        }
      })

      // Complète le tableau des opérations problématiques afin d'atteindre une longueur égale à 5.
      problematicOperations = problematicOperations.concat(operationsErrors.slice(0, 5 - problematicOperations.length))
    } else {
      problematicOperations = operationsErrors
    }

    // Duplique, avec une probabilité de 25%, certaines opérations.
    problematicOperations.forEach(operation => {
      if (Math.random() > 0.75) {
        problematicOperations.push(this.clone(operation))
      }
    })

    // Mélange du tableau des opérations problématiques.
    this.shuffleArray(problematicOperations)

    // Récupère, au maximum, les 5 opérations les plus problématiques.
    return problematicOperations.slice(0, 5)
  },

  // Permet de récupérer, parmi tous les résultats possibles dans toutes les tables de multiplication, les x résultats les plus proches de la bonne réponse, excepté certains.
  getClosestValues (goodAnswers, nbValues, except) {
    // Copie du tableau contenant tous les résultats possibles dans toutes les tables de multiplication.
    let allPossibleResults = this.cloneArray(gAllPossibleResults)

    // Suppression des valeurs à exclure.
    for (let i = 0; i < except.length; i++) {
      if (except[i] !== goodAnswers) {
        allPossibleResults.splice(allPossibleResults.indexOf(except[i]), 1)
      }
    }

    // Détermine l'indice de la bonne réponse dans le tableau.
    let index
    for (let i = 0; i < allPossibleResults.length; i++) {
      if (goodAnswers === allPossibleResults[i]) {
        index = i
        break
      }
    }

    // Détermine les bornes d'indices supérieur et inférieur correspondant aux valeurs à récupérer.
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

    // Récupération de ces valeurs.
    answers = allPossibleResults.slice(startIndex, endIndex + 1)

    // Suppression de la bonne réponse.
    answers.splice(answers.indexOf(goodAnswers), 1)

    return answers
  },

  // Permet de savoir l'utilisateur peut accéder au mode examen.
  canAccessTest () {
    let tablesAlreadyDone = lsm.getValueUser('tablesAlreadyDone')
    return tablesAlreadyDone !== undefined && tablesAlreadyDone.length === 10
  }
}
