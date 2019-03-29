import prototypeInformantenBase from './prototypes/InformantenBase'

const localFunctions = {
  InformantenBase () {
    this.ready = false                  // Ist das Objekt bereit?
    this.informantenObj = {}            // Informanten Objekte
    this.informantenList = []           // Liste der Informanten
    this.length = 0                     // Anzahl der Informanten
  }
}

// Informanten Prototypen
localFunctions.InformantenBase.prototype.set = prototypeInformantenBase.set

export default localFunctions
