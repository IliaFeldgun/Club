import React from 'react'
import { RouteComponentProps, match } from 'react-router-dom'
import LobbyApi from '../api/LobbyApi'
import PlayerList from '../components/PlayerList'
import "./Room.css"
import { getPlayerName, getPlayerId } from '../utils/Cookie'
import JoinButton from '../components/Room/JoinButton'
import CreateWiz from '../components/Wiz/CreateWiz'
import PlayButton from '../components/Room/PlayButton'
import ShareButton from '../components/Room/ShareButton'
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
}
export default class Room extends React.PureComponent<IRoomProps,IRoomState>{
    constructor(props: IRoomProps) {
        super(props)

        this.state = {
            players: [],
            leader: "",
            roomId: this.props.match.params.id,
            gameName: "",
            gameId: ""
        }
    }
    componentDidMount() {
        LobbyApi.getRoomPlayers(this.state.roomId).then((res: Response) => {
            if (res.status === 200) {
                res.json().then((json) => {
                    this.setState({players: [...json.playerNames]})
                })
            }
        })

        LobbyApi.getRoomLeader(this.state.roomId).then((leader) => {
            this.setState({leader})
        })

        LobbyApi.getRoomGame(this.state.roomId).then((game) => {
            this.setState({gameName: game.name, gameId: game.id})
        })
    }
    render() {
        let joinButton = <React.Fragment/>
        if (!this.state.players.some((player) => player === getPlayerName()))
        {
            joinButton = <JoinButton roomId={this.props.match.params.id} />
        }
        let createWizButton = <React.Fragment/>
        if (this.state.leader === getPlayerId()) {
            createWizButton = <CreateWiz roomId={this.props.match.params.id} />
        }
        let playButton = <React.Fragment/>
        if (this.state.gameId && this.state.gameName) {
            playButton = <PlayButton 
                gameId={this.state.gameId} 
                gameName={this.state.gameName} 
            />
        }
        return (
            <div className="centered-top">
                <span className="bold">This is room: </span>
                <span>{this.props.match.params.id}</span>
                <p className="block bold">Players in this room:</p>
                <PlayerList players={this.state.players} />
                {joinButton}
                {createWizButton}
                {playButton}
                <ShareButton targetUrl={document.URL} />
            </div>
        )
    }
}