import React from "react";

interface IRoomListProps {
    rooms: string[]
}
export default class RoomList extends React.PureComponent<IRoomListProps,{}>{
    render() {
        const rooms = this.props.rooms.map((room) => 
            <li key={room}>{room}</li>    
        )
        return (
            <ol>
                {rooms}
            </ol>
        )
    }
}