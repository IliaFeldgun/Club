class WizCard extends Card implements IWizCard {
    ownerPlayer: IWizPlayer
    constructor(suit: Suit, rank: Rank, face: boolean, ownerPlayer: IWizPlayer, deckId?: string) {
        super(suit, rank, face, deckId)

        this.ownerPlayer = ownerPlayer
    }
}