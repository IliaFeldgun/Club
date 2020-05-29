import React from "react";
import CardBoard from "./CardBoard";
import CardFan from "./CardFan";
import ScoreBoard from "./ScoreBoard";
import CardStack from "./CardStack";
import { ICardProps } from "./Card";
import ICard, { Suit, Rank } from "../../interfaces/Card";
import WizPlayerList from "./PlayerList";
import WizOtherPlayers from "./OtherPlayers";
import { getPlayerId } from "../../utils/Cookie";

interface IWizGameProps {
    players: Array<{id: string, name: string, score: number}>
    playerHand: ICard[]
    playerHandSizes: { [playerId: string]: number }
    tableStack: ICard[]
    handleFanCardClick?: (card: ICard) => void
}
interface IWizGameState {
    handCards: {suit: ICardProps["suit"], rank: ICardProps["rank"]}[]
    stackCards: {suit: ICardProps["suit"], rank: ICardProps["rank"]}[]
}
export default class WizGame extends React.PureComponent<IWizGameProps,IWizGameState> {
    constructor(props: IWizGameProps) {
        super( props)
        this.state = {handCards: [], stackCards: []}
        this.handleFanCardClick = this.handleFanCardClick.bind(this)
    }
    moveCard(suit: ICardProps["suit"], rank: ICardProps["rank"]) {
        const newHandCards = [...this.state.handCards].filter((card) => 
            !(card.suit === suit && card.rank === rank))
        const newStackCards = [...this.state.stackCards, {suit,rank}]
        this.setState({handCards: newHandCards, stackCards: newStackCards})
    }
    handleFanCardClick(event: React.MouseEvent, 
                       suit: ICardProps["suit"], 
                       rank: ICardProps["rank"]) {
        // fetch post card move here
        this.moveCard(suit, rank)
        if(this.props.handleFanCardClick)
            this.props.handleFanCardClick({suit,rank})
    }
    componentDidMount() {
        // fetch get table stack cards here
        // fetch get player cards here
        // this.setState({handCards: [
            // {suit: Suit.SPADE, rank: Rank.QUEEN},
            // {suit: Suit.HEART, rank: Rank.SEVEN},
            // {suit: Suit.CLUB, rank: Rank.JACK},
            // {suit: Suit.DIAMOND, rank: Rank.ACE},
            // {suit: Suit.DIAMOND, rank: Rank.TWO}]})
            
    }
    render() {
        //const otherPlayers = this.mockOtherPlayers()

        // TODO: refactor
        const playerToRemove = this.props.players.findIndex((player) => {
            return player.id === getPlayerId()
        })
        
        let allPlayers = this.props.players.slice()

        if (playerToRemove !== -1) {
            allPlayers.splice(playerToRemove, 1)
        }

        const otherPlayers = allPlayers.map((player) => 
            {
                return {name: player.name, cards: this.props.playerHandSizes[player.id]}
            })

        return (
            <React.Fragment>
                <CardBoard>
                    <CardStack cards={this.props.tableStack} />
                    <CardFan cards={this.props.playerHand} handleCardClick={this.handleFanCardClick}/>
                    <WizOtherPlayers players={otherPlayers} />
                </CardBoard>
                <ScoreBoard>
                    <WizPlayerList players={this.props.players} />
                </ScoreBoard>
            </React.Fragment>
        )
    }

    mockOtherPlayers() {
        const players = [
            {name: "gever", cards: 3},
            {name: "logever", cards: 10},
            {name: "empty", cards: 15},
            {name: "haver", cards: 1},
            {name: "sababa", cards: 10},
            {name: "ah", cards: 17},
            {name: "savir", cards: 6},
            {name: "lo-savir", cards: 12},
            {name: "gavir", cards: 6},
            {name: "lo-gavir", cards: 12}
        ]
        return players
    }

}