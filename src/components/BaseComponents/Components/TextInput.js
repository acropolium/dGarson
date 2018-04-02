import React, { PureComponent } from 'react'
import { TextInput as BaseTextInput } from 'react-native'

const TextInput = props => {
    return <BaseTextInput ref={props.defainRef} {...props} />
}

export default TextInput
