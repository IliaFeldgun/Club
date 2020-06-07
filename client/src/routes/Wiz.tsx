import React from "react";
import './Wiz.css';
import WizGame from "../components/Wiz/WizGame";
import { match, RouteComponentProps } from "react-router";
import { WizApi } from "../api/WizApi";
import ICard, { Suit, Rank } from "../interfaces/Card";
import { PossibleMoves } from "../interfaces/PossibleMoves";

interface IRouteParams {
    id: string
}
interface IWizProps extends RouteComponentProps<IRouteParams>{
    match: match<IRouteParams>
}
interface IWizState {
    instructions: PossibleMoves
    players: Array<{id: string, name: string, score: number}>
    nextPlayer: string
    playerHandSizes: { [playerId: string]: number }
    playerBets: { [playerId: string]: number }
    playerHand: ICard[]
    tableStack: ICard[]
    strongSuit?: Suit
}
export default class Wiz extends React.PureComponent<IWizProps,IWizState> {
    constructor(props: IWizProps) {
        super(props)

        this.state = {
            instructions: PossibleMoves.NONE,
            players: [], 
            nextPlayer: "",
            playerHandSizes: {},
            playerBets: {},
            playerHand: [], 
            tableStack: []
        }

        this.handleCardSend = this.handleCardSend.bind(this)
        this.handleBet = this.handleBet.bind(this)
    }
    componentDidMount() {
        // WizApi.listenToUpdateEvent().addEventListener("message", (event) => {
            // this.fetchDataToState()
        // })
        WizApi.listenToUpdateEvent().onmessage = (event) => {
            this.fetchDataToState()
        }
        this.fetchDataToState()
    }
    handleCardSend(card: ICard) {
        // if (this.canPlayCard(card)) {
            WizApi.sendCard(this.props.match.params.id, card).then((isCardSent) => {
                if (!isCardSent) {
                    alert("NOPE")
                    window.location.reload()
                }
                this.fetchDataToState()
            })
        // }
    }
    handleBet(bet: number) {
        WizApi.sendBet(this.props.match.params.id, bet).then((isBetSent) => {
            if (isBetSent) {
                this.fetchDataToState()
            }
        })
    }
    render() {
        let toRender = <WizGame players={this.state.players} 
                                nextPlayer={this.state.nextPlayer}
                                playerHandSizes={this.state.playerHandSizes}
                                playerBets={this.state.playerBets}
                                playerHand={this.state.playerHand}
                                tableStack={this.state.tableStack}
                                handleFanCardClick={this.handleCardSend}
                                handleBet={this.handleBet}
                                strongSuit={this.state.strongSuit}
                                instructions={this.state.instructions}/>
        // TODO: Render error element
        // if (!this.state.game || !this.state.players)
            // toRender = <React.Fragment/>
        return (
            <React.Fragment>
                {toRender}
            </React.Fragment>
        )
    }
    fetchDataToState() {
        const AllRequests: Promise<any>[] = []
        const gameId = this.props.match.params.id
        // TODO: Maybe unite API
        AllRequests.push(WizApi.getGameInstructions(gameId))
        AllRequests.push(WizApi.getGamePlayers(gameId))
        AllRequests.push(WizApi.getNextPlayer(gameId))
        AllRequests.push(WizApi.getPlayerHandSizes(gameId))
        AllRequests.push(WizApi.getPlayerBets(gameId))
        AllRequests.push(WizApi.getPlayerHand(gameId))
        AllRequests.push(WizApi.getTableStack(gameId))
        AllRequests.push(WizApi.getStrongSuit(gameId))

        Promise.all(AllRequests).then(([
            instructions, 
            players, 
            nextPlayer,
            playerHandSizes, 
            playerBets, 
            playerHand, 
            tableStack,
            strongSuit
        ]) => {
            this.setState({
                instructions, 
                players, 
                nextPlayer,
                playerHandSizes, 
                playerBets, 
                playerHand, 
                tableStack,
                strongSuit})
        })
    }
    canPlayCard(card: ICard) {
        const requiredSuit = this.state.tableStack[0].suit
        const isCorrectSuit = requiredSuit === card.suit
        const hasCorrectSuit = this.state.playerHand.some(card => card.suit === requiredSuit)
        const isJoker = card.rank === Rank.JOKER

        return isJoker || isCorrectSuit || !hasCorrectSuit
    }
}