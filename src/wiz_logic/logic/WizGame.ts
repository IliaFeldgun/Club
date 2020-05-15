export default class WizGame implements IWizGame {
    id: string
    deck: IDeck
    tableStack: IStack
    playerHands: { [playerId: string]: IStack }
    playerBets: { [playerId: string] : IWizBet }
    playerScores: { [playerId: string] : IWizScore }
    playerRoundResults: { [playerId: string] : IWizPlayerRoundResult }

    constructor(id: IWizGame["id"], deck: IDeck, tableStack: IStack) {

        this.deck = deck
        this.tableStack = tableStack
        this.playerHands = {}
        this.playerBets = {}
        this.playerScores = {}
        this.playerRoundResults = {}
    }
}