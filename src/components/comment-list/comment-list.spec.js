import React from 'react'
import {mount} from 'enzyme'
import DecoratedCommentList from './index'
import articles from '../../fixtures'

const { comments } = articles[0]

describe('CommentList', () => {
    it('should open and close comments', () => {
        const wrapper = mount(<DecoratedCommentList comments = {comments}/>)
        expect(wrapper.find('.test--comments__body').length).toEqual(0)

        wrapper.find('.test--comments__btn').at(0).simulate('click')
        expect(wrapper.find('.test--comments__body').length).toEqual(1)

        wrapper.find('.test--comments__btn').at(0).simulate('click')
        expect(wrapper.find('.test--comments__body').length).toEqual(0)
    });
});