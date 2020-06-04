import React from "react";
import PlaceholderCard from "./PlaceholderCard";
import Card, { ICardProps } from "./Card";
import ICard from "../../interfaces/Card";

interface ICardStackProps {
    cards: ICard[]
    handleCardClick?: (event: React.MouseEvent, 
                       suit: ICardProps["suit"], 
                       rank: ICardProps["rank"]) => void
}
interface ICardStackState {

}
export default class CardStack extends React.PureComponent<ICardStackProps,ICardStackState> {
    constructor(props: ICardStackProps) {
        super(props)
        
        this.handleCardClick = this.handleCardClick.bind(this)
    }
    handleCardClick(event: React.MouseEvent, suit: ICardProps["suit"], rank: ICardProps["rank"]) {
        if (this.props.handleCardClick)
            this.props.handleCardClick(event, suit, rank)
    }
    render() {
        let cardsInStack: JSX.Element[] = []
        if (!this.props.cards || this.props.cards.length === 0) {
            cardsInStack.push(<PlaceholderCard key="placeholder"/>)
        }
        else {
            cardsInStack = this.props.cards.map((card) => { 
            return <Card key={`${card.suit},${card.rank}`} 
                         suit={card.suit} rank={card.rank} 
                         rotateDegree={0} 
                         handleClick={this.handleCardClick}/>})
        }
        const classes = "stack"
        return (
        <React.Fragment>
            <div className={classes}>
                {cardsInStack}
            </div>
        </React.Fragment>
        )
    }
}