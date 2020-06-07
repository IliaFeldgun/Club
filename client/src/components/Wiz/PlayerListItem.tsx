import React from 'react'

interface IPlayerListItemProps {
    name: string,
    score: number,
    bet: number,
    takes: number,
    className: string
}
interface IPlayerListItemState {

}
export default class PlayerListItem extends React.PureComponent<IPlayerListItemProps, IPlayerListItemState> {
    
    render() {  
        return (
            <span className={`${this.props.className} player-list-item`}>
                <span className="pli-name">{this.props.name}</span>
                <span className="pli-score">
                    {this.props.score}
                    <span className="tooltip-text">Score</span>
                </span>
                <span className="pli-bet-takes">
                    <span className="pli-bet">
                        {this.props.bet}
                        <span className="tooltip-text">Bet</span>
                    </span>
                    
                    <span className="pli-takes">
                        {this.props.takes}
                        <span className="tooltip-text">Takes</span>
                    </span>
                </span>
            </span>
        )
    }
}