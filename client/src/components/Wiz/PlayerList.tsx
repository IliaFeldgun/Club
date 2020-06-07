import React from 'react'
interface IWizPlayerListProps {
    players: Array<{id: string, name: string, score: number}>
    playerBets: { [playerId: string]: number }
    nextPlayer: string
}
export default class WizPlayerList extends React.PureComponent<IWizPlayerListProps,{}>{
    render() {
        let players: JSX.Element[] = [<React.Fragment/>]
        
        if (this.props.players) {
            players = this.props.players.map((player) => {
                const playerBet = this.props.playerBets[player.id]
                let betText = "Bet: "
                let classes = ""
                if (playerBet === undefined) {
                    betText += "None"
                }
                else {
                    betText += playerBet
                }
                if (player.id === this.props.nextPlayer) {
                    classes = "highlight"
                }
                return <li className={classes} key={player.id}>{player.name}: {player.score} {betText}</li>
            })
        }
        return (
            <ol>
                {players}
            </ol>

        )
    }
}