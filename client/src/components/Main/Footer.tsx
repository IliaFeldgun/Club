import React from "react";

export default class Footer extends React.PureComponent{
    render() {
        return (
            <footer className="bottom fixed horizontal-centered wide">
                <p>No rights reserved. We're collecting all your data!</p>
                {this.props.children}
            </footer>
        )
    }
}