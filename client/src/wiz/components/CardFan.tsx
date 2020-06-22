import React from "react";
import Card, { ICardProps } from "./Card";
import ICard from "../../interfaces/Card";

interface ICardFanProps {
    yourTurn: boolean
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
        if (this.props.yourTurn) {
            let cssClasses = ["play-card"]
            Math.round(Math.random()) ? cssClasses.push("right") : cssClasses.push("left")
            event.currentTarget.classList.add(cssClasses[0], cssClasses[1])
            if (this.props.handleCardClick)
                this.props.handleCardClick(event, suit, rank)
        }
    }
    render() {
        const totalCards = this.props.cards.length
        const increment = 10
        const firstDegree = (-1) * increment * ((totalCards % 2) ? (totalCards-1)/2 : totalCards/2)
        let currentDegree = firstDegree
        
        let cardsInFan: any = <React.Fragment />
        if (this.props.cards.length && this.props.cards && this.props.cards[0]) {
            cardsInFan = this.props.cards.map((card: ICard) => {
                const currentRotate = currentDegree
                currentDegree+= increment
                return <Card key={`${card.suit},${card.rank}`} 
                            suit={card.suit} rank={card.rank} 
                            rotateDegree={currentRotate} 
                            handleClick={this.handleCardClick}/>
            })
        }
        let wrongTurnTooltip = <React.Fragment />
        if (!this.props.yourTurn) {
            wrongTurnTooltip =  <span className="tooltip-text">
                                    Wait for your turn
                                </span>
        }
        return (
            <div className="player-fan">
                {wrongTurnTooltip}
                {cardsInFan}
            </div>
        )
    }
}