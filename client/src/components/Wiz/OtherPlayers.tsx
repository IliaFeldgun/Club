import React from 'react'
import EmptyCardFan from './EmptyCardFan'
import WizOtherPlayer from './OtherPlayer'

interface IWizOtherPlayersProps {
    players: Array<{name: string, cards: number}>
}
export default class WizOtherPlayers extends React.PureComponent<IWizOtherPlayersProps,{}> {
    render() {
        const cards = this.props.players.map((player, index) => {
            return (
                <React.Fragment>
                    <WizOtherPlayer key={player.name} 
                                    name={player.name} 
                                    cards={player.cards} 
                                    className={`other-fan-${index + 1}`}/>
                </React.Fragment>
            )
        })
        return (
            <div className="other-players">
                {cards}
            </div>
        )
    }
}