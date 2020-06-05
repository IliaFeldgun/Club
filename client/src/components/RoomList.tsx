import React from "react";

interface IRoomListProps {
    rooms: string[]
}
export default class RoomList extends React.PureComponent<IRoomListProps,{}>{
    render() {
        const rooms = this.props.rooms.map((room) => 
            <li key={room}>
                <a href={`/room/${room}`}>{room}</a>
            </li>    
        )
        return (
            <ol>
                {rooms}
            </ol>
        )
    }
}