import config from '@/config/config'

export default {

  // Initialise le localStorage avec les données minimales.
  init () {
    // Utilisateurs par défauts.
    let users = [
      {firstname: 'Pierre', lastname: 'Lefèvre', pseudo: 'pierre', password: 'd5a5d66b94e8da0cf63d4cd6d66cd489d78e77b697039c6c48e3ff8d81752139'},
      {firstname: 'Solène', lastname: 'Dorey', pseudo: 'solene', password: '91ed63659ade1819ea0cbcf4d41551ea309d9ffa9b2e0abd2b7df28b94887c22'}
    ]

    // Liste des succès, en s'appuyant sur ceux définis dans la configuration.
    let achievements = {}
    Object.keys(config.achievements).forEach(key => {
      achievements[key] = false
    })
    if (!this.keyExists('users')) {
      this.setValue('users', users)
    }
    if (!this.keyExists('data')) {
      let data = {}
      users.forEach(user => {
        data[user.pseudo] = {
          'history': [],
          'achievements': achievements
        }
      })
      this.setValue('data', data)
    }
  },

  // Permet de réinitialiser le localStorage.
  clear () {
    localStorage.clear()
    this.init()
  },

  // Permet de récupérer les données d'un utilisateur.
  getUserData () {
    return localStorage.hasOwnProperty('token') ? JSON.parse(localStorage.getItem('data'))[localStorage.getItem('token')] : undefined
  },

  // Permet de modifier tout ou partie des données d'un utilisateur.
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

  // Permet de récupérer toutes les données d'un utilisateur sous forme d'une string.
  getAllToStringUser () {
    return JSON.stringify(this.getUserData())
  },

  // Permet de modifier toutes les données d'un utilisateur à partir d'une string.
  setAllFromStringUser (string) {
    this.setUserData(undefined, string)
  },

  // Permet de vérifier qu'une clef existe à la racine du localStorage.
  keyExists (key) {
    return localStorage[key] !== undefined
  },

  // Permet de vérifier qu'une clef existe pour un utilisateur.
  keyExistsUser (key) {
    return this.getUserData()[key] !== undefined
  },

  // Permet de récupérer les données contenues à une certaine clef à la racine du localStorage.
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

  // Permet de récupérer les données contenues à une certaine clef pour un utilisateur.
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

  // Permet de modifier la valeur correspondant à une certaine clef à la racine du localStorage.
  setValue (key, value) {
    if (!this.keyExists(key)) {
      localStorage[key] = ''
    }
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    localStorage[key] = value
  },

  // Permet de modifier la valeur correspondant à une certaine clef pour un utilisateur.
  setValueUser (key, value) {
    this.setUserData(key, value)
  },

  // Permet d'ajouter une valeur au tableau correspondant à une certaine clef à la racine du localStorage.
  pushValue (key, value) {
    if (!this.keyExists(key)) {
      this.setValue(key, [])
    }
    let container = this.getValue(key)
    container.push(value)
    this.setValue(key, container)
  },

  // Permet d'ajouter une valeur au tableau correspondant à une certaine clef pour un utilisateur.
  pushValueUser (key, value) {
    if (!this.keyExistsUser(key)) {
      this.setValueUser(key, [])
    }
    let container = this.getValueUser(key)
    container.push(value)
    this.setValueUser(key, container)
  }
}
