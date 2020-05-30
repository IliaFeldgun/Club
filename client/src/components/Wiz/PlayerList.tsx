import React from 'react'
interface IWizPlayerListProps {
    players: Array<{id: string, name: string, score: number}>
    playerBets: { [playerId: string]: number }
}
export default class WizPlayerList extends React.PureComponent<IWizPlayerListProps,{}>{
    render() {
        const players = this.props.players.map((player) => {
            const playerBet = this.props.playerBets[player.id]
            let betText = "Bet: "
            if (!playerBet) {
                betText += "None"
            }
            else {
                betText += playerBet
            }

            return <li key={player.id}>{player.name}: {player.score} {betText}</li>
        })
        return (
            <ol>
                {players}
            </ol>

        )
    }
}