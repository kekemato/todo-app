import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    margin: 12,
}

const Button = (props) => (
    <RaisedButton
        label={props.label}
        secondary={true}
        style={style}
        onClick={props.onClick}
    />
)

export default Button