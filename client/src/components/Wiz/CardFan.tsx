import React from "react";
import Card, { ICardProps } from "./Card";

interface ICardFanProps {
    cards: Array<{suit: ICardProps["suit"], rank: ICardProps["rank"]}>
    handleCardClick?: (event: React.MouseEvent, 
                       suit: ICardProps["suit"], 
                       rank: ICardProps["rank"]) => void
}
interface ICardFanState {

}
export default class CardFan extends React.PureComponent<ICardFanProps,ICardFanState>{
    constructor(props:ICardFanProps) {
        super(props)

        this.handleCardClick = this.handleCardClick.bind(this)
    }
    handleCardClick(event: React.MouseEvent, suit: ICardProps["suit"], rank: ICardProps["rank"]) {
        let cssClasses = ["play-card"]
        Math.round(Math.random()) ? cssClasses.push("right") : cssClasses.push("left")
        event.currentTarget.classList.add(cssClasses[0], cssClasses[1])
        if (this.props.handleCardClick)
            this.props.handleCardClick(event, suit, rank)
    }
    render() {
        const totalCards = this.props.cards.length
        const increment = 10
        const firstDegree = (-1) * increment * ((totalCards % 2) ? (totalCards-1)/2 : totalCards/2)
        let currentDegree = firstDegree
        
        const cardsInFan = this.props.cards.map(card => {
            const currentRotate = currentDegree
            currentDegree+= increment
            return <Card key={`${card.suit},${card.rank}`} 
                         suit={card.suit} rank={card.rank} 
                         rotateDegree={currentRotate} 
                         handleClick={this.handleCardClick}/>
        })

        return (
            <div className="player-fan">
                {cardsInFan}
            </div>
        )
    }
}