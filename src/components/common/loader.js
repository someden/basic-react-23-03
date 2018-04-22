import React from 'react'
import PropTypes from 'prop-types'

function Loader(props, context) {
    return (
        <h2>{context.l10n.loading}...</h2>
    )
}

Loader.contextTypes = {
    l10n: PropTypes.object
}

export default Loader