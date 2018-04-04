import React from 'react'
import {shallow, render, mount} from 'enzyme'
import DecoratedArticleList, {ArticleList} from './index'
import articles from '../../fixtures'


describe('ArticleList', () => {
    it('should render a list', () => {
        const wrapper = shallow(<ArticleList articles = {articles} />)
        expect(wrapper.find('.test--article-list__item').length).toEqual(articles.length)
    });

    it('should have all articles closed by default', function () {
        const wrapper = render(<DecoratedArticleList articles = {articles}/>)
        expect(wrapper.find('.test--article__body').length).toEqual(0)
    });

    it('should open and close first article', () => {
        const wrapper = mount(<DecoratedArticleList articles = {articles}/>)
        expect(wrapper.find('.test--article__body').length).toEqual(0)

        wrapper.find('.test--article__btn').at(0).simulate('click')
        expect(wrapper.find('.test--article__body').length).toEqual(1)

        wrapper.find('.test--article__btn').at(0).simulate('click')
        expect(wrapper.find('.test--article__body').length).toEqual(0)
    });

    it('should fetch data', () => {
        let fetched = false
        shallow(<ArticleList articles = {articles} fetchData = {() => fetched = true} />)

        expect(fetched).toEqual(true)
    });
});