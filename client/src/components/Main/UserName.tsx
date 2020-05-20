import React from "react";
import Cookies from 'universal-cookie';

export default class UserName extends React.PureComponent {
    render() {
        const cookies = new Cookies()
        const signedCookie = cookies.get("player_name")
        let playerName
        if (signedCookie) {
            playerName = signedCookie.split(".")[0].replace("s:","")
        }
        // TODO: Remove after debug
        if (!playerName)
        {
            playerName = <a href="/login">Login</a>
        }
        return (
            <span className="main-user">
                {playerName}
            </span>
        )
    }
}