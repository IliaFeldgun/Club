import React from "react";
import './Wiz.css';
import WizGame from "../components/Wiz/WizGame";
import { match, RouteComponentProps } from "react-router";
import { WizApi } from "../api/WizApi";
import ICard from "../interfaces/Card";

interface IRouteParams {
    id: string
}
interface IWizProps extends RouteComponentProps<IRouteParams>{
    match: match<IRouteParams>
}
interface IWizState {
    game: any
    players: Array<{id: string, name: string, score: number}>
    playerHandSizes: { [playerId: string]: number }
    playerHand: ICard[]
    tableStack: ICard[]
}
export default class Wiz extends React.PureComponent<IWizProps,IWizState> {
    constructor(props: IWizProps) {
        super(props)

        this.state = {
            game: {}, 
            players: [], 
            playerHandSizes: {}, 
            playerHand: [], 
            tableStack: []}
    }
    componentDidMount() {
        const AllRequests: Promise<any>[] = []
        const gameId = this.props.match.params.id

        AllRequests.push(WizApi.getGamePlayers(gameId))
        AllRequests.push(WizApi.getPlayerHandSizes(gameId))
        AllRequests.push(WizApi.getPlayerHand(gameId))
        AllRequests.push(WizApi.getTableStack(gameId))

        Promise.all(AllRequests).then(([players, playerHandSizes, playerHand, tableStack]) => {
            this.setState({players, playerHandSizes, playerHand, tableStack})
        })
    }
    render() {
        let toRender = <WizGame players={this.state.players} 
                                playerHandSizes={this.state.playerHandSizes}
                                playerHand={this.state.playerHand}
                                tableStack={this.state.tableStack}/>
        // TODO: Render error element
        // if (!this.state.game || !this.state.players)
            // toRender = <React.Fragment/>
        return (
            <React.Fragment>
                {toRender}
            </React.Fragment>
        )
    }
}