'use strict'
import React from 'react'
import {
    StyleSheet,
    Dimensions,
    Modal,
    ScrollView,
    TouchableOpacity,
    Platform
} from 'react-native'
import PropTypes from 'prop-types'
import { Actions, ActionConst } from 'react-native-router-flux'

import styles from '../../styles/widgets/modal-picker/style'
import BaseComponent from './BaseComponent'

import { Icon } from '../../components/BaseComponents'
import Button from '../../widgets/buttons/styledButton'
import { View, Text } from '../../components/BaseComponents'
import I18n from '../../services/translate.js'

let windowWidth = Dimensions.get('window').width
let windowHeight = Dimensions.get('window').height

let componentIndex = 0

const propTypes = {
    data: PropTypes.array,
    onChange: PropTypes.func,
    initValue: PropTypes.string,
    optionTextStyle: Text.propTypes.style,
    sectionTextStyle: Text.propTypes.style,
    cancelTextStyle: Text.propTypes.style,
    cancelText: PropTypes.string
}

const defaultProps = {
    data: [],
    onChange: () => {},
    initValue: 'Select me!',
    style: {},
    selectStyle: {},
    optionStyle: {},
    optionTextStyle: {},
    sectionStyle: {},
    sectionTextStyle: {},
    cancelStyle: {},
    cancelTextStyle: {},
    cancelText: I18n.t('cancel'),
    overlayStyle: {}
}

export default class ModalPicker extends BaseComponent {
    constructor(props) {
        super(props)

        this._bind('onChange', 'close', 'renderChildren')

        this.state = {
            animationType: 'slide',
            modalVisible: false,
            transparent: false,
            selected: 'please select'
        }
    }

    componentDidMount() {
        this.setState({
            selected: this.props.initValue ? this.props.initValue : 'Select me!'
        })
        this.setState({
            cancelText: this.props.cancelText ? this.props.cancelText : 'cancel'
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.initValue != this.props.initValue) {
            this.setState({ selected: nextProps.initValue })
        }
    }

    onChange = async item => {
        this.props.setOrder({ desired_time: item.value })
        this.close()
    }

    close() {
        Actions.pop()
    }

    renderSection(section) {
        return (
            <View
                key={section.key}
                style={[styles.sectionStyle, this.props.sectionStyle]}>
                <Text
                    style={[
                        styles.sectionTextStyle,
                        this.props.sectionTextStyle
                    ]}>
                    {section.label}
                </Text>
            </View>
        )
    }

    renderOption(option) {
        return (
            <TouchableOpacity
                key={option.key}
                onPress={() => this.onChange(option)}>
                <View style={[styles.optionStyle, this.props.optionStyle]}>
                    <Text
                        style={[
                            styles.optionTextStyle,
                            this.props.optionTextStyle,
                            this.props.desired_time == option.value
                                ? { color: 'white' }
                                : {}
                        ]}>
                        {option.label}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    getFormattedTime = desired_time => {
        let outStr = ''
        if (desired_time < 60) {
            outStr = desired_time + ' ' + I18n.t('min')
        } else {
            let hr = ~~(desired_time / 60).toString()
            let minutes = desired_time % 60

            outStr =
                hr +
                ' ' +
                I18n.t('hour') +
                (minutes == 0 ? '' : ' ' + minutes + ' ' + I18n.t('min'))
        }
        return outStr
    }

    renderOptionList() {
        let index = 0
        const data = [
            { key: index++, label: this.getFormattedTime(15), value: 15 },
            { key: index++, label: this.getFormattedTime(30), value: 30 },
            { key: index++, label: this.getFormattedTime(45), value: 45 },
            { key: index++, label: this.getFormattedTime(60), value: 60 },
            { key: index++, label: this.getFormattedTime(90), value: 90 },
            { key: index++, label: this.getFormattedTime(120), value: 120 },
            { key: index++, label: this.getFormattedTime(150), value: 150 },
            { key: index++, label: this.getFormattedTime(180), value: 180 }
        ]

        let options = data.map(item => {
            if (item.section) {
                return this.renderSection(item)
            } else {
                return this.renderOption(item)
            }
        })

        return (
            <View style={[styles.overlayStyle, this.props.overlayStyle]}>
                <View style={styles.optionContainer}>
                    <ScrollView keyboardShouldPersistTaps="always">
                        <View>{options}</View>
                    </ScrollView>
                </View>
                <View style={styles.cancelContainer}>
                    <Button
                        backgroundColor="#000"
                        style={{ width: windowWidth - 80 }}
                        title={this.props.cancelText.toUpperCase()}
                        onPress={this.close}
                    />
                </View>
            </View>
        )
    }

    renderChildren() {
        if (this.props.children) {
            return this.props.children
        }
        return (
            <View
                style={[
                    styles.selectStyle,
                    this.props.selectStyle,
                    { padding: 0, paddingRight: 8 }
                ]}>
                <Text
                    style={[
                        styles.custom_font,
                        styles.selectTextStyle,
                        this.props.selectTextStyle,
                        { fontSize: 15 }
                    ]}>
                    {this.state.selected}
                </Text>
                <Icon
                    name={'arrow-down'}
                    iconFamily="SimpleLineIcons"
                    style={{ paddingTop: 15, paddingRight: 5, fontSize: 14 }}
                />
            </View>
        )
    }

    render() {
        const dp = (
            <Modal
                transparent={true}
                ref="modalP"
                visible={this.state.modalVisible}
                onRequestClose={this.close}
                animationType={this.state.animationType}>
                {this.renderOptionList()}
            </Modal>
        )

        return (
            <View style={[stylesOverlay.overlayStyle]}>
                {this.renderOptionList()}
            </View>
        )
    }
}

let stylesOverlay = StyleSheet.create({
    overlayStyle: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(42, 42, 50, 0.97)'
    }
})

ModalPicker.propTypes = propTypes
ModalPicker.defaultProps = defaultProps
