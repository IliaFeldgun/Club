interface IWizGame {
    id: string
    deck: IDeck
    tableStack: IStack
    playerHands: { [playerId: string]: IStack }
    playerBets: { [playerId: string] : IWizBet }
    playerScores: { [playerId: string] : IWizScore }
    playerRoundResults: { [playerId: string] : IWizPlayerRoundResult }
}