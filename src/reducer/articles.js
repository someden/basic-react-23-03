import { normalizedArticles } from '../fixtures'
import { DELETE_ARTICLE, ADD_COMMENT } from '../constants'

const defaultArticles = normalizedArticles.reduce((acc, article) => ({
    ...acc,
    [article.id]: article
}), {})

export default (articlesState = defaultArticles, action) => {
    const { type, payload } = action

    switch (type) {
        case DELETE_ARTICLE:
            const { [payload.id]: deletedArticle, ...restArticles } = articlesState;
            return restArticles

        case ADD_COMMENT:
            const { comment: { articleId, id: commentId } } = payload
            const { [articleId]: article } = articlesState
            const { comments } = article
            return { ...articlesState, [articleId]: { ...article, comments: [...comments, commentId] }  }

        default:
            return articlesState
    }
}