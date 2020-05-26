import React from 'react'
import EmptyCardFan from './EmptyCardFan'

interface IWizOtherPlayersProps {
    players: Array<{name: string, cards: number}>
}
export default class WizOtherPlayers extends React.PureComponent<IWizOtherPlayersProps,{}> {
    render() {
        const cards = this.props.players.map((player, index) => {
            return (
                <EmptyCardFan className={`other-fan-${index + 1}`} key={player.name} cards={player.cards}/>
            )
        })
        return (
            <div className="other-players">
                {cards}
            </div>
        )
    }
}