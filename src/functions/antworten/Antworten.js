import prototypeAntwortenBase from './prototypes/AntwortenBase'

const localFunctions = {
  AntwortenBase (root) {
    this.ready = false                  // Ist das Objekt bereit?
    this.root = root                    // Verbindung zum Transkript Objekt
    this.antwortenObj = {}              // Antwort Objekte
    this.antwortLists = {}              // Antwort Listen (all)
    this.delAntworten = {}              // Liste der zu löschenden Antworten
    this.moveAntwortId = null           // Vorgemerkte Antwort für verschieben.
    this.length = 0                     // Anzahl der Antworten
  }
}

// Antworten Prototypen
localFunctions.AntwortenBase.prototype.add = prototypeAntwortenBase.add
localFunctions.AntwortenBase.prototype.set = prototypeAntwortenBase.set
localFunctions.AntwortenBase.prototype.del = prototypeAntwortenBase.del
localFunctions.AntwortenBase.prototype.addMultiple = prototypeAntwortenBase.addMultiple
localFunctions.AntwortenBase.prototype.update = prototypeAntwortenBase.update
localFunctions.AntwortenBase.prototype.updateAntwortenLists = prototypeAntwortenBase.updateAntwortenLists
localFunctions.AntwortenBase.prototype.updateLength = prototypeAntwortenBase.updateLength

export default localFunctions
