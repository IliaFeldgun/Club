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
                    <div className="other-player-name">{this.props.name}</div>
                    <div>
                        <EmptyCardFan cards={this.props.cards} />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}