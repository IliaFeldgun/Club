import React from 'react'
import { RouteComponentProps, match } from 'react-router-dom'
import LobbyApi from '../api/LobbyApi'
import PlayerList from '../components/PlayerList'
import "./Room.css"
import { getPlayerName, getPlayerId } from '../utils/Cookie'
import JoinButton from '../components/Room/JoinButton'
import ShareButton from '../components/Room/ShareButton'
import LoginModal from '../components/Login/LoginModal'
import RoomGame from '../components/Room/RoomGame'

interface IRouteParams {
    id: string
}
interface IRoomProps extends RouteComponentProps<IRouteParams>{
    match: match<IRouteParams>;
}
interface IRoomState {
    players: string[]
    leader: string
    roomId: string
    gameName: string
    gameId: string
    isLoggedIn: boolean
}
export default class Room extends React.PureComponent<IRoomProps,IRoomState>{
    constructor(props: IRoomProps) {
        super(props)

        this.state = {
            players: [],
            leader: "",
            roomId: props.match.params.id,
            gameName: "",
            gameId: "",
            isLoggedIn: getPlayerId() !== ""
        }
    }
    componentDidMount() {
        LobbyApi.getRoomPlayers(this.state.roomId).then((res: Response) => {
            if (res.status === 200) {
                res.json().then((json) => {
                    this.setState(() => ({players: [...json.playerNames]}))
                })
            }
        })

        LobbyApi.getRoomLeader(this.state.roomId).then((leader) => {
            this.setState(() => ({leader}))
        })

        LobbyApi.getRoomGame(this.state.roomId).then((game) => {
            this.setState(() => ({gameName: game.name, gameId: game.id}))
        })
    }
    render() {
        let joinButton = <React.Fragment/>
        if (!this.state.players.some((player) => player === getPlayerName()))
        {
            joinButton = <JoinButton roomId={this.props.match.params.id} />
        }
        return (
            <div className="centered-top room">
                <span className="bold">Room ID: </span>
                <span>{this.props.match.params.id}</span>
                <div className="align-right">
                    <ShareButton targetUrl={document.URL} />
                </div>
                <p className="block bold">Players in this room:</p>
                <PlayerList players={this.state.players} />
                <RoomGame 
                    roomLeaderId={this.state.leader}
                    gameId={this.state.gameId} 
                    gameName={this.state.gameName}
                    roomId={this.state.roomId}
                    gameNames={["wizard"]}
                />
                <LoginModal show={!this.state.isLoggedIn} />
            </div>
        )
    }
}