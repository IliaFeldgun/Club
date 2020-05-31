import React from 'react'
import WizOtherPlayer from './OtherPlayer'

interface IWizOtherPlayersProps {
    players: Array<{name: string, cards: number}>
}
export default class WizOtherPlayers extends React.PureComponent<IWizOtherPlayersProps,{}> {
    render() {
        const cards = this.props.players.map((player, index) => {
            return (
                    <WizOtherPlayer key={player.name} 
                                    name={player.name} 
                                    cards={player.cards} 
                                    className={`other-fan-${index + 1}`}/>
            )
        })
        return (
            <div className="other-players">
                {cards}
            </div>
        )
    }
}