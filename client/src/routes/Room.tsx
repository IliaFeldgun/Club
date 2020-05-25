import React from 'react'
import { RouteComponentProps, match } from 'react-router-dom'
import LobbyApi from '../api/LobbyApi'
import PlayerList from '../components/PlayerList'
import "./Room.css"
import { getPlayerName } from '../utils/Cookie'
import JoinButton from '../components/Room/JoinButton'
import CreateWiz from '../components/Wiz/CreateWiz'
interface IRouteParams {
    id: string
}
interface IRoomProps extends RouteComponentProps<IRouteParams>{
    match: match<IRouteParams>;
}
interface IRoomState {
    players: string[]
}
export default class Room extends React.PureComponent<IRoomProps,IRoomState>{
    constructor(props: IRoomProps) {
        super(props)

        this.state = {
            players: []
        }
    }
    componentDidMount() {
        LobbyApi.getRoomPlayers(this.props.match.params.id).then((res: Response) => {
            if (res.status === 200) {
                res.json().then((json) => {
                    this.setState({players: [...json.playerNames]})
                })
            }
        })
    }
    render() {
        let joinButton = <JoinButton roomId={this.props.match.params.id} />
        if (this.state.players.some((player) => player === getPlayerName()))
        {
            joinButton = <React.Fragment/>
        }
        let createWizButton = <CreateWiz roomId={this.props.match.params.id} />
        return (
            <React.Fragment>
            <div className="centered-top">
                <span className="bold">This is room: </span>
                <span>{this.props.match.params.id}</span>
                <p className="block bold">Players in this room:</p>
                <PlayerList players={this.state.players} />
                {joinButton}
                {createWizButton}
            </div>
            </React.Fragment>
        )
    }
}