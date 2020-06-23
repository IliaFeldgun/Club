import React from "react";
import CardBoard from "./CardBoard";
import CardFan from "./CardFan";
import ScoreBoard from "./ScoreBoard";
import CardStack from "./CardStack";
import { ICardProps } from "./Card";
import ICard, { Suit } from "../../interfaces/Card";
import WizPlayerList from "./PlayerList";
import WizOtherPlayers from "./OtherPlayers";
import { getPlayerId } from "../../utils/Cookie";
import { PossibleMoves } from "../interfaces/PossibleMoves";
import SetBet from "./SetBet";
import StrongSuit from "./StrongSuit";
import IWizPlayer from "../interfaces/WizPlayer";
import IWizAnnouncement from "../interfaces/WizAnnouncement";
import Announcement from "./Announcement";

interface IWizGameProps {
    instructions: PossibleMoves
    players: IWizPlayer[]
    nextPlayer: string
    strongSuit?: Suit
    playerHand: ICard[]
    tableStack: ICard[]
    announcement?: IWizAnnouncement
    handleFanCardClick?: (card: ICard) => void
    handleBet?: (bet: number) => void
}
interface IWizGameState {
}
export default class WizGame extends React.PureComponent<IWizGameProps,IWizGameState> {
    constructor(props: IWizGameProps) {
        super(props)
        this.handleFanCardClick = this.handleFanCardClick.bind(this)
        this.handleBet = this.handleBet.bind(this)
    }
    handleFanCardClick(event: React.MouseEvent, 
                       suit: ICardProps["suit"], 
                       rank: ICardProps["rank"]) {
        if(this.props.handleFanCardClick)
            this.props.handleFanCardClick({suit,rank})
    }
    handleBet(event: React.MouseEvent, bet: number) {
        if (this.props.handleBet) {
            this.props.handleBet(bet)
        }
    }
    componentDidMount() {
        // this.setState({handCards: [
        //     {suit: Suit.SPADE, rank: Rank.QUEEN},
        //     {suit: Suit.HEART, rank: Rank.SEVEN},
        //     {suit: Suit.CLUB, rank: Rank.JACK},
        //     {suit: Suit.DIAMOND, rank: Rank.ACE},
        //     {suit: Suit.DIAMOND, rank: Rank.TWO}
        // ]})
    }
    render() {
        //const otherPlayerHands = this.mockOtherPlayers()
        
        let setBet = <React.Fragment />
        if (this.shouldBet()) {
            setBet = <SetBet maxBet={this.props.playerHand.length} handleBet={this.handleBet}/>
        }
        let strongSuit = <React.Fragment />
        if (this.props.strongSuit) {
            strongSuit = <StrongSuit strongSuit={this.props.strongSuit} />
        }
        let announcement = <React.Fragment />
        if (this.props.announcement) {
            announcement = 
            <Announcement 
                announcement={this.props.announcement} 
                players={this.props.players}
            />
        }

        return (
            <React.Fragment>
                {setBet}
                {announcement}
                <CardBoard>
                    {strongSuit}
                    <CardStack cards={this.props.tableStack} />
                    <CardFan yourTurn={this.isYourTurn() && this.shouldPlayCard()} 
                             cards={this.props.playerHand} 
                             handleCardClick={this.handleFanCardClick}/>
                    <WizOtherPlayers players={this.props.players} />
                </CardBoard>
                <ScoreBoard>
                    <WizPlayerList players={this.props.players}
                                   nextPlayer={this.props.nextPlayer} />
                </ScoreBoard>
            </React.Fragment>
        )
    }
    isYourTurn() {
        return getPlayerId() === this.props.nextPlayer
    }
    getPlayer() {
        return this.props.players.find((player) => {
            return player.id === getPlayerId()
        })
    }
    shouldPlayCard() {
        return this.props.instructions === PossibleMoves.PLAY_CARD
    }
    shouldBet() {
        const isYourTurn = this.isYourTurn() 
        const playerHasHand = this.props.playerHand 
        const isInstructionBet = this.props.instructions === PossibleMoves.PLACE_BET
        const player = this.getPlayer()
        const didPlayerNotBet = player && player.bet === undefined
        return isYourTurn && playerHasHand && isInstructionBet && didPlayerNotBet
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