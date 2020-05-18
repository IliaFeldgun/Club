import React from 'react'

interface IPlaceholderCardProps {

}
interface IPlaceholderCardState {

}
export default class PlaceholderCard extends React.PureComponent<IPlaceholderCardProps, IPlaceholderCardState> {
    render() {
        const classes = `blue card`
        return (<p className={classes}/>)
    }

}