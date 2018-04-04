import React, { PureComponent } from 'react';
import { View as BaseView } from 'react-native';
import helper from '../../../utils/helper';
import PropTypes from 'prop-types';

export default class View extends PureComponent {
    constructor(props) {
        super(props);
    }
    setNativeProps = nativeProps => {
        this._root.setNativeProps(nativeProps);
    };

    render() {
        const styles = helper.aplyCoeffDimensionsToStyles(this.props.style);
        return (
            <BaseView
                ref={component => (this._root = component)}
                {...this.props}
                style={styles}>
                {this.props.children}
            </BaseView>
        );
    }
}

View.propTypes = {
    style: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.array,
        PropTypes.object,
    ]),
};

View.defaultProps = {
    style: {},
};
