import React from "react"
import "./Catalog.css"
interface ICatalogProps {
    games: {name: string, img: string, url: string}[]
}
export default class Catalog extends React.PureComponent<ICatalogProps,{}> {
    render() {
        const games = this.props.games.map((game) => 
            <div className="catalog-item">
                <a href={game.url}>
                    <img src={game.img} />
                    <div>{game.name}</div>
                </a>
            </div>

        )
        return (
            <div className="catalog container">
                {games}
            </div>
        )
    }
}