import config from '@/config/config'

export default {
  init () {
    let users = [
      {firstname: 'Pierre', lastname: 'Lefèvre', pseudo: 'pierre', password: 'd5a5d66b94e8da0cf63d4cd6d66cd489d78e77b697039c6c48e3ff8d81752139'},
      {firstname: 'Solène', lastname: 'Dorey', pseudo: 'solene', password: '91ed63659ade1819ea0cbcf4d41551ea309d9ffa9b2e0abd2b7df28b94887c22'}
    ]
    let achievements = {}
    Object.keys(config.achievements).forEach((key) => {
      achievements[key] = false
    })
    if (!this.keyExists('users')) {
      this.setValue('users', users)
    }
    if (!this.keyExists('data')) {
      let data = {}
      users.forEach((user) => {
        data[user.pseudo] = {
          'history': [],
          'achievements': achievements
        }
      })
      this.setValue('data', data)
    }
  },
  clear () {
    console.log(localStorage)
    localStorage.clear()
    console.log(localStorage)
  },
  //
  //
  //
  getUserData () {
    return localStorage.hasOwnProperty('token') ? JSON.parse(localStorage.getItem('data'))[localStorage.getItem('token')] : undefined
  },
  setUserData (key, value) {
    if (!localStorage.hasOwnProperty('token')) {
      return
    }
    let data = JSON.parse(localStorage.getItem('data'))
    if (key !== undefined) {
      if (!this.keyExistsUser(key)) {
        data[localStorage.getItem('token')][key] = ''
      }
      if (typeof value === 'object') {
        value = JSON.stringify(value)
      }
      data[localStorage.getItem('token')][key] = value
    } else {
      data[localStorage.getItem('token')] = value
    }
    localStorage.setItem('data', JSON.stringify(data))
  },
  //
  //
  //
  getAllToStringUser () {
    return JSON.stringify(this.getUserData())
  },
  setAllFromStringUser (string) {
    this.setUserData(undefined, string)
  },
  //
  //
  //
  keyExists (key) {
    return localStorage[key] !== undefined
  },
  keyExistsUser (key) {
    return this.getUserData()[key] !== undefined
  },
  //
  //
  //
  getValue (key) {
    if (this.keyExists(key)) {
      try {
        return JSON.parse(localStorage[key])
      } catch (e) {
        return localStorage[key]
      }
    }
    return undefined
  },
  getValueUser (key) {
    if (this.keyExistsUser(key)) {
      try {
        return JSON.parse(this.getUserData()[key])
      } catch (e) {
        return this.getUserData()[key]
      }
    }
    return undefined
  },
  //
  //
  //
  getValueRaw (key) {
    return this.keyExists(key) ? localStorage[key] : undefined
  },
  getValueRawUser (key) {
    return this.keyExistsUser(key) ? this.getUserData()[key] : undefined
  },
  //
  //
  //
  setValue (key, value) {
    if (!this.keyExists(key)) {
      localStorage[key] = ''
    }
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    localStorage[key] = value
  },
  setValueUser (key, value) {
    this.setUserData(key, value)
  },
  //
  //
  //
  pushValue (key, value) {
    if (!this.keyExists(key)) {
      this.setValue(key, [])
    }
    let container = this.getValue(key)
    container.push(value)
    this.setValue(key, container)
  },
  pushValueUser (key, value) {
    if (!this.keyExistsUser(key)) {
      this.setValueUser(key, [])
    }
    let container = this.getValueUser(key)
    container.push(value)
    this.setValueUser(key, container)
  }
}
