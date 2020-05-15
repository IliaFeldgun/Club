import React from "react";
import PostButton from "../components/PostButton";

interface IHomeState{
    roomId: string
}
export default class Home extends React.PureComponent<{},IHomeState> {
    constructor(){
        super({})
        this.state = {
            roomId: ""
        }
        this.roomCreated = this.roomCreated.bind(this)
        this.gameCreated = this.gameCreated.bind(this)
    }
    roomCreated(res: Response) {
            res.json().then((res) =>
            {
                this.setState({
                    roomId: res.roomId
                })
            })
    }
    gameCreated(res: Response) {

    }
    render() {
        const allClass = "centered"
        return (
            <React.Fragment>
                <div className={allClass}>
                    <h3>Create a room</h3>
                    <PostButton text="Create a room for me" route="api/room" handleResponse={this.roomCreated}/>
                    <PostButton text="Create a game for me" route="api/game/wiz" handleResponse={this.gameCreated} body={this.state}/>
                </div>
            </React.Fragment>
        )
    }
}