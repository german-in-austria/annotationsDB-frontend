import prototypeTokensBase from './prototypes/TokensBase'

const localFunctions = {
  TokensBase () {
    this.ready = false                  // Ist das Objekt bereit?
    this.tokensObj = {}                 // Token Objekte
    this.tokenLists = {}                // Token Listen (all, byInf)
    this.aTokenFragmenteObj = {}        // Token zu Fragment Zuordnung
    this.length = 0                     // Anzahl der Tokens
  }
}

// Transcript Prototypen
localFunctions.TokensBase.prototype.add = prototypeTokensBase.add
localFunctions.TokensBase.prototype.addMultiple = prototypeTokensBase.addMultiple
localFunctions.TokensBase.prototype.updateTokenFragment = prototypeTokensBase.updateTokenFragment
localFunctions.TokensBase.prototype.update = prototypeTokensBase.update
localFunctions.TokensBase.prototype.updateTokensLists = prototypeTokensBase.updateTokensLists
localFunctions.TokensBase.prototype.updateLength = prototypeTokensBase.updateLength

export default localFunctions
