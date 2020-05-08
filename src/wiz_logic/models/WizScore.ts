interface IWizScore {
    total: number

    calculateScore: (bet: IWizBet, playerResult: IWizPlayerRoundResult) => void
}