import { createSelector } from 'reselect'

export const articlesLoadingSelector = state => state.articles.loading
export const articlesMapSelector = state => state.articles.entities
export const articleListSelector = createSelector(articlesMapSelector, articlesMap => articlesMap.valueSeq().toJS())
export const commentMapSelector = state => state.comments.entities
export const commentPagesMapSelector = state => state.comments.pages
export const totalCommentPagesSelector = state => state.comments.totalPages
export const filtersSelector = state => state.filters
export const idSelector = (_, props) => props.id
export const pageSelector = (_, props) => props.page

export const filtersSelectionSelector = createSelector(filtersSelector, (filters) => filters.selected)

export const filtratedArticles = createSelector(articleListSelector, filtersSelector, (articles, filters) => {
    const {selected, dateRange: {from, to}} = filters
    console.log('---', 'calculating filtration')

    return articles.filter(article => {
        const published = Date.parse(article.date)
        return (!selected.length || selected.includes(article.id)) &&
            (!from || !to || (published > from && published < to))
    })
})

export const createCommentSelector = () => createSelector(commentMapSelector, idSelector, (comments, id) => {
    return comments.get(id)
})

export const commentsByPageSelector = createSelector(commentPagesMapSelector, pageSelector, (pages, page) => {
    return pages.getIn([page, 'comments'])
})

export const commentPageLoadingSelector = createSelector(commentPagesMapSelector, pageSelector, (pages, page) => {
    return pages.getIn([page, 'loading'])
})

export const commentPageLoadedSelector = createSelector(commentPagesMapSelector, pageSelector, (pages, page) => {
    return pages.getIn([page, 'loaded'])
})

export const articleSelector = createSelector(articlesMapSelector, idSelector, (articles, id) => articles.get(id))