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
        const gameCreator = createGame(this.props.gameName)
        if (gameCreator) {
            gameCreator(this.props.roomId).then((res: Response) => 
            {
                // Statuses not failed
                if (res.status !== 403 && res.status !== 500) {
                    res.json().then((json) => 
                        window.location.assign(`/${this.props.gameName}/` + json.gameId) 
                    )
                }
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