import React from 'react'

interface IFlippedCardProps {

}
interface IFlippedCardState {

}
export default class FlippedCard extends React.PureComponent<IFlippedCardProps, IFlippedCardState> {
    render() {
        const classes = `blue card`
        return (<p className={classes}/>)
    }

}