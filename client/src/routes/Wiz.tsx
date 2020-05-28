import React from "react";
import './Wiz.css';
import WizGame from "../components/Wiz/WizGame";
import { match, RouteComponentProps } from "react-router";
import { WizApi } from "../api/WizApi";

interface IRouteParams {
    id: string
}
interface IWizProps extends RouteComponentProps<IRouteParams>{
    match: match<IRouteParams>
}
interface IWizState {
    game: any
    players: Array<{id: string, name: string, score: number}>
}
export default class Wiz extends React.PureComponent<IWizProps,IWizState> {
    constructor(props: IWizProps) {
        super(props)

        this.state = {game: {}, players: []}
    }
    componentDidMount() {
        WizApi.getGame(this.props.match.params.id).then((res) => {
            res.json().then((json) => {
                console.log(json.game)
                this.setState({game: json.game})
            })
        })

        WizApi.getGamePlayers(this.props.match.params.id).then((res) => {
            res.json().then((json) => {
                this.setState({players: json.players})
            })
        })
    }
    render() {
        let toRender = <WizGame players={this.state.players}/>
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