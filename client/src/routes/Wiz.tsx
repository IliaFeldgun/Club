import React from "react";
import CardBoard from "../components/Wiz/CardBoard";
import CardFan from "../components/Wiz/CardFan";
import ScoreBoard from "../components/Wiz/ScoreBoard";
import './Wiz.css';
import CardStack from "../components/Wiz/CardStack";

interface IWizGameProps {
    handleFanCardClick?: (event: React.MouseEvent) => void
}
interface IWizGameState {}
export default class WizGame extends React.PureComponent<IWizGameProps,IWizGameState> {
    constructor(props: IWizGameProps) {
        super( props)
        this.handleFanCardClick = this.handleFanCardClick.bind(this)
    }

    handleFanCardClick(event: React.MouseEvent) {
        document.getElementsByClassName("stack")[0].appendChild(event.currentTarget)
        if(this.props.handleFanCardClick)
            this.props.handleFanCardClick(event)
    }
    render() {
        return (
            <React.Fragment>
                <CardBoard>
                    <CardStack/>
                    <CardFan cards={ [
                        {suit:"spades", rank:"Q"},
                        {suit:"hearts", rank:"7"},
                        {suit:"clubs", rank:"J"},
                        {suit:"diamonds", rank:"A"},
                        {suit:"diamonds", rank:"2"}
                    ]} handleCardClick={this.handleFanCardClick}/>
                </CardBoard>
                <ScoreBoard>
                </ScoreBoard>
            </React.Fragment>
        )
    }
}