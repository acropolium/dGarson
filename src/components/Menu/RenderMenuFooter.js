import React, { Component } from 'react'
import { Icon, Text, View, TouchableHighlight } from '../BaseComponents'
import I18n from '../../services/translate.js'
import styles from '../../styles/components/Menu/RenderMenuFooterStyle'
import { PREVIEW_ORDER_SCENE, } from '../../scene/sceneConstant.js'
import {
    ORDER_DRAFT
} from '../../reducers/constOrderState.js'

export default class RenderMenuFooter extends Component {
    constructor(props) {
        super(props)
    }

    previewOrder = async () => {
        if (
            this.props.total_price.hasOwnProperty('total') &&
            this.props.total_price.total == 0
        ) {
            return
        }

        let items = []
        Object.keys(this.props.order_draft).map((objectKey, index) => {
            let value = this.props.order_draft[objectKey]
            Object.values(value.items).map((item, idx) => {
                item.index = idx
                items.push(item)
            })
        })

        let orderData = {
            company_id: this.props.company_id,
            state: ORDER_DRAFT,
            items: items,
            cost: this.props.total_price.total
        }

        this.props.setOrder({ order: orderData, state: ORDER_DRAFT })
        this.props.changePage(PREVIEW_ORDER_SCENE, false)
    }

    render() {
        return (
            <View style={styles.footer_main}>
                <View style={styles.total_block}>
                    <Text style={styles.total_color}>{I18n.t('total')}: </Text>
                    <Text style={styles.total_color}>
                        {this.props.total_price.total.toFixed(2)}{' '}
                        {I18n.t(this.props.currency)}
                    </Text>
                </View>

                {this.props.total_price.hasOwnProperty('total') &&
                    this.props.total_price.total > 0 && (
                        <TouchableHighlight onPress={this.previewOrder}>
                            <View style={[styles.preview_main]}>
                                <Text style={styles.custom_font}>
                                    {I18n.t('preview_order').toUpperCase()}
                                </Text>
                                <Icon
                                    name={"preview_order"}
                                />
                            </View>
                        </TouchableHighlight>
                    )}
            </View>
        )
    }
}
