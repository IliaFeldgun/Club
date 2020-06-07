import React from 'react'
import WizOtherPlayer from './OtherPlayer'
import { getPlayerId } from '../../utils/Cookie'

interface IWizOtherPlayersProps {
    players: Array<{id: string, name: string, score: number}>
    playerHands: { [playerId: string]: number }
}
export default class WizOtherPlayers extends React.PureComponent<IWizOtherPlayersProps,{}> {
    render() {
        let cards: JSX.Element[] = [<React.Fragment />]
        if (this.props.players) {
            const otherPlayers = this.props.players.filter((player) => {
                return player.id !== getPlayerId()
            })
        
            const otherPlayerHands = otherPlayers.map((player) => 
            {
                return {
                    name: player.name, 
                    cards: this.props.playerHands[player.id]
                }
            })
            
            cards = otherPlayerHands.map((player, index) => {
                return (
                        <WizOtherPlayer key={player.name} 
                                        name={player.name} 
                                        cards={player.cards} 
                                        className={`other-fan-${index + 1}`}/>
                )
            })
        }
        return (
            <div className="other-players">
                {cards}
            </div>
        )
    }
}