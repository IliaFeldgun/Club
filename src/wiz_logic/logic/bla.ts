import { getCardsPerPlayer } from "../models/GameRules"


function dealPlayers(cards: number, players: IWizPlayer[], deck: IDeck){
    let deals = cards
    while (deals > 0)
    {
        players.forEach(p => p.stack.push(deck.pop()))
        deals--
    }
}

function dealGame(turn: number, players: IWizPlayer[], deck: IDeck) {
    const cards = getCardsPerPlayer(turn, players.length)
    dealPlayers(cards, players, deck)
}

function 