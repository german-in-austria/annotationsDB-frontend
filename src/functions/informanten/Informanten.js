import prototypeInformantenBase from './prototypes/InformantenBase'

const localFunctions = {
  InformantenBase () {
    this.ready = false                  // Ist das Objekt bereit?
    this.informantenObj = {}            // Informanten Objekt
    this.informantenList = []           // Liste der Informanten
    this.length = 0                     // Anzahl der Informanten
  }
}

// Transcript Prototypen
localFunctions.InformantenBase.prototype.set = prototypeInformantenBase.set

export default localFunctions
