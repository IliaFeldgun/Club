import React from "react";
import { getPlayerName } from "../../utils/Cookie";

export default class UserName extends React.PureComponent {
    render() {
        let playerName = getPlayerName()
        let nameToRender = playerName ? 
            <a href="/profile">{playerName}</a> : 
            <a href="/login">Login</a>

        return (
            <span className="main-user">
                {nameToRender}
            </span>
        )
    }
}