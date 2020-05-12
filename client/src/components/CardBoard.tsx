import React from "react";

interface ICardBoardProps {

}
interface ICardBoardState {
    
}
export default class CardBoard extends React.PureComponent<ICardBoardProps,ICardBoardState> {
    render() {
        const classes = "split cardboard left tall three-quarters"
        return (
            <span className={classes}>
                {this.props.children}
            </span>
        )
    }
}