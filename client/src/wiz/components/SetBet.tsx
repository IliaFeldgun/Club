import React from "react"
import ReactModal from 'react-modal'

ReactModal.setAppElement('#root');
interface ISetBetProps {
    maxBet: number
    handleBet: (event: React.MouseEvent, bet: number) => void
}
interface ISetBetState {
    bet: number
    showModal: boolean
}
export default class SetBet extends React.PureComponent<ISetBetProps, ISetBetState> {
    constructor(props: ISetBetProps) {
        super(props)
        this.state = {
            bet: 0,
            showModal: false
        }
        this.handleBetChange = this.handleBetChange.bind(this)
        this.handleOpenModal = this.handleOpenModal.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
    handleBetChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({bet: parseInt(event.target.value)})
    }
    handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        this.props.handleBet(event, this.state.bet)
        this.handleCloseModal()
    }
    handleOpenModal () {
        this.setState({ showModal: true })
    }
    
    handleCloseModal () {
        this.setState({ showModal: false })
    }
    componentDidMount() {
        this.handleOpenModal()
    }
    render(){
        const buttonClass = "form-button"
        return (
            <ReactModal className="bet-modal box-modal"
                        isOpen={this.state.showModal}>
                <input type="range" defaultValue="0" name="setBet" min="0" max={this.props.maxBet}
                       onChange={this.handleBetChange}/>
                <label>{this.state.bet}</label>
                    <button className={buttonClass} type="button" onClick={this.handleClick}>
                        <span>
                            Bet!
                        </span>
                    </button>
            </ReactModal>
            
        )
    }
}