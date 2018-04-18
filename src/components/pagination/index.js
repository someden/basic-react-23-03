import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './style.css'

class Pagination extends Component {
    static propTypes = {
        totalPages: PropTypes.number,
        currentPage: PropTypes.number,
        urlPrefix: PropTypes.string
    }

    render() {
        const { totalPages } = this.props
        if (!totalPages) return null
        return Array(totalPages).fill('').map((_, index) => this.getLink(index + 1))
    }

    getLink = page => (
        <Link
            key={page}
            to={`${this.props.urlPrefix}/${page}`}
            className={`page-link ${this.props.currentPage === page ? 'active' : ''}`}
        >
            {page}
        </Link>
    )
}

export default Pagination