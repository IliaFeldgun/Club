import React from "react";
import "./Home.css"
import Description from "../components/Home/Description";
import Catalog from "../components/Home/Catalog";
import wizGameImage from '../img/WizClub2Small.png'
interface IHomeProps {

}
interface IHomeState {
    roomId: string
}
export default class Home extends React.PureComponent<IHomeProps,IHomeState> {
    constructor(props: IHomeProps){
        super(props)
        this.state = {
            roomId: ""
        }
    }
    render() {
        return (
            <React.Fragment>
                <Description/>
                <Catalog games={[{name: "Wizard", url: "/room",
                                  img: wizGameImage}]} />
            </React.Fragment>
        )
    }
}