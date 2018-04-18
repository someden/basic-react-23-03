import {connect} from 'react-redux'
import { totalCommentPagesSelector } from '../../selectors'
import Pagination from '../pagination'

export default connect(state => ({
    totalPages: totalCommentPagesSelector(state)
}))(Pagination)