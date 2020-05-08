interface IWizPlayer extends IPlayer {
    stack: IStack
    score: IWizScore
    currentRoundResult: IWizPlayerRoundResult
    currentBet: IWizBet
}