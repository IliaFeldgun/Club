import React, { CSSProperties } from "react";
import ICard, { Suit, Rank } from "../../interfaces/Card"

export interface ICardProps {
    rotateDegree: number
    suit: ICard["suit"]
    rank: ICard["rank"]
    handleClick?: (event: React.MouseEvent, suit: ICard["suit"], rank: ICard["rank"]) => void
}
interface ICardState {

}
export default class Card extends React.PureComponent<ICardProps,ICardState>{
    constructor(props: ICardProps) {
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(event: React.MouseEvent<HTMLSpanElement>) {
        if (this.props.handleClick) {
            this.props.handleClick(event, this.props.suit, this.props.rank)
        }
    }
    render() {
        let suit: string = this.translateSuit()
        let rank: string = this.translateRank()
        
        const isRed = this.isRed()
        const red = isRed ? "red-card" : ""
        const isJoker = this.props.rank === Rank.JOKER
        const joker = isJoker ? "vertical-text" : ""
        let rotate: CSSProperties = {}
        const degrees = this.props.rotateDegree
        const spread = degrees
        if (this.props.rotateDegree) {
            rotate = {transform: `rotate(${degrees}deg) translate(${spread}%,0)`}
        }
        
        const classes = `white player-card ${red} ${joker}`
    const cardContent = <React.Fragment>{suit}{!isJoker && <br/>}{rank}</React.Fragment>
        return (
            <p className={classes} style={rotate} onClick={this.handleClick}>
                {cardContent}
            </p>
        )
    }
    isRed() : boolean {
        return this.props.suit === Suit.HEART || this.props.suit === Suit.DIAMOND
    }
    translateSuit() : string {
        let suit: string
        switch(this.props.suit) {
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
    translateRank() : string {
        let rank: string
        
        if (this.props.rank <= 10 && this.props.rank >= 2) {
            rank = this.props.rank.toString()
        }
        else if (this.props.rank === Rank.JOKER) {
            rank = "JOKER"
        }
        else {
            rank = Rank[this.props.rank].charAt(0)
        }
        
        return rank
    }
}