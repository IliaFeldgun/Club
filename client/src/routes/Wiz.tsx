import React from "react";
import CardBoard from "../components/Wiz/CardBoard";
import CardFan from "../components/Wiz/CardFan";
import ScoreBoard from "../components/Wiz/ScoreBoard";
import './Wiz.css';
import CardStack from "../components/Wiz/CardStack";

interface IWizGameProps {
    handleFanCardClick?: (event: React.MouseEvent) => void
}
interface IWizGameState {
    handCards: {suit: string, rank: string}[]
    stackCards: {suit: string, rank: string}[]
}
export default class WizGame extends React.PureComponent<IWizGameProps,IWizGameState> {
    constructor(props: IWizGameProps) {
        super( props)
        this.state = {handCards: [], stackCards: []}
        this.handleFanCardClick = this.handleFanCardClick.bind(this)
    }
    moveCard(suit: string, rank: string) {
        const newHandCards = [...this.state.handCards].filter((card) => 
            !(card.suit === suit && card.rank === rank))
        const newStackCards = [...this.state.stackCards, {suit,rank}]
        this.setState({handCards: newHandCards, stackCards: newStackCards})
    }
    handleFanCardClick(event: React.MouseEvent, suit: string, rank: string) {
        this.moveCard(suit, rank)
        if(this.props.handleFanCardClick)
            this.props.handleFanCardClick(event)
    }

    componentDidMount() {
        this.setState({handCards: [
            {suit:"spades", rank:"Q"},
            {suit:"hearts", rank:"7"},
            {suit:"clubs", rank:"J"},
            {suit:"diamonds", rank:"A"},
            {suit:"diamonds", rank:"2"}]})
    }
    render() {
        return (
            <React.Fragment>
                <CardBoard>
                    <CardStack cards={this.state.stackCards} />
                    <CardFan cards={this.state.handCards} handleCardClick={this.handleFanCardClick}/>
                </CardBoard>
                <ScoreBoard>
                </ScoreBoard>
            </React.Fragment>
        )
    }
}