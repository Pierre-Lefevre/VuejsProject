let achievements = {}
for (let i = 1; i <= 10; i++) {
  achievements['table' + i + 'Master'] = {name: 'Maître de la table du ' + i, message: 'Finir la table du ' + i + ' sans faute.'}
}
achievements['tableMaster'] = {name: 'Maître des tables', message: 'Finir toutes les tables sans faute.'}

module.exports = {
  hashKey: 'doge_is_love_doge_is_life',
  backupFileName: 'progression.txt',
  timeBetweenOperation: 1,
  achievements: achievements
}
