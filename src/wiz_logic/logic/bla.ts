import WizGameRules from "./WizGameRules"
import IDeck from "../../card_logic/models/Deck"
import IWizPlayer from "../models/WizPlayer"


function dealPlayers(cards: number, players: IWizPlayer[], deck: IDeck){
    let deals = cards
    while (deals > 0)
    {
        players.forEach(p => p.stack.push(deck.pop()))
        deals--
    }
}

function dealGame(turn: number, players: IWizPlayer[], deck: IDeck) {
    const cards = WizGameRules.getCardsPerPlayer(turn, players.length)
    dealPlayers(cards, players, deck)
}
