// Définition de tous les succès.
let achievements = {}
for (let i = 1; i <= 10; i++) {
  achievements['table' + i + 'Master'] = {name: 'Maître de la table de ' + i, message: 'Finir la table de ' + i + ' sans faute.'}
}
achievements['tableMaster'] = {name: 'Maître des tables', message: 'Finir toutes les tables sans faute.'}

module.exports = {

  // Clef de hashage utilisée pour encrypter la progression de l'utilisateur.
  hashKey: 'doge_is_love_doge_is_life',

  // Nom par défaut du fichier contenant la progression de l'utilisateur.
  backupFileName: 'progression.txt',

  // Temps, en millisecondes, entre deux questions.
  timeBetweenOperation: 1,

  // Les listes des succès.
  achievements: achievements
}
