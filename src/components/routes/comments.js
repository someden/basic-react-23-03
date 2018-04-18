import React, { Component, Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom'
import CommentsByPage from '../comments-by-page'
import Pagination from '../comments-by-page/pagination'

class CommentsPage extends Component {
    static propTypes = {

    }

    render() {
        return (
            <Route path = {`${this.props.match.path}/:page`} children = {this.getComments} />
        )
    }

    getComments = ({ match }) => {
        if (!match) return <Redirect to={`${this.props.match.path}/1`} />
        const page = Number(match.params.page);

        return (
            <Fragment>
                <CommentsByPage key = {page} page = {page} />
                <Pagination currentPage={page} urlPrefix={this.props.match.path} />
            </Fragment>
        )
    }
}

export default CommentsPage