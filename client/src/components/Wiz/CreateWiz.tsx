import React from 'react'
import { WizApi } from '../../api/WizApi'

interface ICreateWizProps {
    roomId: string
}
export default class CreateWiz extends React.PureComponent<ICreateWizProps,{}>{
    constructor(props: ICreateWizProps) {
        super(props)

        this.handleWizCreation = this.handleWizCreation.bind(this)
    }
    handleWizCreation(event: React.MouseEvent<HTMLButtonElement>) {
        WizApi.newGame(this.props.roomId).then((res: Response) => 
        {
            // Statuses not failed
            if (res.status !== 403 && res.status !== 500) {
                    window.location.assign("/wiz/" + this.props.roomId) 
            }
        })
    }
    render() {
        const buttonClass = "form-button"
        return (
            <React.Fragment>
                <div>
                    <button className={buttonClass} type="button" onClick={this.handleWizCreation}>
                        <span>Create Wiz Game</span>
                    </button>
                </div>
            </React.Fragment>
        )
    }
}