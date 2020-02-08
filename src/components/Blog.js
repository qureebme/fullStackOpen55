import React, {useState} from 'react'
import MainItem from './mainItem'

const Blog = (props) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' } //hidden by default

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div onClick={toggleVisibility}>
        <MainItem title={props.title} author={props.author}></MainItem>
      </div>

      <div style={showWhenVisible} className={'child1'}>
        {props.children}
      </div>
    </div>
  )
}
  
  export default Blog