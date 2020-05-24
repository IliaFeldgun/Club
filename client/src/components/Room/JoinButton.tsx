import React from 'react'
import LobbyApi from '../../api/LobbyApi'

interface IJoinButtonProps{
    roomId: string
}
export default class JoinButton extends React.PureComponent<IJoinButtonProps,{}>{
    constructor(props: IJoinButtonProps) {
        super(props)
        this.handleRoomJoin = this.handleRoomJoin.bind(this)
    }
    handleRoomJoin(event: React.MouseEvent<HTMLButtonElement>) {
        LobbyApi.joinRoom(this.props.roomId).then((res: Response) => 
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
            <button className={buttonClass} type="button" onClick={this.handleRoomJoin}>
                <span>Join this room</span>
            </button>
        )
    }
}