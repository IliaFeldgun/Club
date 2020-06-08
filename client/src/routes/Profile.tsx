import React from 'react'
import RoomList from '../components/RoomList'
import LobbyApi from '../api/LobbyApi'
interface IProfileProps {

}
interface IProfileState {
    rooms: string[]
}
export default class Profile extends React.PureComponent<IProfileProps,IProfileState> {
    constructor(props: IProfileProps) {
        super(props)

        this.state = {
            rooms: []
        }
    }

    componentDidMount() {
        LobbyApi.getPlayerRooms().then((rooms) => this.setState(() => ({rooms})))
    }
    render() {
        return (
            <div className="centered-top">
                Your rooms:
                <RoomList rooms={this.state.rooms}/>
            </div>
        )
    }

}