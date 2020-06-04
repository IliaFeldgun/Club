import React from 'react'
import EmptyCard from './EmptyCard'

interface IEmptyCardFanProps {
    cards: number
}
export default class EmptyCardFan extends React.PureComponent<IEmptyCardFanProps,{}> {
    render() {
        const totalCards = this.props.cards
        const increment = 10
        const firstDegree = (-1) * increment * ((totalCards % 2) ? (totalCards-1)/2 : totalCards/2)

        const cardsInFan : any[] = []

        for (let i = 0; i < this.props.cards; i++) {
            cardsInFan.push(<EmptyCard key={Math.random()} rotateDegree={firstDegree + (increment * i)}/>)
        }
        return (
            <React.Fragment>
                <React.Fragment>
                    {cardsInFan}
                </React.Fragment>
            </React.Fragment>
        )
    }
}