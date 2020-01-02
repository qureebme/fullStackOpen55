import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import OneBlog from './togglable2'
import MainItem from './mainItem'
import ShowLists2 from './showBlogList2'

import SimpleBlog from './simpleBlog'
import { func } from 'prop-types'

describe('SimpleBlog tests', () => {
    let component
    
    beforeEach(() => {
        const props = {
            blog: {
                title: 'Sometime in Babylon',
                author: 'Ramachandra',
                likes: 5
            }
            
        }
        const onClick = () => {
            props.blog.likes = props.blog.likes + 1;
        }
        component = render(<SimpleBlog blog={props.blog} onClick={onClick}></SimpleBlog>)
    })

    test('renders stuff', () => {
    
        expect(component.container).toHaveTextContent('Sometime in Babylon')
        expect(component.container).toHaveTextContent('Ramachandra')
        expect(component.container).toHaveTextContent(5)
    })
})


describe('testing my blog component', () => {
    let component;
    
    beforeEach(() =>{
        let oneB = {
            title: 'Whattagwan!',
            author: 'Rajastan',
            url: 'http://oneworld.org',
            likes: 5,
            id: null,
            loggedUser: 'ademola',
            listedUser: {username: 'ademola'}
        }

        const onClickDelete = function(id){console.log(id)}
        component = render(
        <OneBlog> 
            <MainItem title={oneB.title} author={oneB.author} />
            <ShowLists2 url={oneB.url} likes={oneB.likes} listedUser={oneB.listedUser} 
                                    loggedUser={oneB.loggedUser} onClickDelete={onClickDelete} />
        </OneBlog>
            )        
    })
    test('only title and author are shown by default', () => {
        expect(component.container).toHaveTextContent('Whattagwan')
        expect(component.container).toHaveTextContent('Rajastan')

        const div = component.container.querySelector('.child2')
        expect(div).toHaveStyle('display: none')
    })

    test ('other parts show after clicking', () => {
        const div = component.container.querySelector('.main')

        fireEvent.click(div)
        expect(div).toHaveStyle('display: ')
    })
})


    /*test('clicking like button twice calls event handler twice', () => {
        const mockHandler = jest.fn()
        
        /*const button = component.getByText('like')
        fireEvent.click(button)
        expect(mockHandler.mock.calls.length).toBe(1)
        //component.debug()

        const {getByText} = component,
                button = getByText('like')

        fireEvent.click(button)
        expect(mockHandler).toHaveBeenCalled()
    })*/