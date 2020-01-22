import prototypeTokensBase from './prototypes/TokensBase'

const localFunctions = {
  TokensBase (root) {
    this.ready = false                  // Ist das Objekt bereit?
    this.root = root                    // Verbindung zum Transkript Objekt
    this.tokensObj = {}                 // Token Objekte
    this.tokenLists = {}                // Token Listen (all, byInf)
    this.aTokenTextInf = {}             // Tokens als Fließtext nach Informanten
    this.foundTokensList = []           // Liste der gefundenen Tokens
    this.aTokenFragmenteObj = {}        // Token zu Fragment Zuordnung
    this.aTokenTypes = {}               // Model der TokenTypes
    this.svgTwCache = {}                // Cache für SVG Textbreite
    this.svgLastView = -1               // Zuletzt geöffnetes Token
    this.length = 0                     // Anzahl der Tokens
  }
}

// Tokens Prototypen
localFunctions.TokensBase.prototype.add = prototypeTokensBase.add
localFunctions.TokensBase.prototype.addMultiple = prototypeTokensBase.addMultiple
localFunctions.TokensBase.prototype.updateTokenFragment = prototypeTokensBase.updateTokenFragment
localFunctions.TokensBase.prototype.getTokenString = prototypeTokensBase.getTokenString
localFunctions.TokensBase.prototype.getTokenFragment = prototypeTokensBase.getTokenFragment
localFunctions.TokensBase.prototype.update = prototypeTokensBase.update
localFunctions.TokensBase.prototype.updateTokensLists = prototypeTokensBase.updateTokensLists
localFunctions.TokensBase.prototype.updateTokensSVGData = prototypeTokensBase.updateTokensSVGData
localFunctions.TokensBase.prototype.updateLength = prototypeTokensBase.updateLength
localFunctions.TokensBase.prototype.setTokenTypes = prototypeTokensBase.setTokenTypes
localFunctions.TokensBase.prototype.updateTokenData = prototypeTokensBase.updateTokenData
localFunctions.TokensBase.prototype.getNextPrev = prototypeTokensBase.getNextPrev
localFunctions.TokensBase.prototype.sortTokenIdListe = prototypeTokensBase.sortTokenIdListe
localFunctions.TokensBase.prototype.updateATokenTextInf = prototypeTokensBase.updateATokenTextInf
localFunctions.TokensBase.prototype.naechsterSuchToken = prototypeTokensBase.naechsterSuchToken

export default localFunctions
