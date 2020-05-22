import React from "react";
import LobbyApi from "../../api/LobbyApi";

interface ILoginFormProps {

}
interface ILoginFormState {
    playerName: string
}
export default class LoginForm extends React.PureComponent<ILoginFormProps,ILoginFormState> {
    constructor(props: ILoginFormProps) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            playerName: event.target.value
        })
    }
    handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        LobbyApi.newPlayer(this.state.playerName).then((response) => {
            window.location.reload(false)
        })
    }
    render() {
        const fieldClass = "form-field"
        const allClass = "centered-top"
        const buttonClass = "form-button"
        return (
            <React.Fragment>
                <div className={allClass}>
                    <h3>Login with a name of your choice</h3>
                    <input className={fieldClass} id="playerName" type="text" name="playerName" onChange={this.handleChange} />
                    <button className={buttonClass} id="loginsend" type="submit" onClick={this.handleClick}>
                        <span>
                            Login
                        </span>
                    </button>
                </div>
            </React.Fragment>
        )
    }
}