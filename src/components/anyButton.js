import React from 'react'

const AnyButton = (props) => {

    if (props.loggedUser.username === props.listedUser.username)
        return (<button onClick={props.onClick} >{props.label}</button>)
    return null
    }
    

export default AnyButton;