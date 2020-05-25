import React from "react";
import RoomList from "../components/RoomList";

interface ILobbyState {
    rooms: string[]
}
export default class Lobby extends React.PureComponent<{},ILobbyState>{
    constructor({}) {
        super({})

        this.state = {rooms: []}
    }
    render() {
        return (
            <RoomList rooms={this.state.rooms}/>
        )
    }
}