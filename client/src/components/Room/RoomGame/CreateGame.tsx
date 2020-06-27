import React from 'react'
import createGame from '../../../engine/GameSelector'

interface ICreateGameProps {
    roomId: string
    gameName: string
}
export default class CreateGame extends React.PureComponent<ICreateGameProps,{}>{
    constructor(props: ICreateGameProps) {
        super(props)

        this.handleGameCreation = this.handleGameCreation.bind(this)
    }
    handleGameCreation(event: React.MouseEvent<HTMLButtonElement>) {
        const gameName = this.props.gameName
        const gameCreator = createGame(gameName)
        if (gameCreator) {
            gameCreator(this.props.roomId).then((gameId: string) => {
                window.location.assign(`/${gameName}/` + gameId) 
            })
        }
    }
    render() {
        const buttonClass = "form-button"
        return (
            <React.Fragment>
                <button 
                    className={buttonClass} 
                    type="button" 
                    onClick={this.handleGameCreation}
                >
                    <span>Create Game</span>
                </button>
            </React.Fragment>
        )
    }
}