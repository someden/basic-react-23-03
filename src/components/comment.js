import React, { PureComponent } from 'react'

class Comment extends PureComponent {
    render() {
        const { comment } = this.props
        return (
            <div>
                <h6>{comment.user}</h6>
                <p>{comment.text}</p>
            </div>
        )
    }
}

export default Comment