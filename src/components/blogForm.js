import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = (props) => {

    return(
        <div>
            <form onSubmit={props.onBlogSubmit}>
                <h1>create a new blog</h1>
                <div>
                    title <input type="text" value={props.title} onChange={props.onChangeTitle} /><br/><br/>
                    author <input type="text" value={props.author} onChange={props.onChangeAuthor} /><br/><br/>
                    url <input type="url" value={props.url} onChange={props.onChangeUrl} /><br/><br/>
                </div>
                <button type="submit"> post new blog </button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    onBlogSubmit: PropTypes.func.isRequired,
    onChangeTitle: PropTypes.func.isRequired,
    onChangeAuthor: PropTypes.func.isRequired,
    onChangeUrl: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
}

export default BlogForm;