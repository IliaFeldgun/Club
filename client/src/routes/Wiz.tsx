import React from "react";
import CardBoard from "../components/Wiz/CardBoard";
import CardFan from "../components/Wiz/CardFan";
import ScoreBoard from "../components/Wiz/ScoreBoard";
import './Wiz.css';

export default class WizGame extends React.PureComponent {
    render() {
        return (
            <React.Fragment>
                <CardBoard>
                    <CardFan cards={ [
                        {suit:"spades", rank:"Q"},
                        {suit:"hearts", rank:"7"},
                        {suit:"clubs", rank:"J"},
                        {suit:"diamonds", rank:"A"},
                        {suit:"diamonds", rank:"2"}
                    ]}/>
                </CardBoard>
                <ScoreBoard>
                </ScoreBoard>
            </React.Fragment>
        )
    }
}