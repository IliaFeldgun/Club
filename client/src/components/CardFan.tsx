import React from "react";
import Card, { ICardProps } from "./Card";
import './Wiz.css';
interface ICardFanProps {
    cards: Array<{suit: ICardProps["suit"], rank: ICardProps["rank"]}>
}
interface ICardFanState {

}
export default class CardFan extends React.PureComponent<ICardFanProps,ICardFanState>{
    render() {
        const totalCards = this.props.cards.length
        const increment = 10
        const firstDegree = (-1) * increment * ((totalCards % 2) ? (totalCards-1)/2 : totalCards/2)
        let currentDegree = firstDegree
        
        let cardsInFan = this.props.cards.map(card => {
            const currentRotate = currentDegree
            currentDegree+= increment
            return <Card suit={card.suit} rank={card.rank} rotateDegree={currentRotate} />
        })

        return (
            <div className="fan">{cardsInFan}</div>
        )
    }
}