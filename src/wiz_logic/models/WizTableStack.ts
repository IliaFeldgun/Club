interface IWizTableStack extends IStack {
    suitRequired?: Suit
    cards: IWizCard[]
    playCard: (card: IWizCard) => boolean
    getWinningPlayer: () => IPlayer
}