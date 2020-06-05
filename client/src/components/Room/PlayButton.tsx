import React from 'react'

interface IPlayButtonProps{
    gameName: string
    gameId: string
}
export default class PlayButton extends React.PureComponent<IPlayButtonProps,{}>{
    constructor(props: IPlayButtonProps) {
        super(props)
        this.handlePlay = this.handlePlay.bind(this)
    }
    handlePlay(event: React.MouseEvent<HTMLButtonElement>) {
        window.location.assign(`/${this.props.gameName}/${this.props.gameId}`)
    }
    render() {
        const buttonClass = "form-button"
        return (
            <button className={buttonClass} type="button" onClick={this.handlePlay}>
                <span>Play the game</span>
            </button>
        )
    }
}