import React from "react";

interface IPlayerListProps {
    players: string[]
}
export default class PlayerList extends React.PureComponent<IPlayerListProps,{}>{
    render() {
        const players = this.props.players.map((player) => 
            <li key={player}>{player}</li>    
        )
        return (
            <ol>
                {players}
            </ol>
        )
    }
}