import React from 'react'
import { Suit } from '../../interfaces/Card'

interface IStrongSuitProps {
    strongSuit: Suit
}
export default class StrongSuit extends React.PureComponent<IStrongSuitProps> {
    render() {
        const suit = this.translateSuit()
        const isRed = this.isRed()
        const red = isRed ? "red-card" : ""

        return (
            <span className={`strong-suit ${red}`}>
                {suit}
                <span className="tooltip-text">Strong suit</span>
            </span>
        )
    }
    
    isRed() : boolean {
        return this.props.strongSuit === Suit.HEART || this.props.strongSuit === Suit.DIAMOND
    }
    translateSuit() : string {
        let suit: string
        switch(this.props.strongSuit) {
            case Suit.SPADE:
                suit = "♠"
                break
            case Suit.HEART:
                suit = "♥"
                break
            case Suit.CLUB:
                suit = "♣"
                break
            case Suit.DIAMOND:
                suit = "♦"
                break
        }

        return suit
    }
}