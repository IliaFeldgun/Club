import React from 'react'
import LobbyApi from '../api/LobbyApi'
interface IRoomCreateProps {

}
interface IRoomCreateState {
    roomId: string
}
export default class Rooms extends React.PureComponent<IRoomCreateProps,IRoomCreateState> {
    constructor(props: IRoomCreateProps) {
        super(props)

        this.state = {roomId: ""}
        this.handleRoomCreation = this.handleRoomCreation.bind(this)
    }
    handleRoomCreation(event: React.MouseEvent<HTMLButtonElement>) {
        LobbyApi.newRoom().then((res: Response) => 
        {  
            if (res.status === 403) {
                window.location.assign("/login")
            }
            else {
                res.json().then((json) => {
                    window.location.assign("/room/" + json.roomId) 
                })
            }
        })
    }
    render() {
        const buttonClass = "form-button"
        return (
            <React.Fragment>
                <div className="centered-top">
                    <h3>Create a room</h3>
                    <button className={buttonClass} type="button" onClick={this.handleRoomCreation}>
                        <span>New Room</span>
                    </button>
                </div>
            </React.Fragment>
        )
    }
}