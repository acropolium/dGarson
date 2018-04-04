import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from '../../BaseComponents';
import styles from '../../../styles/components/order/OrderListStyle';

const OrderOption = props => {
    return (
        <View>
            {Object.values(props.options).map((addition, index) => {
                if (addition.count > 0)
                    return (
                        <View key={index} style={styles.addition_block_item}>
                            <Text
                                style={[
                                    styles.custom_font,
                                    styles.addition_block_text_plus,
                                ]}>
                                +{' '}
                            </Text>
                            <Text
                                style={[
                                    styles.custom_font,
                                    styles.addition_block_text,
                                ]}>
                                {addition.name}
                            </Text>
                        </View>
                    );
            })}
        </View>
    );
};

OrderOption.propTypes = {
    options: PropTypes.oneOfType([
        PropTypes.array.isRequired,
        PropTypes.object.isRequired,
    ]),
};

export default OrderOption;
