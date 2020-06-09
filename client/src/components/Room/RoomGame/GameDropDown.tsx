import React from 'react'

interface IGameDropDownProps {
    gameNames: string[]
    handleSelection: (gameName: string) => void
}
interface IGameDropDownState {
    selectedGameName: string
}
export default class GameDropDown extends React.PureComponent
    <IGameDropDownProps, IGameDropDownState> {
    constructor(props: IGameDropDownProps) {
        super(props)

        this.state = {
            selectedGameName: props.gameNames[0]
        }

        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const selectedGameIndex = event.target.selectedIndex
        const selectedGameName = this.props.gameNames[selectedGameIndex]

        this.setState({
            selectedGameName
        })

        this.props.handleSelection(selectedGameName)
    }
    render() {
        const games = this.props.gameNames.map((game) => {
            return <option key={game} value={game}>{game}</option>
        })

        return (
            <React.Fragment>
                <div>Select the game you wish to start: </div>
                <select 
                    className="room-game-select"
                    name="games"
                    onChange={this.handleChange}
                >
                    {games}
                </select>
            </React.Fragment>
        )
    }
}