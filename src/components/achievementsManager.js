import lsm from '@/components/localStorageManager'
import { EventBus } from '@/components/event-bus'

export default {
  tableMaster (number, operations) {
    let achievements = lsm.getValue('achievements')
    if (!achievements['table' + number + 'Master']) {
      let sum = 0
      operations.forEach(function (operation) {
        sum += operation.nbErrors
      })
      if (sum === 0) {
        EventBus.$emit('alert', {type: 'success', message: 'Succès débloqué : Maître de la table du ' + number})
        achievements['table' + number + 'Master'] = true
        lsm.setValue('achievements', achievements)
      }
    }
  }
}
