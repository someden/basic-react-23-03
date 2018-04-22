import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import App from './app'
import store from './store'
import history from './history'
import Localization from './components/localization'

ReactDOM.render(
    <Provider store = {store}>
        <Localization>
            <ConnectedRouter history = {history}>
                <App />
            </ConnectedRouter>
        </Localization>
    </Provider>
, document.getElementById('root'))
