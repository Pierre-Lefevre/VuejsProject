export default {

  // Filtre permettant d'arrondir un nombre avec tant de décimales.
  round (value, decimal) {
    if (value === undefined) {
      return ''
    }
    let factor = Math.pow(10, decimal)
    return Math.round(value * factor) / factor
  }
}
