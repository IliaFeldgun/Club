import React, { CSSProperties } from 'react'

interface IEmptyCardProps {
    rotateDegree: number
}
export default class EmptyCard extends React.PureComponent<IEmptyCardProps,{}> {
    render() {
        const classes = `blue other-card`
        const rotate: CSSProperties = {transform: `rotate(${this.props.rotateDegree}deg)`}
        return (<p className={classes} style= {rotate}/>)
    }

}