import React from "react";
import PlaceholderCard from "./PlaceholderCard";
import Card, { ICardProps } from "./Card";

interface ICardStackProps {
    cards: Array<{suit: ICardProps["suit"], rank: ICardProps["rank"]}>
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
        const cardsInStack = this.props.cards.map(card => { 
            return <Card key={card.suit+card.rank} 
                         suit={card.suit} rank={card.rank} 
                         rotateDegree={0} 
                         handleClick={this.handleCardClick}/>})
        if(cardsInStack.length === 0) {
            cardsInStack.push(<PlaceholderCard/>)
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