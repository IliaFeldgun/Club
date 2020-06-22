import React from "react";

interface IScoreBoardProps {

}
interface IScoreBoardState {
    
}
export default class ScoreBoard extends React.PureComponent<IScoreBoardProps,IScoreBoardState> {
    render() {
        const classes = "split right tall one-quarter"
        return (
            <span className={classes}>
                {this.props.children}
            </span>
        )
    }
}