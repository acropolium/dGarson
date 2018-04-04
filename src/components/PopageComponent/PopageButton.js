import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Button from '../../widgets/buttons/styledButton';
import styles from '../../styles/components/PopageStyles';
import I18n from '../../services/translate.js';

const PopageButton = props => {
    return (
        <View style={styles.wrap_all}>
            <View style={styles.wrap}>
                <View style={styles.wrap_button}>
                    <Button
                        backgroundColor={
                            props.dialog.ok_backgroundColor || '#000'
                        }
                        style={styles.button}
                        title={
                            props.dialog.ok_title
                                ? props.dialog.ok_title.toUpperCase()
                                : I18n.t('dialog_ok_single').toUpperCase()
                        }
                        onPress={props.approve}
                    />

                    {props.dialog.type == 'confirm' && (
                        <View style={styles.botton_button_wrap}>
                            <Button
                                backgroundColor={
                                    props.dialog.cancel_backgroundColor ||
                                    '#000'
                                }
                                style={styles.button}
                                title={
                                    props.dialog.cancel_title
                                        ? props.dialog.cancel_title.toUpperCase()
                                        : I18n.t('dialog_cancel').toUpperCase()
                                }
                                onPress={props.setModalHidden}
                            />
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
};

PopageButton.propTypes = {
    approve: PropTypes.func.isRequired,
    setModalHidden: PropTypes.func.isRequired,
};

export default PopageButton;
