import React from 'react'
import ReactModal from 'react-modal'
import LoginForm from './LoginForm'

ReactModal.setAppElement('#root');
interface ILoginModalProps {
    show: boolean
}
interface ILoginModalState {
    showModal: boolean
}
export default class LoginModal extends React.PureComponent<ILoginModalProps, ILoginModalState> {
    constructor(props: ILoginModalProps) {
        super(props)

        this.state = {
            showModal: props.show
        }
        
        this.handleOpenModal = this.handleOpenModal.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
    
    handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        this.handleOpenModal()
    }
    handleOpenModal () {
        this.setState({ showModal: true })
    }
    
    handleCloseModal () {
        this.setState({ showModal: false })
    }
    render() {
        return (
            <ReactModal className="box-modal login-modal"
                        shouldCloseOnEsc={true}
                        shouldCloseOnOverlayClick={true}
                        isOpen={this.state.showModal}
                        onRequestClose={this.handleCloseModal}>
                <LoginForm className="" />
                
                <button className="form-button close-button" onClick={this.handleCloseModal}>
                    Close
                </button>
            </ReactModal>
        )
    }
}