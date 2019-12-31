import React from 'react'

const LoginForm = (props) => {
    return(
        <div>
            <form onSubmit={props.onSubmitHandler}>
                <h1>Login form</h1>
                <div>
                    username <input value={props.name} type='text' onChange= {props.onChangeUser}/><br/><br/>
                    password <input value={props.password} type='password' onChange= {props.onChangePass}/>
                </div>
                <div>
                    <button type="submit">login</button>
                </div>
            </form>

        </div>
    )
}

export default LoginForm

/*
const LoginForm = ({name, password, onChangeUser, onChangePass, onSubmitHandler}) => {
    return(
        <div>
            <form onSubmit={onSubmitHandler}>
                <h1>Login form</h1>
                <div>
                    username <input value={name} type='text' onChange= {onChangeUser}/><br/><br/>
                    password <input value={password} type='password' onChange= {onChangePass}/>
                </div>
                <div>
                    <button type="submit">login</button>
                </div>
            </form>

        </div>
    )
}*/