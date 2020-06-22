import React from 'react'

export default class PlaceholderCard extends React.PureComponent {
    render() {
        const classes = `player-card placeholder-card`
        return (<p className={classes}/>)
    }

}