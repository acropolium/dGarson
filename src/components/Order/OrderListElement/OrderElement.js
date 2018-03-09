import React from 'react';
import PropTypes from 'prop-types';
import {Text, View} from '../../BaseComponents';
import I18n from '../../../services/translate.js'
import OrderOption from "./OrderOption";
import styles from "../../../styles/components/order/OrderListStyle";

const OrderElement = (props) => {
   
    return (

        <View style={styles.wrap_order}>
            <View style={styles.item_block_main}>
                <View style={styles.item_block}>
                    <View >
                        <Text style={[styles.custom_font, styles.item_name_text]}>{props.item.name} #{props.item.index + 1}</Text>
                    </View>
                    <View style={styles.item_price_block}>
                        <Text style={[styles.custom_font, styles.item_price_text]}>{props.item.priceTotal.toFixed(2)} {I18n.t("uah")}</Text>
                    </View>
                </View>
                <OrderOption  options={props.item.options} />
            </View>
        </View>

    );
};

OrderElement.propTypes = {
    item: PropTypes.object.isRequired,
};

export default OrderElement;
