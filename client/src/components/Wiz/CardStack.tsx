import React from "react";
import FlippedCard from "./FlippedCard";

export default class CardStack extends React.PureComponent {
    render() {
        const classes = "stack"
        return (
        <React.Fragment>
            <div className={classes}>
                <FlippedCard/>
            </div>
        </React.Fragment>
        )
    }
}