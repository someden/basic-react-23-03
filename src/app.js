import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect, NavLink, Switch } from 'react-router-dom'
import ArticleList from './components/routes/articles'
import CommentsPage from './components/routes/comments-page'
import UserForm from './components/user-form'
import Filters from './components/filters'
import Counter from './components/counter'
import Menu, { MenuItem } from './components/menu'
import LanguageSwitch from './components/localization/languageSwitch'

class App extends Component {
    static childContextTypes = {
        username: PropTypes.string,
        store: PropTypes.object
    }

    static contextTypes = {
        l10n: PropTypes.object
    }

    state = {
        user: ''
    }

    getChildContext() {
        return {
            username: this.state.user
        }
    }

    onUserChange = (user) => this.setState({ user })

    render() {
        const { l10n } = this.context
        console.log('---', 1)
        return (
            <div className="App">
                <LanguageSwitch />

                <Menu>
                    <MenuItem to = "/counter">{l10n.counter}</MenuItem>
                    <MenuItem to = "/filters">{l10n.filters}</MenuItem>
                    <MenuItem to = "/articles">{l10n.articles}</MenuItem>
                    <MenuItem to = "/comments">{l10n.comments}</MenuItem>
                </Menu>

                <UserForm value = {this.state.user} onChange = {this.onUserChange}/>

                <Switch>
                    <Redirect exact from = "/" to = "/articles" />
                    <Route path = "/counter" component = {Counter} exact />
                    <Route path = "/filters" component = {Filters}/>
                    <Route path = "/articles/new" render = {() => <h1>{l10n.newArticlePage}</h1>} />
                    <Route path = "/articles" component = {ArticleList} />
                    <Route path = "/comments" component = {CommentsPage} />
                    <Route path = "*" render = {() => <h1>{l10n.notFoundPage}</h1>} />
                </Switch>
            </div>
        )
    }
}

export default App
