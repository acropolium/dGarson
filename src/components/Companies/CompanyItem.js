import React, { PropTypes, Component } from 'react'
import { ImageBackground } from 'react-native'
import { Icon, View, TouchableHighlight } from '../BaseComponents'
import ItemInnerBlock from './ItemInnerBlock'
import styles from '../../styles/components/companies/CompanyItemStyle'
import I18n from '../../services/translate.js'
import {
    ORDER_INPROGRESS,
    ORDER_READY,
    ORDER_NOTPICKED,
    ORDER_CANCEL,
    ORDER_PAYED,
} from '../../reducers/constOrderState.js'

export default class CompanyItem extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    getMenu = async item => {
        this.props.getCompanyMenu(item.id).catch(error => {
            this.props.dialogActions.dialogShow({
                title: I18n.t('server_error'),
                message: error.message
            })
        })
    }

    getOrderState() {
        if (this.props.item.latest_order &&
            (this.props.item.latest_order.state !== ORDER_CANCEL &&
                this.props.item.latest_order.state !== ORDER_PAYED)
        ) {
            return this.props.item.latest_order.state
        }
        return false
    }

    renderInnerBlock = () => {
        return (
            <ItemInnerBlock
                item={this.props.item}
                orderState={this.getOrderState()}
            />
        )
    }

    render() {
        return (
            <View style={styles.card_block_wrap}>
                <TouchableHighlight
                    underlayColor="#ddd"
                    onPress={() => {
                        this.getMenu(this.props.item)
                    }}>
                    {this.getOrderState() == ORDER_INPROGRESS ? (
                        <ImageBackground
                            source={require('../../media/elements/inprogress.gif')}
                            style={[styles.card_block_main, styles.img_style]}>
                            {this.renderInnerBlock()}
                            <View style={styles.item_icon_add}>
                                <Icon
                                    name="click_company_inprogress"
                                />
                            </View>
                        </ImageBackground>
                    ) : (
                            <View
                                style={[
                                    styles.card_block_main,
                                    {
                                        backgroundColor:
                                            this.getOrderState() == ORDER_READY
                                                ? '#dbc24f'
                                                : this.getOrderState() ==
                                                    ORDER_NOTPICKED
                                                    ? '#e65048'
                                                    : 'transparent'
                                    }
                                ]}>
                                {this.renderInnerBlock()}
                                <View style={styles.item_icon_add}>
                                    <Icon
                                        name="click_company"
                                    />
                                </View>
                            </View>
                        )}
                </TouchableHighlight>
            </View>
        )
    }
}
