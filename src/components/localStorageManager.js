export default {
  clear () {
    console.log(localStorage)
    localStorage.clear()
    console.log(localStorage)
  },
  getAllToString () {
    return JSON.stringify(localStorage)
  },
  setAllFromString (ls) {
    this.clear()
    let parseLs = JSON.parse(ls)
    for (let key in parseLs) {
      localStorage[key] = parseLs[key]
    }
  },
  keyExists (key) {
    return localStorage[key] !== undefined
  },
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
  getValueRaw (key) {
    return this.keyExists(key) ? localStorage[key] : undefined
  },
  setValue (key, value) {
    if (!this.keyExists(key)) {
      localStorage[key] = ''
    }
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    localStorage[key] = value
  },
  pushValue (key, value) {
    if (!this.keyExists(key)) {
      this.setValue(key, [])
    }
    let container = this.getValue(key)
    container.push(value)
    this.setValue(key, container)
  }
}
