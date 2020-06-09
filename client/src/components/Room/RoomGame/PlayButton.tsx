import React from 'react'

interface IPlayButtonProps{
    handlePlay: () => void
}
export default class PlayButton extends React.PureComponent<IPlayButtonProps,{}>{
    constructor(props: IPlayButtonProps) {
        super(props)
        this.handlePlay = this.handlePlay.bind(this)
    }
    handlePlay(event: React.MouseEvent<HTMLButtonElement>) {
        this.props.handlePlay()
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