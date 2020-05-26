import React, { CSSProperties } from 'react'
import EmptyCard from './EmptyCard'

interface IEmptyCardFanProps {
    cards: number
    className: string
}
export default class EmptyCardFan extends React.PureComponent<IEmptyCardFanProps,{}> {
    render() {
        const totalCards = this.props.cards
        const increment = 10
        const firstDegree = (-1) * increment * ((totalCards % 2) ? (totalCards-1)/2 : totalCards/2)
        let currentDegree = firstDegree

        const cardsInFan : any[] = []

        for (let i = 0; i < this.props.cards; i++) {
            cardsInFan.push(<EmptyCard rotateDegree={firstDegree + (increment * i)}/>)
        }
        return (
            <React.Fragment>
                <div className={this.props.className}>
                    {cardsInFan}
                </div>
            </React.Fragment>
        )
    }
}