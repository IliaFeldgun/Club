import React from "react";
import LobbyApi from "../../api/LobbyApi";

interface ILoginFormProps {
    className: string
}
interface ILoginFormState {
    playerName: string
}
export default class LoginForm extends React.PureComponent<ILoginFormProps,ILoginFormState> {
    constructor(props: ILoginFormProps) {
        super(props)
        this.state = {playerName: ""}
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleKeyUp = this.handleKeyUp.bind(this)
    }
    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            playerName: event.target.value
        })
    }
    handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        this.sendLogin()
    }
    handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.keyCode === 13) { // "RETURN" key
            this.sendLogin()
        }
    }
    sendLogin() {
        if(this.state.playerName) {
            LobbyApi.newPlayer(this.state.playerName).then((isCreated) => {
                window.location.reload(false)
            })
        }
    }
    render() {
        const fieldClass = "form-field"
        const allClass = this.props.className + " login-form"
        const buttonClass = "form-button"
        return (
            <React.Fragment>
                <div className={allClass}>
                    <h3>Login with a name of your choice</h3>
                    <input 
                        className={fieldClass} 
                        id="playerName" 
                        type="text" 
                        name="playerName" 
                        onChange={this.handleChange} 
                        onKeyUp={this.handleKeyUp} 
                    />
                    <button className={buttonClass} id="loginsend" onClick={this.handleClick}>
                        <span>
                            Login
                        </span>
                    </button>
                </div>
            </React.Fragment>
        )
    }
}