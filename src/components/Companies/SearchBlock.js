import React from 'react'
import { Platform, StyleSheet } from 'react-native'
import {
    TextInput,
    Icon,
    TouchableHighlight,
    KeyboardWrapper,
    View
} from '../BaseComponents'
import PropTypes from 'prop-types'
import config from '../../config'
import i18n from '../../services/translate'
import styles from '../../styles/components/companies/SearchBlockStyle'

const SearchBlock = props => {
    let keyboardOffset = 0
    let keyboardBehavior = undefined
    if (Platform.OS === 'ios') {
        keyboardOffset = -20
        keyboardBehavior = 'padding'
    }
    return (
        <KeyboardWrapper
            behavior={keyboardBehavior}
            keyboardVerticalOffset={keyboardOffset}>
            <View style={[styles.footer_main]}>
                <View style={[styles.total_block]}>
                    <View>
                        <Icon
                            name="search_block_search"
                        />
                    </View>
                    <View style={{ marginLeft: 5, flex: 1 }}>
                        <TextInput
                            style={[styles.custom_font, styles.number2]}
                            keyboardType="default"
                            placeholder={i18n.t('search_companies')}
                            value={props.value}
                            placeholderTextColor="#fff"
                            underlineColorAndroid="transparent"
                            onChangeText={props.doSearch}
                        />
                    </View>
                </View>

                {props.showClear && (
                    <TouchableHighlight
                        onPress={props.clearSearch}
                        style={styles.touchable_icon}>
                        <View style={[styles.preview_main]}>
                            <Icon
                                name="search_block_close"
                            />
                        </View>
                    </TouchableHighlight>
                )}
            </View>
        </KeyboardWrapper>
    )
}

SearchBlock.propTypes = {
    clearSearch: PropTypes.func.isRequired,
    doSearch: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired
}

export default SearchBlock
