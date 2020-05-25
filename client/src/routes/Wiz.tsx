import React from "react";
import './Wiz.css';
import WizGame from "../components/Wiz/WizGame";
import { match, RouteComponentProps } from "react-router";

interface IRouteParams {
    roomId: string
}
interface IWizProps extends RouteComponentProps<IRouteParams>{
    match: match<IRouteParams>;
}
interface IWizState {

}
export default class Wiz extends React.PureComponent<IWizProps,IWizState> {
    render() {
        return (
            <React.Fragment>
                <WizGame/>
            </React.Fragment>
        )
    }
}