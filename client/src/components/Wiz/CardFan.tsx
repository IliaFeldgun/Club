import React from "react";
import Card, { ICardProps } from "./Card";

interface ICardFanProps {
    cards: Array<{suit: ICardProps["suit"], rank: ICardProps["rank"]}>
    handleCardClick?: (event: React.MouseEvent) => void
}
interface ICardFanState {

}
export default class CardFan extends React.PureComponent<ICardFanProps,ICardFanState>{
    constructor(props:ICardFanProps) {
        super(props)

        this.handleCardClick = this.handleCardClick.bind(this)
    }
    handleCardClick(event: React.MouseEvent) {
        if (this.props.handleCardClick)
            this.props.handleCardClick(event)
    }
    render() {
        const totalCards = this.props.cards.length
        const increment = 10
        const firstDegree = (-1) * increment * ((totalCards % 2) ? (totalCards-1)/2 : totalCards/2)
        let currentDegree = firstDegree
        
        let cardsInFan = this.props.cards.map(card => {
            const currentRotate = currentDegree
            currentDegree+= increment
            return <Card suit={card.suit} rank={card.rank} rotateDegree={currentRotate} handleClick={this.handleCardClick}/>
        })

        return (
            <div className="fan">{cardsInFan}</div>
        )
    }
}