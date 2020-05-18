import React from "react";
import './Wiz.css';
import WizGame from "../components/Wiz/WizGame";

export default class Wiz extends React.PureComponent {
    render() {
        return (
            <React.Fragment>
                <WizGame/>
            </React.Fragment>
        )
    }
}