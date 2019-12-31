import React, {useState} from 'react'

const Togglable2 = (props) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' } //hidden by default

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div onClick={toggleVisibility}>
        {props.children[0]}
      </div>

      <div style={showWhenVisible}>
        {props.children[1]}
      </div>
    </div>
  )
}
  
  export default Togglable2