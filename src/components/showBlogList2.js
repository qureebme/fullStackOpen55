import React from 'react'
import Button from './anyButton'

const ShowBlogList2 = (props) => {

    return (
          <div>
              <div><a href={props.url}>{props.url}</a></div>
              <div>{`${props.likes} likes`} <button onClick={props.onClickLikes}>like</button></div>
              <div>added by {props.listedUser.username} </div>
              {<Button onClick={() => props.onClickDelete(props.id)} label={"remove"} listedUser={props.listedUser} 
                        loggedUser={props.loggedUser} />}
          </div>
    )
}

  export default ShowBlogList2
