import React from "react";
import './Wiz.css';
import WizGame from "../components/Wiz/WizGame";
import { match, RouteComponentProps } from "react-router";
import { WizApi } from "../api/WizApi";

interface IRouteParams {
    id: string
}
interface IWizProps extends RouteComponentProps<IRouteParams>{
    match: match<IRouteParams>;
}
interface IWizState {
    game: any
}
export default class Wiz extends React.PureComponent<IWizProps,IWizState> {
    componentDidMount() {
        WizApi.getGame(this.props.match.params.id).then((res) => {
            res.json().then((json) => {
                console.log(json.game)
                this.setState({game: json.game})
            })
        })
    }
    render() {
        return (
            <React.Fragment>
                <WizGame/>
            </React.Fragment>
        )
    }
}