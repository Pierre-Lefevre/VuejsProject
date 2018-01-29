// Définition de tous les succès.
let achievements = {}
for (let i = 1; i <= 10; i++) {
  achievements['table' + i + 'Master'] = {name: 'Maître de la table de ' + i, message: 'Finir la table de ' + i + ' sans faute.', secret: false}
}
achievements['tableMaster'] = {name: 'Maître des tables', message: 'Finir toutes les tables sans faute.', secret: false}
let timeMasterThreshold = 15000
for (let i = 1; i <= 10; i++) {
  achievements['table' + i + 'timeMaster'] = {name: 'Table de ' + i + ' en contre-la-montre', message: 'Finir la table de ' + i + ' en moins de ' + timeMasterThreshold / 1000 + ' secondes.', secret: false}
}
achievements['timeMaster'] = {name: 'Maître du temps', message: 'Finir toutes les tables en moins de ' + timeMasterThreshold / 1000 + ' secondes.', secret: false}
achievements['niceTry'] = {name: 'Bien essayé !', message: 'Tenter d\'accéder à une table non référencée.', secret: true}

module.exports = {

  // Clef de hashage utilisée pour encrypter la progression de l'utilisateur.
  hashKey: 'doge_is_love_doge_is_life',

  // Nom par défaut du fichier contenant la progression de l'utilisateur.
  backupFileName: 'progression.txt',

  // Temps, en millisecondes, entre deux questions.
  timeBetweenOperation: 1,

  // Coefficient permettant de déduire le seuil minimal temporel au-dessus duquel nous supposons que l'élève compte sur ses doigts.
  coefficientToDeduceCountingFingersThreshold: 3,

  // Temps en millisecondes définissant les succès liés au temps
  timeMasterThreshold: timeMasterThreshold,

  // Les listes des succès.
  achievements: achievements
}
