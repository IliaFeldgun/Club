import React from "react";
import './Login.css';
import { Redirect } from "react-router-dom"
import { getPlayerName } from "../utils/Cookie";
import LoginForm from "../components/Login/LoginForm";

export default class Login extends React.PureComponent {
    render() {
        let pageContents = getPlayerName() ? <Redirect to="/"/> : <LoginForm className="centered-top"/>

        return (
            <React.Fragment>
                {pageContents}
            </React.Fragment>
        )
    }
}