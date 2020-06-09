import React from 'react'

interface IGameDisplayProps {
    gameName: string
}
export default class extends React.PureComponent<IGameDisplayProps>{
    render() {
        return (
            <React.Fragment>
                {this.props.gameName && 
                    <div className="room-game-name">
                        {"Game in progress: "}
                        {this.props.gameName}
                    </div> 
                }
            </React.Fragment>
        )
    }
}