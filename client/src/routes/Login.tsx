import React from "react";
import './Login.css';
import { useHistory } from 'react-router-dom'
interface ILoginProps {

}
export default class Login extends React.PureComponent<ILoginProps,{}> {
    constructor(props: ILoginProps) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(event: React.MouseEvent) {
        
    }
    render() {
        const fieldClass = "form-field"
        const allClass = "centered-top"
        const buttonClass = "form-button"
        return (
            <React.Fragment>
                <div className={allClass}>
                    <h3>Login with a name of your choice</h3>
                    <form id="loginform" method="POST" action="/api/player">
                        <input className={fieldClass} id="playerName" type="text" name="playerName" />
                        <button className={buttonClass} id="loginsend" type="submit" onClick={this.handleClick}>
                            <span>
                                Login
                            </span>
                        </button>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}