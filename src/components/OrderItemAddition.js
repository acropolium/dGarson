import React, { Component } from 'react';
import { CheckBox } from '../components/BaseComponents';
import I18n from '../services/translate.js';
import { Icon, View, Text } from './BaseComponents';
import styles from '../styles/components/OrderItemAdditionStyles';

export default class OrderItemAddition extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itemAddition: false,
            idx: false,
        };
    }

    changeItemAddition = (root_item, root_item_idx, idx, operation) => {
        this.props.changeOrderItemAddition(
            root_item,
            root_item_idx,
            idx,
            operation
        );
    };

    render() {
        const { itemAddition, idx, root_item_idx, root_item } = this.props;

        return (
            <View style={styles.addition_main}>
                <Text
                    style={[
                        styles.custom_font,
                        styles.order_block_additions_text,
                        itemAddition.count > 0 ? { color: '#000' } : {},
                    ]}>
                    {itemAddition.name} -{' '}
                    {parseFloat(itemAddition.price).toFixed(2)}{' '}
                    {I18n.t(this.props.currency)}
                </Text>
                <View style={styles.item_checkbox}>
                    <CheckBox
                        isChecked={itemAddition.count > 0}
                        onClick={() => {
                            this.changeItemAddition(
                                root_item,
                                root_item_idx,
                                idx,
                                itemAddition.count > 0 ? 'remove' : 'add'
                            );
                        }}
                        checkedImage={<Icon name={'select_order_item'} />}
                        unCheckedImage={<Icon name={'unselect_order_item'} />}
                    />
                </View>
            </View>
        );
    }
}
