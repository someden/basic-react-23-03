import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MenuItem from './menu-item'

class Menu extends Component {
    static propTypes = {

    }

    static contextTypes = {
        l10n: PropTypes.object
    }

    render() {
        const { l10n } = this.context
        return (
            <div>
                <h3>{l10n.mainMenu}:</h3>
                {this.props.children}
            </div>
        )
    }
}

export { MenuItem }
export default Menu