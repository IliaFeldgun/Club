import React from "react";
import RoomList from "../components/RoomList";

interface ILobbyProps {

}
interface ILobbyState {
    rooms: string[]
}
export default class Lobby extends React.PureComponent<ILobbyProps,ILobbyState>{
    constructor(props: ILobbyProps) {
        super(props)

        this.state = {rooms: []}
    }
    render() {
        return (
            <RoomList rooms={this.state.rooms}/>
        )
    }
}