import React from 'react'
import EmptyCardFan from './EmptyCardFan'
interface IWizOtherPlayerProps {
    name: string
    cards: number
    className: string
}
export default class WizOtherPlayer extends React.PureComponent<IWizOtherPlayerProps,{}>{
    render(){
        return (
            <React.Fragment>
                <div className={this.props.className} >
                    <p className="other-player-name">{this.props.name}</p>
                    <EmptyCardFan cards={this.props.cards} />
                </div>
            </React.Fragment>
        )
    }
}