import React from 'react'

let style = function(err, mssg){
    if(err || mssg) return {
                color: (function(){
                if (err) return 'red'
                if (mssg) return 'green'
                return null
                })(),
                fontSize: 15,
                backgroundColor: 'lightgrey',
                padding: 10,
                borderStyle: 'solid',
                borderRadius: 5
                }
}

const Notif = ({error, mssg}) => {
    return (
        <div style={style(error, mssg)}>
            <h3>{error}</h3>
            <h3>{mssg}</h3>
        </div>
    )
}

export default Notif