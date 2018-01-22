import config from '@/config/config'
import lsm from '@/components/localStorageManager'
import { EventBus } from '@/components/event-bus'

export default {
  hasUnlockedAchievement (key) {
    let achievements = lsm.getValue('achievements')
    return achievements[key]
  },
  unlockAchievement (key) {
    let achievements = lsm.getValue('achievements')
    achievements[key] = true
    lsm.setValue('achievements', achievements)
    EventBus.$emit('alert', {type: 'success', message: 'Succès débloqué : ' + config.achievements[key].name + ' !'})
  },
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
