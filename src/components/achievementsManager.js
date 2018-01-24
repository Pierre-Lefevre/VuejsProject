import config from '@/config/config'
import lsm from '@/components/localStorageManager'
import { EventBus } from '@/components/eventBus'

export default {
  // Permet de savoir si l'utilisateur a déjà débloqué un succès.
  hasUnlockedAchievement (key) {
    let achievements = lsm.getValueUser('achievements')
    return achievements[key]
  },
  // Permet de débloquer un succès.
  unlockAchievement (key) {
    let achievements = lsm.getValueUser('achievements')
    achievements[key] = true
    lsm.setValueUser('achievements', achievements)
    EventBus.$emit('alert', {type: 'success', message: 'Succès débloqué : ' + config.achievements[key].name + ' !'})
  },
  // Permet de checker si l'utilisateur répond aux critères permettant de débloquer un succès de type tableXMaster.
  tableXMaster (number, operations) {
    if (!this.hasUnlockedAchievement('table' + number + 'Master')) {
      let sum = 0
      operations.forEach((operation) => {
        sum += operation.nbErrors
      })
      if (sum === 0) {
        this.unlockAchievement('table' + number + 'Master')
        this.tableMaster()
      }
    }
  },
  // Permet de checker si l'utilisateur répond aux critères permettant de débloquer le succès tableMaster.
  tableMaster () {
    if (!this.hasUnlockedAchievement('tableMaster')) {
      for (let i = 1; i <= 10; i++) {
        if (!this.hasUnlockedAchievement('table' + i + 'Master')) {
          return
        }
      }
      this.unlockAchievement('tableMaster')
    }
  }
}
