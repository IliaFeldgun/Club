import React from "react";
import PostButton from "../components/PostButton";
import "./Home.css"
import Description from "../components/Home/Description";
import Catalog from "../components/Home/Catalog";
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
        return (
            <React.Fragment>
                <Description/>
                <Catalog games={[{name: "Wiz", url: "/wiz",
                                  img:"https://norskpokerforbund.com/wp-content/uploads/2018/08/Card-Game.jpg"}]} />
            </React.Fragment>
        )
    }
}