import React from 'react'

interface IPostButtonProps {
    text: string
    route: string
    body?: any
    handleResponse: (res: Response) => void
}
export default class PostButton extends React.PureComponent<IPostButtonProps> {
    constructor(props: IPostButtonProps){
        super(props)
        this.post = this.post.bind(this)
    }
    post(e: React.MouseEvent) {
        const options: RequestInit = {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.props.body)
        }

        fetch(this.props.route, options).then((res) => {
            this.props.handleResponse(res)
        })
    }
    
    render() {
        const buttonClass = "form-button"
        return (
            <React.Fragment>
                    <button className={buttonClass} type="button" onClick={this.post}>
                        <span>
                            {this.props.text}
                        </span>
                    </button>
            </React.Fragment>
        )
    }

}