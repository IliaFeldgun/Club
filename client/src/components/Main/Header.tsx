import React from "react";

export default class Header extends React.PureComponent{
    render() {
        return (
            <React.Fragment>
                <header className="top wide">
                    <span className="main-title">Wiz</span>
                    {this.props.children}
                </header>
            </React.Fragment>
        )
    }
}