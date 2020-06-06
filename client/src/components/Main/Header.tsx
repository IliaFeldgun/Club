import React from "react";

export default class Header extends React.PureComponent{
    render() {
        return (
            <React.Fragment>
                <header className="top wide">
                    <a href="/">
                        <span className="main-title">♣ Club</span>
                    </a>
                    {this.props.children}
                </header>
            </React.Fragment>
        )
    }
}