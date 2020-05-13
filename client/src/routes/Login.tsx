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
                    <form id="loginform" action="/api/player">
                        <input className={fieldClass} id="loginname" type="text" name="loginname" />
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