import React from "react";

export default class Home extends React.PureComponent {
    constructor(){
        super({})
        this.roomCreate = this.roomCreate.bind(this)
    }
    roomCreate(e: React.MouseEvent) {
        fetch("/api/room", {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((res) => {
            res.json().then((res) =>
            {
                
            })
        })
    }

    render() {
        const allClass = "centered"
        const buttonClass = "form-button"
        return (
            <React.Fragment>
                <div className={allClass}>
                    <h3>Create a room</h3>
                    <button className={buttonClass} id="roomcreate" type="button" onClick={this.roomCreate}>
                        <span>
                            Create a room for me
                        </span>
                    </button>
                </div>
            </React.Fragment>
        )
    }
}