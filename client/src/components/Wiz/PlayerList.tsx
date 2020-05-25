import React from 'react'
interface IWizPlayerListProps {
    players: Array<{id: string, name: string}>
}
export default class WizPlayerList extends React.PureComponent<IWizPlayerListProps,{}>{
    render() {
        const players = this.props.players.map((player) => 
            <li key={player.id}>{player.name}</li>
        )
        return (
            <ol>
                {players}
            </ol>

        )
    }
}