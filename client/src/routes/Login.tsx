import React from "react";
import './Login.css';

export default class Login extends React.PureComponent {
    render() {
        const fieldClass = "form-field"
        const allClass = "centered"
        const buttonClass = "form-button"
        return (
            <React.Fragment>
                <div className={allClass}>
                    <h3>Login with a name of your choice</h3>
                    <form id="loginform" method="POST" action="/api/player">
                        <input className={fieldClass} id="playerName" type="text" name="playerName" />
                        <button className={buttonClass} id="loginsend" type="submit">
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