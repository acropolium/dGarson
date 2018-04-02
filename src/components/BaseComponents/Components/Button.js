import React, { Component } from 'react'
import { TouchableOpacity, Dimensions } from 'react-native'

import View from './View'
let windowWidth = Dimensions.get('window').width

export default class soButton extends React.Component {
    constructor(props) {
        super(props)
    }

    prepareRootProps() {
        let customProps = {
            height: 50,
            marginTop: 0,
            paddingTop: 0,
            marginBottom: 0,
            paddingBottom: 0,
            borderRadius: 35
        }

        if (
            this.props.hasOwnProperty('buttonBorder') &&
            this.props.buttonBorder != false
        ) {
            customProps['borderColor'] = this.props.buttonBorder
            customProps['borderWidth'] = 1
        }

        customProps.justifyContent = 'center'
        customProps.alignItems = 'center'

        customProps.width = windowWidth - 80

        customProps.backgroundColor = this.props.backgroundColor
            ? this.props.backgroundColor
            : '#000'

        return { style: customProps }
    }

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View {...this.prepareRootProps()}>{this.props.children}</View>
            </TouchableOpacity>
        )
    }
}
