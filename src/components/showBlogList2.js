import React from 'react'
import services from '../services/blogs'
import Button from './anyButton'

const ShowBlogList2 = (props) => {
  const onClickLike = async (props) => {
    try{
      const body = {
        likes: props.likes + 1
        }
      services.updateLike(props.id, body)
    }
    catch(e){}
  }

    return (
          <div>
              <div><a href={props.url}>{props.url}</a></div>
              <div>{`${props.likes} likes`} <button onClick={() => onClickLike(props)}>like</button></div>
              <div>added by {props.listedUser.username} </div>
              {<Button onClick={() => props.onClickDelete(props.id)} label={"remove"} listedUser={props.listedUser} 
                        loggedUser={props.loggedUser} />}
          </div>
    )
}

  export default ShowBlogList2