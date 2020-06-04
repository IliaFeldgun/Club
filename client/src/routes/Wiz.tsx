import React from "react";
import './Wiz.css';
import WizGame from "../components/Wiz/WizGame";
import { match, RouteComponentProps } from "react-router";
import { WizApi } from "../api/WizApi";
import ICard from "../interfaces/Card";
import { PossibleMoves } from "../interfaces/PossibleMoves";

interface IRouteParams {
    id: string
}
interface IWizProps extends RouteComponentProps<IRouteParams>{
    match: match<IRouteParams>
}
interface IWizState {
    instructions: PossibleMoves
    game: any
    players: Array<{id: string, name: string, score: number}>
    playerHandSizes: { [playerId: string]: number }
    playerBets: { [playerId: string]: number }
    playerHand: ICard[]
    tableStack: ICard[]
}
export default class Wiz extends React.PureComponent<IWizProps,IWizState> {
    constructor(props: IWizProps) {
        super(props)

        this.state = {
            instructions: PossibleMoves.NONE,
            game: {}, 
            players: [], 
            playerHandSizes: {},
            playerBets: {},
            playerHand: [], 
            tableStack: []
        }

        this.handleCardSend = this.handleCardSend.bind(this)
        this.handleBet = this.handleBet.bind(this)
    }
    componentDidMount() {
        WizApi.listenToUpdateEvent().then((source) => {
            this.fetchDataToState()
            source.addEventListener("message", (event) =>{
                this.fetchDataToState()
            })
        })
    }
    handleCardSend(card: ICard) {
        WizApi.sendCard(this.props.match.params.id, card).then((isCardSent) => {
            if (isCardSent) {
                this.fetchDataToState()
            }
        })
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
                                playerHandSizes={this.state.playerHandSizes}
                                playerBets={this.state.playerBets}
                                playerHand={this.state.playerHand}
                                tableStack={this.state.tableStack}
                                handleFanCardClick={this.handleCardSend}
                                handleBet={this.handleBet}
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

        AllRequests.push(WizApi.getGameInstructions(gameId))
        AllRequests.push(WizApi.getGamePlayers(gameId))
        AllRequests.push(WizApi.getPlayerHandSizes(gameId))
        AllRequests.push(WizApi.getPlayerBets(gameId))
        AllRequests.push(WizApi.getPlayerHand(gameId))
        AllRequests.push(WizApi.getTableStack(gameId))

        Promise.all(AllRequests).then(([
            instructions, 
            players, 
            playerHandSizes, 
            playerBets, 
            playerHand, 
            tableStack
        ]) => {
            this.setState({
                instructions, 
                players, 
                playerHandSizes, 
                playerBets, 
                playerHand, 
                tableStack})
        })
    }
}