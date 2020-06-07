import React from 'react'
import PlayerListItem from './PlayerListItem'
interface IWizPlayerListProps {
    players: Array<{id: string, name: string, score: number, takes: number}>
    playerBets: { [playerId: string]: number }
    nextPlayer: string
}
export default class WizPlayerList extends React.PureComponent<IWizPlayerListProps,{}>{
    render() {
        let players: JSX.Element[] = [<React.Fragment/>]
        
        if (this.props.players) {
            players = this.props.players.map((player) => {
                let classes = ""
                if (player.id === this.props.nextPlayer) {
                    classes = "highlight"
                }
                return <PlayerListItem 
                    className={classes}
                    key={player.id} 
                    name={player.name} 
                    score={player.score}
                    bet={this.props.playerBets[player.id]}
                    takes={player.takes} />
            })
        }
        return (
            <div className="player-list">
                Players:
                {players}
            </div>

        )
    }
}