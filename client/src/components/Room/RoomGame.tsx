import React from 'react'
import GameDisplay from './RoomGame/GameDisplay'
import PlayButton from './RoomGame/PlayButton'
import GameDropDown from './RoomGame/GameDropDown'
import CreateGame from './RoomGame/CreateGame'
import { getPlayerId } from '../../utils/Cookie'

interface IRoomGameProps {
    roomId: string
    roomLeaderId: string
    gameName: string
    gameId: string
    gameNames: string[]
}
interface IRoomGameState {
    selectedGame: string
}
export default class RoomGame extends React.PureComponent<IRoomGameProps, IRoomGameState>{
    constructor(props: IRoomGameProps) {
        super(props)

        this.state = {
            selectedGame: props.gameNames[0]
        }

        this.handlePlay = this.handlePlay.bind(this)
        this.handleGameSelect = this.handleGameSelect.bind(this)
    }
    handlePlay() {
        window.location.assign(`/${this.props.gameName}/${this.props.gameId}`)
    }
    handleGameSelect(gameName: string) {
        this.setState({
            selectedGame: gameName
        })
    }
    render() {
        let toRender = <React.Fragment />
        if (this.props.gameName && this.props.gameId) {
            toRender = 
                <React.Fragment>
                    <GameDisplay 
                        gameName={this.props.gameName} 
                    />
                    <div className="align-right">
                        <PlayButton 
                            handlePlay={this.handlePlay}
                        />
                    </div>
                </React.Fragment>
        }
        else if (this.props.gameNames && 
                 this.props.gameNames.length &&
                 this.props.roomLeaderId === getPlayerId()) {
            toRender = 
                <React.Fragment>
                    <GameDropDown 
                        handleSelection={this.handleGameSelect} 
                        gameNames={this.props.gameNames} 
                    />
                    <div className="align-right">
                        <CreateGame 
                        roomId={this.props.roomId} 
                        gameName={this.state.selectedGame} 
                        />
                    </div>
                </React.Fragment>
        }
        return (
            <div className="room-game">
                {toRender}
            </div>
        )
    }
}