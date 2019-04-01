const localFunctions = {
  // Funktion zur Ermittlung der Breite von Texten im SVG-Element
  getTextWidth: function (text, obj, cache) {
    if (obj) {
      if (cache) {
        if (!cache[text]) {
          obj.textContent = text
          cache[text] = obj.getBBox().width
        }
        return cache[text]
      } else {
        obj.textContent = text
        return obj.getBBox().width
      }
    }
  }
}

export default localFunctions
