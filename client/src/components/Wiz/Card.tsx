import React, { CSSProperties } from "react";

export interface ICardProps {
    rotateDegree: number,
    suit: string,
    rank: string
}
interface ICardState {

}
export default class Card extends React.PureComponent<ICardProps,ICardState>{
    render() {
        let suit: string = ""
        switch(this.props.suit) {
            case "spades":
                suit = "♠"
                break
            case "hearts":
                suit = "♥"
                break
            case "clubs":
                suit = "♣"
                break
            case "diamonds":
                suit = "♦"
                break
        }
        const isRed = this.props.suit === "hearts" || this.props.suit === "diamonds"
        const red = isRed ? "red-card" : ""
        const rotate: CSSProperties = {transform: `rotate(${this.props.rotateDegree}deg)`}
        
        const classes = `white card ${red}`
        
        return (
            <p className={classes} style={rotate}>{suit}<br/>{this.props.rank}</p>
        )
    }
}