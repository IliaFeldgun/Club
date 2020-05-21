import React from "react";

interface ILobbyState {
    rooms: string[]
}
export default class Lobby extends React.PureComponent<{},ILobbyState>{
    render() {
        const rooms = this.state.rooms.map((room) => 
            <li>{room}</li>    
        )
        return (
            <ol>
                {rooms}
            </ol>
        )
    }
}