import React from "react"
import PostButton from "../PostButton"
import ReactModal from 'react-modal'

ReactModal.setAppElement('#root');
interface ISetBetProps {
    maxBet: number
}
interface ISetBetState {
    bet: number
    showModal: boolean
}
export default class SetBet extends React.PureComponent<ISetBetProps, ISetBetState> {
    constructor(props: ISetBetProps) {
        super(props)
        this.state = {
            bet: -1,
            showModal: false
        }
        this.handleBetChange = this.handleBetChange.bind(this)
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }
    handleBetChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({bet: parseInt(event.target.value)})
    }
    handleResponse(res: Response) {
    }
    handleOpenModal () {
        this.setState({ showModal: true });
    }
    
    handleCloseModal () {
        this.setState({ showModal: false });
    }
    componentDidMount() {
        this.handleOpenModal()
    }
    render(){
        return (
            <ReactModal className="bet-modal"
                        isOpen={this.state.showModal}>
                <input type="range" name="setBet" min="0" max={this.props.maxBet}
                       onChange={this.handleBetChange}/>
                <PostButton text="Bet!" route="/api/game/wiz/bet" body={this.state.bet}
                            handleResponse={this.handleResponse}/>
            </ReactModal>
            
        )
    }
}