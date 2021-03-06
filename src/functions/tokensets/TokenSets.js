import prototypeTokenSetsBase from './prototypes/TokenSetsBase'

const localFunctions = {
  TokenSetsBase (root) {
    this.ready = false                  // Ist das Objekt bereit?
    this.root = root                    // Verbindung zum Transkript Objekt
    this.tokenSetsObj = {}              // TokenSets Objekte
    this.tokenSetsLists = {}            // TokenSet Listen (all)
    this.delTokenSetsObj = {}           // Objekte der zu löschenden TokenSets
    this.length = 0                     // Anzahl der TokenSets
  }
}

// Tokens Prototypen
localFunctions.TokenSetsBase.prototype.add = prototypeTokenSetsBase.add
localFunctions.TokenSetsBase.prototype.addMultiple = prototypeTokenSetsBase.addMultiple
localFunctions.TokenSetsBase.prototype.update = prototypeTokenSetsBase.update
localFunctions.TokenSetsBase.prototype.updateTokenSetsLists = prototypeTokenSetsBase.updateTokenSetsLists
localFunctions.TokenSetsBase.prototype.updateTokenSetsData = prototypeTokenSetsBase.updateTokenSetsData
localFunctions.TokenSetsBase.prototype.updateLength = prototypeTokenSetsBase.updateLength
localFunctions.TokenSetsBase.prototype.sortTokenSets = prototypeTokenSetsBase.sortTokenSets
localFunctions.TokenSetsBase.prototype.updateTokenSetData = prototypeTokenSetsBase.updateTokenSetData
localFunctions.TokenSetsBase.prototype.deleteATokenSet = prototypeTokenSetsBase.deleteATokenSet
localFunctions.TokenSetsBase.prototype.directDeleteATokenSet = prototypeTokenSetsBase.directDeleteATokenSet
localFunctions.TokenSetsBase.prototype.getNextUnusedPk = prototypeTokenSetsBase.getNextUnusedPk

export default localFunctions
