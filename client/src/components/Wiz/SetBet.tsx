import React from "react"
import PostButton from "../PostButton"

interface ISetBetProps {
    maxBet: number
}
interface ISetBetState {
    bet: number
}
export default class SetBet extends React.PureComponent<ISetBetProps, ISetBetState> {
    constructor(props: ISetBetProps) {
        super(props)
        this.handleBetChange = this.handleBetChange.bind(this)
    }
    handleBetChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({bet: parseInt(event.target.value)})
    }
    handleResponse(res: Response) {

    }
    render(){
        return (
            <React.Fragment>
                <input type="range" name="setBet" min="0" max={this.props.maxBet}
                       onChange={this.handleBetChange}/>
                <PostButton text="Bet!" route="/api/game/wiz/bet" body={this.state.bet}
                            handleResponse={this.handleResponse}/>
            </React.Fragment>
            
        )
    }
}