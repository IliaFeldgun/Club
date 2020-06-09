import React from 'react'
import ReactModal from 'react-modal'

interface IShareButtonProps {
    targetUrl: string
}
interface IShareButtonState {
    showModal: boolean
}
export default class ShareButton extends React.PureComponent<IShareButtonProps, IShareButtonState>{
    constructor(props: IShareButtonProps) {
        super(props)
        this.state = {
            showModal: false
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
    handleInputClick(event: React.MouseEvent<HTMLInputElement>) {
        event.currentTarget.select()
        document.execCommand("copy");
    }
    render() {
            const buttonClass = "form-button"
        return (
            <React.Fragment>
                <button className={buttonClass} type="button" onClick={this.handleClick}>
                    <span>Share room link</span>
                </button>
                
                <ReactModal className="box-modal share-modal" 
                            shouldCloseOnEsc={true}
                            shouldCloseOnOverlayClick={true}
                            isOpen={this.state.showModal}
                            onRequestClose={this.handleCloseModal}>
                    <h3>Share this link:</h3>
                    <input className="url-textbox" 
                           type="url" value={this.props.targetUrl} 
                           onClick={this.handleInputClick} 
                           readOnly={true}>
                    </input>
                    <button className="form-button" onClick={this.handleCloseModal}>
                        Close
                    </button>
                </ReactModal>
            </React.Fragment>
        )
    }
    
}