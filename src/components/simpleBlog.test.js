import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'

import SimpleBlog from './simpleBlog'
import { func } from 'prop-types'

test('renders stuff', () => {
    const props = {
        blog: {
            title: 'Sometime in Babylon',
            author: 'Ramachandra',
            likes: 5
        },
        onClick: function(){}
    }

    const component = render(<SimpleBlog blog={props.blog} onClick={props.onClick} likes={props.likes} />)

    expect(component.container).toHaveTextContent('Sometime in Babylon')
    expect(component.container).toHaveTextContent('Ramachandra')
    expect(component.container).toHaveTextContent(5)
})