import React from 'react'

export default class EmptyCard extends React.PureComponent {
    render() {
        const classes = `blue card`
        return (<p className={classes}/>)
    }

}